# Integrando os leads com o Google Sheets

O endpoint `POST /api/lead` envia cada lead para uma planilha via
`sendLeadToSheets()` (`/lib/sheets.ts`), que faz POST JSON para a URL em
`GOOGLE_SHEETS_WEBHOOK_URL` — a URL de um **Google Apps Script publicado como
Web App**.

> A variável é de servidor (sem prefixo `NEXT_PUBLIC_`), então a URL do
> webhook nunca chega ao browser.

## 1. Criar a planilha

1. Crie uma planilha nova em [sheets.new](https://sheets.new).
2. Na primeira linha, adicione os cabeçalhos, nesta ordem:

```
data_hora | nome | email | telefone | origem | produto | pagina | utm_source | utm_medium | utm_campaign | utm_content | utm_term | referrer
```

3. Renomeie a aba para `Leads` (ou ajuste o nome no script).

## 2. Criar o Apps Script

1. Na planilha: **Extensões → Apps Script**.
2. Cole o código abaixo em `Code.gs` e salve:

```js
/**
 * Recebe o JSON do POST /api/lead (landing Misturador em V) e faz
 * appendRow na aba "Leads".
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // evita escritas simultâneas
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
    const d = JSON.parse(e.postData.contents);

    sheet.appendRow([
      d.data_hora || new Date().toISOString(),
      d.nome || "",
      d.email || "",
      d.telefone || "",
      d.origem || "",
      d.produto || "",
      d.pagina || "",
      d.utm_source || "",
      d.utm_medium || "",
      d.utm_campaign || "",
      d.utm_content || "",
      d.utm_term || "",
      d.referrer || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Opcional: responde ao teste manual de "Executar" no editor.
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, msg: "UP Brasil leads endpoint ativo" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Publicar como Web App

1. No editor do Apps Script: **Implementar → Nova implantação**.
2. **Tipo**: *Aplicativo da Web*.
3. **Executar como**: *Eu* (o dono da planilha).
4. **Quem tem acesso**: *Qualquer pessoa* (o endpoint recebe POST anônimo do
   seu site; para restringir, valide um token no script).
5. Clique em **Implementar** e **copie a URL** no formato
   `https://script.google.com/macros/s/AKfy.../exec`.

## 4. Configurar no projeto

```bash
# .env.local (dev)
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfy.../exec
```

Na Vercel: **Project → Settings → Environment Variables** → adicione a mesma
variável (Production/Preview/Development) e faça novo deploy.

## 5. Testar

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "nome":"Teste Silva","email":"teste@empresa.com.br","telefone":"(11) 99999-8888",
    "origem":"hero","produto":"Misturador em V 50L","pagina":"http://localhost:3000",
    "utm_source":"google","utm_medium":"cpc","utm_campaign":"misturador_v",
    "utm_content":"anuncio1","utm_term":"misturador+inox",
    "referrer":"https://www.google.com/","data_hora":"2026-01-01T12:00:00.000Z"
  }'
```

Resposta esperada: `{"ok":true}` e uma nova linha na planilha (se a URL
estiver configurada; sem ela, o payload é apenas logado no console — ver
`lib/sheets.ts`).

## Observações

- O Apps Script pode levar de 1 a 3 s para responder; por isso o client usa
  `keepalive` + timeout de 4 s e **não bloqueia** o redirecionamento ao
  WhatsApp caso falhe.
- Em produção, avalie trocar o Apps Script por uma integração mais robusta
  (Make/Zapier, n8n ou API direta do Google) se o volume crescer.
