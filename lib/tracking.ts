/**
 * Camada de tracking preparada para Meta Pixel e Google Tag Manager.
 *
 * O dataLayer é inicializado pelo snippet do Google Tag Manager (GTM-5K252BPM)
 * em components/google-tag-manager.tsx; os eventos abaixo apenas empurram
 * objetos para ele.
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

