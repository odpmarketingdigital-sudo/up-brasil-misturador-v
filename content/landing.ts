/**
 * Conteúdo centralizado da landing page da UP Brasil.
 * Edite este arquivo para alterar textos, números e configurações de CTA
 * sem tocar nos componentes.
 */

export const site = {
  name: "UP Brasil",
  productName: "Misturador em V Inox 50 L com Painel Digital",
  productShortName: "Misturador em V 50 L",
  description:
    "Misturador em V 100% em aço inox com painel digital e timer 0–999 min. Homogeneização precisa de pós e granulados para indústrias farmacêutica, alimentícia, cosmética, química e de suplementos.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://upbrasil.com.br",
  logo: "/images/logotipo-1.webp",
} as const;

/** Investimento exibido no hero. Ajuste conforme necessário. */
export const price = {
  prefix: "Investimento a partir de",
  from: "R$ 27.990",
  note: "Condições especiais direto pelo WhatsApp",
} as const;

export const header = {
  cta: "Solicitar orçamento",
} as const;

export const hero = {
  badge: "Fabricação própria UP Brasil",
  title: "Misturador em V Inox 50 L: lotes uniformes, ciclo após ciclo",
  subtitle:
    "Equipamento 100% em aço inox com painel digital para homogeneização de pós, granulados e materiais secos. Projetado para rotinas industriais, laboratoriais e de controle de qualidade.",
  ctaPrimary: "Falar com um especialista no WhatsApp",
  ctaSecondary: "Ver ficha técnica",
  secondaryAnchor: "#ficha-tecnica",
  image: "/images/misturador321__1_.webp",
  imageAlt:
    "Misturador em V de 50 litros em aço inox instalado em ambiente industrial, com painel digital visível",
  trustBar:
    "Atendimento em todo o Brasil • Projetos sob medida • Suporte técnico especializado",
} as const;

/** Números de destaque — ajuste os valores aqui se necessário. */
export const numbers = [
  {
    value: "50 L",
    label: "Capacidade padrão, ideal para lotes de bancada, piloto e pequena produção",
  },
  {
    value: "0–999 min",
    label: "Timer digital: programe o ciclo e dedique sua equipe a outras tarefas",
  },
  {
    value: "30 RPM",
    label: "Rotação padronizada para mistura repetível entre lotes",
  },
] as const;

export const about = {
  title: "Homogeneizador em V com construção sanitária e controle preciso",
  intro:
    "O Misturador em V da UP Brasil foi desenvolvido para indústrias que precisam eliminar variações entre lotes e garantir uniformidade máxima em materiais secos.",
  blocks: [
    {
      title: "Higienização facilitada",
      text: "Corpo em aço inox, resistente à corrosão, fácil de limpar no dia a dia e durável em ambientes produtivos exigentes.",
    },
    {
      title: "Precisão no processo",
      text: "O painel digital permite programar o tempo exato de operação, com total controle e praticidade na rotina.",
    },
  ],
  image: "/images/mist2__1_.webp",
  imageAlt:
    "Misturador em V em aço inox com painel digital em primeiro plano sobre bancada industrial",
} as const;


export const whyItMatters = {
  title: "Mistura mal feita custa caro",
  text: "Em processos com pós e granulados, uma homogeneização inadequada causa variação de cor, concentração, textura e rendimento, e o lote inteiro pode ser comprometido.",
  text2:
    "O Misturador em V combina a geometria ideal da câmara com controle exato de tempo e rotação, tornando sua etapa de mistura previsível e repetível.",
  cta: "Quero lotes mais uniformes",
} as const;

export const differentials = {
  title: "Diferenciais que aparecem no seu processo",
  items: [
    {
      icon: "Blend",
      title: "Padronização garantida",
      text: "A geometria em V favorece o tombamento contínuo do material, para uma mistura rápida e uniforme.",
    },
    {
      icon: "SlidersHorizontal",
      title: "Controle operacional",
      text: "Timer integrado ao painel digital para ciclos exatos, sem supervisão constante.",
    },
    {
      icon: "Settings",
      title: "Adequação ao seu processo",
      text: "Fabricamos modelos padrão e projetos personalizados conforme seu volume e aplicação.",
    },
    {
      icon: "MapPin",
      title: "Atendimento nacional",
      text: "Suporte técnico e comercial especializado para empresas de todo o Brasil.",
    },
  ],
  image: "/images/painel__1_.webp",
  imageAlt: "Detalhe do painel digital touch do Misturador em V com display do timer",
} as const;

