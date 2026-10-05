/**
 * Envio de leads para o Google Sheets via Google Apps Script publicado
 * como Web App (URL definida em GOOGLE_SHEETS_WEBHOOK_URL — variável de
 * servidor, nunca exposta ao client).
 *
 * TODO: Integrar com Google Sheets — veja /docs/google-sheets.md para
 * criar o Apps Script e publicar como Web App.
 */

export type LeadRecord = Record<string, string>;

export async function sendLeadToSheets(payload: LeadRecord): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    // TODO: Integrar com Google Sheets — defina GOOGLE_SHEETS_WEBHOOK_URL
    // no ambiente (Vercel/.local) com a URL do Web App do Apps Script.
    console.log(
      "[sheets] GOOGLE_SHEETS_WEBHOOK_URL não definida — lead registrado apenas no log:",
      payload
    );
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Webhook do Google Sheets respondeu ${response.status}`);
  }
}
