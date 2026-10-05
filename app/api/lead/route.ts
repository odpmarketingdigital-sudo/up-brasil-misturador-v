import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { sendLeadToSheets } from "@/lib/sheets";

/**
 * POST /api/lead — recebe o lead do modal de captura e encaminha ao Google
 * Sheets (via /lib/sheets.ts). A URL do webhook NUNCA é exposta ao client.
 */

/**
 * Rate limit simples em memória por IP: 5 requisições por minuto.
 * TODO(produção): trocar por solução persistente (Redis/Upstash Rate Limit
 * ou a rate limit nativa da Vercel) — o Map em memória é reiniciado a cada
 * deploy/instância e não funciona bem com múltiplas lambdas.
 */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  entry.count += 1;
  return entry.count <= RATE_LIMIT;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Corpo da requisição inválido." },
      { status: 400 }
    );
  }

  const data = (body ?? {}) as Record<string, unknown>;

  // Honeypot: se preenchido, descarta silenciosamente com 200 — não sinaliza
  // ao bot que foi bloqueado.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!checkRateLimit(getClientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Muitas solicitações. Tente novamente em instantes." },
      { status: 429 }
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Dados inválidos.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const asString = (value: unknown, max = 300): string =>
    typeof value === "string" ? value.slice(0, max) : "";

  const payload = {
    data_hora: asString(data.data_hora, 40) || new Date().toISOString(),
    nome: parsed.data.nome,
    email: parsed.data.email,
    telefone: parsed.data.telefone,
    origem: asString(data.origem, 80) || "desconhecido",
    produto: asString(data.produto, 120) || "Misturador em V 50L",
    pagina: asString(data.pagina, 500),
    utm_source: asString(data.utm_source, 120),
    utm_medium: asString(data.utm_medium, 120),
    utm_campaign: asString(data.utm_campaign, 120),
    utm_content: asString(data.utm_content, 120),
    utm_term: asString(data.utm_term, 120),
    referrer: asString(data.referrer, 300),
  };

  try {
    await sendLeadToSheets(payload);
  } catch (error) {
    console.error("[api/lead] Falha ao enviar para o Sheets:", error);
    return NextResponse.json(
      { ok: false, error: "Falha ao registrar o lead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
