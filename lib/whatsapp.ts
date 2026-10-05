/**
 * Monta a URL de redirecionamento wa.me usando a variável de ambiente
 * NEXT_PUBLIC_WHATSAPP_NUMBER. Aceita números com ou sem "+" e espaços.
 *
 * ATENÇÃO: nenhum link wa.me é renderizado na página — este helper é usado
 * apenas pelo LeadModal, depois do envio do formulário.
 */
export function getWhatsappUrl(message: string): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const digits = raw.replace(/\D/g, "");

  if (!digits) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[whatsapp] NEXT_PUBLIC_WHATSAPP_NUMBER não definido — URL gerada sem número."
      );
    }
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

