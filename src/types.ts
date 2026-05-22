export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string; // e.g. "Herramientas", "Suscripciones", "Productos"
  imageUrl?: string;
  whatsappMessage?: string;
  views?: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  iconName: string; // Lucide icon name, e.g. "Cpu", "Video", "Layers", "Headphones"
  whatsappMessage?: string;
}

export interface StoreConfig {
  storeName: string;
  tagline: string;
  whatsappNumber: string; // e.g. "3143497151"
  neonColor: 'blue' | 'purple' | 'emerald' | 'cyan' | 'indigo';
  instagramUrl?: string;
  linkedinUrl?: string;
  tiktokUrl?: string;
  aboutText?: string;
}

export interface Message {
  id: string;
  name: string;
  topic?: string;
  message: string;
  createdAt: any; // timestamp
}

export interface AdminAuth {
  username?: string;
  password?: string;
}
