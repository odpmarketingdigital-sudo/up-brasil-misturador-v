import { z } from "zod";

/**
 * Schema compartilhado entre o client (react-hook-form + zodResolver)
 * e o server (app/api/lead/route.ts). Mantenha as mensagens em português.
 */

/** Formata no padrão brasileiro: (99) 99999-9999 (fixo e celular). */
export function maskTelefone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export const leadSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe seu nome (mínimo 2 caracteres)")
    .max(120, "Nome muito longo"),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail")
    .max(160, "E-mail muito longo")
    .email("Informe um e-mail válido"),
  telefone: z
    .string()
    .trim()
    .min(1, "Informe o telefone com DDD")
    .refine(
      (value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length === 10 || digits.length === 11;
      },
      "Telefone inválido. Use (DDD) 99999-9999 (10 ou 11 dígitos)"
    ),
  /** Honeypot anti-spam — campo oculto; se preenchido, o envio é descartado. */
  website: z.string().optional().default(""),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

/** Payload completo enviado para /api/lead (montado no client). */
export type LeadPayload = LeadFormValues & {
  origem: string;
  produto: string;
  pagina: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  referrer: string;
  data_hora: string;
};
