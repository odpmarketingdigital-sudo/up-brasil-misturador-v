/** ID do container do Google Tag Manager. */
export const GTM_ID = "GTM-5K252BPM";

/** Snippet padrão do GTM: cria o dataLayer e injeta o gtm.js. */
const gtmSnippet = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

/**
 * Google Tag Manager (App Router).
 *
 * O snippet é o primeiro elemento do <body> (o App Router renderiza-o logo após
 * a abertura), portanto o `dataLayer` existe antes de qualquer outro script ou
 * evento da página — `lib/tracking.ts` pode apenas empurrar objetos para ele.
 *
 * O <noscript> com o iframe de fallback fica no topo do <body>.
 */
export function GoogleTagManager() {
  return (
    <script
      id="gtm-loader"
      dangerouslySetInnerHTML={{ __html: gtmSnippet }}
    />
  );
}

/** Fallback para navegadores com JavaScript desabilitado. Use no topo do <body>. */
export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}