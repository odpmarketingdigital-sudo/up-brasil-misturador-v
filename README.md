# Landing Page — Misturador em V Inox 50 L com Painel Digital (UP Brasil)

Landing page de alta conversão em **Next.js (App Router) + TypeScript + Tailwind CSS**, com objetivo único de gerar contatos qualificados via **WhatsApp** e **formulário de orçamento**.

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # ajuste o número de WhatsApp e o webhook do Sheets
npm run dev                  # http://localhost:3000
```

Build de produção:

```bash
npm run build
npm start
```

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Sim | Número com DDI, ex.: `5511999998888`. Usado só no redirecionamento pós-formulário (`lib/whatsapp.ts`). |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Não | URL do Google Apps Script (Web App) para gravar leads. Ver `/docs/google-sheets.md`. Sem ela, o payload é logado no console. |
| `NEXT_PUBLIC_SITE_URL` | Sim (prod) | URL canônica usada em metadata, Open Graph, sitemap, robots e JSON-LD. |

## Fluxo de captação (modal de lead)

1. **Todos os CTAs** (header, hero, "Por que isso importa", ficha técnica, CTA
   final, botão flutuante e barra mobile) chamam `open("origem")` do
   `useLeadModal()` — **nenhum link wa.me é renderizado na página**.
2. O modal (`/components/lead-modal`) coleta nome, e-mail e telefone
   (com máscara BR + honeypot anti-spam) usando react-hook-form + zod
   (schema compartilhado em `lib/lead-schema.ts`).
3. No envio: monta o payload (UTMs do `sessionStorage`, referrer, página,
   data/hora), faz `POST /api/lead` com `keepalive` e timeout de 4 s
   (falha não bloqueia o usuário) e redireciona para o wa.me com a mensagem
   personalizada na mesma aba.
4. O servidor valida com o mesmo schema, descarta honeypot, aplica rate limit
   por IP (5/min, in-memory — trocar por Redis em produção) e encaminha para
   `sendLeadToSheets()` (`lib/sheets.ts`).

## Estrutura

```
app/
  layout.tsx          # fonte Inter, metadata/OG, JSON-LD Product, LeadModalProvider
  page.tsx            # composição das seções + JSON-LD FAQPage
  sitemap.ts          # /sitemap.xml
  robots.ts         # /robots.txt
  api/lead/route.ts   # POST do modal: honeypot + rate limit + zod + Sheets
components/
  lead-modal/         # LeadModalProvider, useLeadModal(), modal + formulário
  # Header, Hero, Numbers, About, WhyItMatters, Differentials,
  # Applications, HowItWorks, TechSpecs, Gallery, Faq, FinalCta, Footer,
  # WhatsAppFloat, Reveal
content/landing.ts    # TODO o texto da página (edite aqui)
docs/google-sheets.md # exemplo de Apps Script + publicação como Web App
lib/
  lead-schema.ts      # schema zod compartilhado (client + server) + máscara
  sheets.ts           # envio para GOOGLE_SHEETS_WEBHOOK_URL (server-only)
  utm.ts              # captura/persistência de UTMs em sessionStorage
  whatsapp.ts         # URL wa.me (usada apenas após o envio do formulário)
  tracking.ts         # dataLayer: lead_modal_open/lead_submit/whatsapp_redirect
public/images/        # logotipo-1.webp, misturador321__1_.webp, mist2__1_.webp, painel__1_.webp
```

## Tracking (Meta Pixel e GTM)

- Eventos no `dataLayer`: `lead_modal_open {origem}`, `lead_submit {origem}`
  e `whatsapp_redirect {origem}` — todos em `lib/tracking.ts`.
- `lead_submit` também chama `fbq("track", "Lead")` quando o pixel existe
  (verificação de `window.fbq`); nenhum ID foi instalado ainda.
- Para ativar: injete o snippet do GTM/Meta Pixel em `app/layout.tsx`.

## Testando o fluxo localmente

```bash
npm run dev
# 1. Abra http://localhost:3000 e clique em qualquer CTA → modal abre.
# 2. Teste validação: envie vazio, com e-mail inválido e telefone curto.
# 3. Envio válido: veja no console do servidor o lead logado
#    (se GOOGLE_SHEETS_WEBHOOK_URL não estiver definida) e o redirecionamento
#    para wa.me com a mensagem personalizada.
# 4. Honeypot: no DevTools, preencha #lead-modal-website e envie → sem POST.
# 5. Rate limit: 6 POSTs rápidos em /api/lead → o 6º retorna 429.
# 6. UTM: abra /?utm_source=google&utm_medium=cpc e verifique sessionStorage.
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"t@e.com","telefone":"(11) 99999-8888","website":""}'
```

## Webhook do Google Sheets

`lib/sheets.ts` envia para `GOOGLE_SHEETS_WEBHOOK_URL` (Apps Script como Web
App). Sem a variável, apenas loga. Passo a passo em `docs/google-sheets.md`.
A URL nunca é exposta ao client (variável de servidor, sem `NEXT_PUBLIC_`).

## Deploy na Vercel

1. Push do repositório para o GitHub/GitLab.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório — o framework Next.js é detectado automaticamente.
3. Em **Environment Variables**, cadastre:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_WHATSAPP_MESSAGE` (opcional)
   - `NEXT_PUBLIC_SITE_URL` (ex.: `https://seu-dominio.com.br`)
4. Deploy. Depois, aponte o domínio personalizado em *Project → Settings → Domains*.
5. Atualize `NEXT_PUBLIC_SITE_URL` com o domínio final para corrigir canonical/OG/sitemap.

## Acessibilidade e performance

- Contraste AA (CTA amarelo `#E6A800` com texto grafite escuro), foco visível, skip-link, aria-expanded no FAQ, lightbox com teclado (Esc/←/→).
- `next/font` (Inter, swap), `next/image` com `priority` no hero e `loading="lazy"` no resto, animações sutis com IntersectionObserver respeitando `prefers-reduced-motion`.
