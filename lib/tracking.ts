/**
 * Camada de tracking preparada para Meta Pixel e Google Tag Manager.
 *
 * Nenhum ID foi instalado ainda. Quando os IDs forem adicionados:
 *  1. Meta Pixel: carregar o snippet do Facebook em app/layout.tsx; os
 *     eventos abaixo já chamam window.fbq com verificação de existência.
 *  2. GTM: injetar o snippet do dataLayer em app/layout.tsx; o dataLayer já
 *     é empurrado aqui com o payload padrão.
 *
 * Eventos do funil do modal de lead:
 *  - lead_modal_open { origem }
 *  - lead_submit     { origem }  → fbq("track", "Lead")
 *  - whatsapp_redirect { origem }
 */

type TrackingData = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

function pushToDataLayer(event: string, data: TrackingData = {}): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...data });
}

/** Evento genérico: clique em CTA (ex.: âncora da ficha técnica). */
export function trackCtaClick(
  ctaName: string,
  location: string,
  data: TrackingData = {}
): void {
  pushToDataLayer("cta_click", { cta_name: ctaName, cta_location: location, ...data });
}

/** Modal de lead aberto. */
export function trackLeadModalOpen(origem: string): void {
  pushToDataLayer("lead_modal_open", { origem });
}

/** Formulário do modal enviado com sucesso (preparado para Meta Pixel). */
export function trackLeadSubmit(origem: string): void {
  pushToDataLayer("lead_submit", { origem });
  // Meta Pixel — protegido: só dispara se o pixel estiver carregado.
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
}

/** Redirecionamento para o WhatsApp disparado. */
export function trackWhatsappRedirect(origem: string): void {
  pushToDataLayer("whatsapp_redirect", { origem });
}

