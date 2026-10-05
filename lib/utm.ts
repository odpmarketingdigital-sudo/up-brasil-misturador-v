/**
 * Captura e persistência de parâmetros UTM (e referrer) em sessionStorage,
 * para que sobrevivam entre navegações internas enquanto a aba estiver aberta.
 */

const STORAGE_KEY = "up_brasil_utm_params";

export type UtmParams = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
};

const EMPTY: UtmParams = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
};

function readStorage(): UtmParams | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : null;
  } catch {
    return null;
  }
}

/**
 * Deve ser chamada uma vez ao carregar a página: lê as UTMs da URL atual
 * (se presentes) e grava no sessionStorage; caso contrário mantém as
 * salvas anteriormente.
 */
export function captureUtmParams(): void {
  if (typeof window === "undefined") return;

  try {
    const url = new URL(window.location.href);
    const next: UtmParams = { ...EMPTY };
    let hasNew = false;

    (Object.keys(EMPTY) as (keyof UtmParams)[]).forEach((key) => {
      const value = url.searchParams.get(key);
      if (value) {
        next[key] = value;
        hasNew = true;
      }
    });

    if (hasNew) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else if (!readStorage()) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(EMPTY));
    }
  } catch {
    // sessionStorage indisponível (modo privado) — segue sem UTM.
  }
}

export function getUtmParams(): UtmParams {
  return readStorage() ?? { ...EMPTY };
}