export const applications = {
  title: "Um equipamento, cinco segmentos",
  subtitle:
    "Da validação de lote à produção contínua, o Misturador em V atende rotinas que exigem repetibilidade e conformidade.",
  items: [
    { segment: "Farmacêutico", text: "Homogeneização de pós e granulados para o segmento farmacêutico." },
    { segment: "Alimentício", text: "Homogeneização de pós e granulados para o segmento alimentício." },
    { segment: "Cosmético", text: "Homogeneização de pós e granulados para o segmento cosmético." },
    { segment: "Químico", text: "Homogeneização de pós e granulados para o segmento químico." },
    { segment: "Suplementos", text: "Homogeneização de pós e granulados para o segmento de suplementos." },
  ],
} as const;

export const howItWorks = {
  title: "Como funciona",
  steps: [
    "1. Carregue o material",
    "2. Programe tempo no painel",
    "3. Inicie e descarregue a mistura homogênea",
  ],
} as const;


export const techSpecs = {
  title: "Ficha técnica",
  subtitle: "Especificações do modelo padrão de 50 litros.",
  rows: [
    { label: "Capacidade", value: "50 litros (modelo padrão)" },
    { label: "Timer", value: "ajustável de 0 a 999 minutos" },
    { label: "Rotação", value: "30 RPM" },
    { label: "Controle", value: "painel digital de fácil operação" },
    { label: "Material", value: "estrutura e câmara 100% em aço inox" },
    { label: "Aplicações", value: "pós, granulados e materiais secos" },
  ],
  note: "Precisa de outra capacidade? Desenvolvemos projetos sob medida.",
  cta: "Falar sobre meu projeto",
} as const;

export const gallery = {
  title: "O equipamento em detalhe",
  images: [
    {
      src: "/images/misturador321__1_.webp",
      alt: "Misturador em V de 50 L em ambiente industrial com painel digital",
    },
    {
      src: "/images/mist2__1_.webp",
      alt: "Misturador em V em aço inox com painel digital em primeiro plano",
    },
    {
      src: "/images/painel__1_.webp",
      alt: "Detalhe do painel touch do Misturador em V com timer digital",
    },
  ],
} as const;

export const faq = {
  title: "Perguntas frequentes",
  items: [
    {
      question: "O equipamento é fabricado integralmente em aço inox?",
      answer:
        "Sim. Este modelo possui estrutura e câmara de mistura 100% em aço inox, com resistência à corrosão e facilidade de higienização.",
    },
    {
      question: "Para quais materiais o Misturador em V é indicado?",
      answer:
        "Para homogeneização de pós, granulados e misturas secas nos segmentos farmacêutico, alimentício, químico, cosmético e de suplementos.",
    },
    {
      question: "O equipamento possui controle de tempo de operação?",
      answer:
        "Sim. Conta com painel digital e timer ajustável de 0 a 999 minutos para automatizar o ciclo.",
    },
    {
      question: "A UP Brasil desenvolve projetos com capacidades diferentes?",
      answer:
        "Sim. Além do modelo padrão de 50 litros, nossa engenharia avalia a necessidade da sua planta para indicar ou fabricar a capacidade ideal.",
    },
  ],
} as const;

export const finalCta = {
  title: "Receba seu orçamento do Misturador em V",
  subtitle: "Fale com um especialista da UP Brasil e receba condições especiais.",
  cta: "Falar com um especialista no WhatsApp",
} as const;

/** Conteúdo do modal de captura de lead (aberto por todos os CTAs). */
export const leadModal = {
  title: "Fale com um especialista",
  subtitle: "Preencha seus dados e continue a conversa pelo WhatsApp.",
  fields: {
    nome: "Nome",
    email: "E-mail",
    telefone: "Telefone",
  },
  placeholders: {
    nome: "Seu nome completo",
    email: "voce@empresa.com.br",
    telefone: "(00) 00000-0000",
  },
  privacy: "Seus dados serão usados apenas para o contato comercial da UP Brasil.",
  submit: "Continuar para o WhatsApp",
  submitting: "Enviando…",
  closeLabel: "Fechar modal",
  /** Mensagem enviada ao WhatsApp depois do envio do formulário. */
  message: (nome: string) =>
    `Olá! Meu nome é ${nome} e tenho interesse no Misturador em V 50 L da UP Brasil. Gostaria de um orçamento.`,
} as const;

export const footer = {
  text: "© 2026 UP Brasil. Misturador em V para misturas mais homogêneas e processos padronizados.",
} as const;

export const floating = {
  whatsappLabel: "Falar no WhatsApp",
  mobileBarCta: "Solicitar orçamento",
} as const;


