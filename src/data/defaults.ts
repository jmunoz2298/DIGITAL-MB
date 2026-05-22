import { StoreConfig, Product, Service } from '../types';

export const DEFAULT_CONFIG: StoreConfig = {
  storeName: "DIGITAL MB",
  tagline: "Potencia tu mundo digital",
  whatsappNumber: "3143497151",
  neonColor: "cyan",
  instagramUrl: "https://instagram.com",
  linkedinUrl: "https://linkedin.com",
  tiktokUrl: "https://tiktok.com",
  aboutText: "Soluciones digitales revolucionarias, automatizaciones impulsadas por Inteligencia Artificial, edición de video cinematográfica y diseño de alta fidelidad para impulsar marcas que lideran el mañana."
};

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Licencia Premium Tool Vault",
    price: "$14.99 USD",
    description: "Acceso exclusivo de 30 días a nuestro suite seleccionado de herramientas premium de IA, analítica y optimización de contenido.",
    category: "Herramientas",
    imageUrl: "" // Will fall back to customized futuristic gradient
  },
  {
    id: "prod-2",
    name: "Pack Editor Cinematográfico",
    price: "$29.99 USD",
    description: "Colección exclusiva con más de 200 transiciones futuristas, efectos de sonido (SFX) cinemáticos y overlays listos para Premiere y After Effects.",
    category: "Productos Digitales",
    imageUrl: ""
  },
  {
    id: "prod-3",
    name: "Suscripción Automatizadora IA",
    price: "$49.99 / mes",
    description: "Soporte e implementación de bots de respuesta inteligente, flujos automatizados de email y scraping de datos web constante.",
    category: "Suscripciones",
    imageUrl: ""
  },
  {
    id: "prod-4",
    name: "Master Prompts Database DB",
    price: "$9.99 USD",
    description: "La biblia definitiva del Prompt Engineering. Más de 600 prompts refinados para ChatGPT, Midjourney y Claude que multiplican tu productividad por 10.",
    category: "Productos Digitales",
    imageUrl: ""
  },
  {
    id: "prod-5",
    name: "Licencia Anual Elementos VFX",
    price: "$59.00 USD",
    description: "Plataforma ilimitada de recursos visuales premium, overlays 4K, modelados 3D abstractos y animaciones fluidas para tus producciones.",
    category: "Herramientas",
    imageUrl: ""
  },
  {
    id: "prod-6",
    name: "Landing Page Startup Pro",
    price: "$199.00 USD",
    description: "Estructura web de una sola página ultra optimizada, adaptada a tu negocio con diseño minimalista, neones futuristas y cargada en menos de 1 segundo.",
    category: "Suscripciones",
    imageUrl: ""
  }
];

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "srv-1",
    name: "Automatizaciones con IA",
    description: "Diseño e implementación de flujos inteligentes de trabajo, bots conversacionales con memoria para WhatsApp/Telegram y flujos automatizados de CRM.",
    features: [
      "Integración premium con APIs (OpenAI, Claude)",
      "Agentes conversacionales automatizados",
      "Conexión con Make / Zapier",
      "Monitoreo de estabilidad 24/7"
    ],
    iconName: "Cpu"
  },
  {
    id: "srv-2",
    name: "Edición de Video Profesional",
    description: "Producción y edición cinematográfica orientada a la máxima retención. Ideal para YouTube, anuncios de marca, Reels y TikTok.",
    features: [
      "Diseño de sonido y SFX inmersivos",
      "VFX, transiciones personalizadas y animaciones",
      "Ritmo adaptado a redes sociales",
      "Corrección de color premium (LUTs personalizados)"
    ],
    iconName: "Video"
  },
  {
    id: "srv-3",
    name: "Diseño Web UI/UX de Élite",
    description: "Creamos portafolios, landing pages y webs interactivas con estética ciberpunk y minimalista que cautivan desde el primer scroll.",
    features: [
      "Animaciones fluidas y layouts responsivos",
      "Optimización SEO y velocidad máxima de carga",
      "Paleta cromática customizada y brillos de neón",
      "Preparado para captación de leads"
    ],
    iconName: "Layout"
  },
  {
    id: "srv-4",
    name: "Soporte Técnico & Tech Setup",
    description: "Configuración integral de sistemas en la nube, dominios, correos corporativos y optimización de herramientas empresariales modernas.",
    features: [
      "Resolución rápida de bugs y problemas web",
      "Seguridad de endpoints y bases de datos",
      "Configuración de pasarelas de pago",
      "Soporte uno a uno vía WhatsApp"
    ],
    iconName: "Wrench"
  }
];
