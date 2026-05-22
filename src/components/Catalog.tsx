import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, ExternalLink, Tag, ShieldCheck, Cpu, Star, Download, Sparkles } from 'lucide-react';
import { Product, StoreConfig } from '../types';
import { getNeonColorClasses, generateWhatsAppUrl } from '../utils';

interface CatalogProps {
  products: Product[];
  config: StoreConfig;
  onTrackView?: (productId: string) => void;
}

export default function Catalog({ products, config, onTrackView }: CatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const colorStuff = getNeonColorClasses(config.neonColor);

  // Get unique categories
  const categories = ['Todos', ...new Set(products.map(p => p.category))];

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

  // Helper to render responsive visual icons based on category
  const renderProductIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'herramientas':
        return <Cpu className={`h-8 w-8 ${colorStuff.text}`} />;
      case 'suscripciones':
        return <Star className={`h-8 w-8 ${colorStuff.text}`} />;
      case 'productos digitales':
      case 'productos':
        return <Download className={`h-8 w-8 ${colorStuff.text}`} />;
      default:
        return <Sparkles className={`h-8 w-8 ${colorStuff.text}`} />;
    }
  };

  const getCategoryGradient = (id: string) => {
    const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = sum % 3;
    if (index === 0) return 'from-cyan-500/10 via-transparent to-blue-500/5';
    if (index === 1) return 'from-purple-500/10 via-transparent to-pink-500/5';
    return 'from-emerald-500/10 via-transparent to-teal-500/5';
  };

  return (
    <section id="catalog-section" className="py-24 relative overflow-hidden">
      {/* Lights Background */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] glow-overlay bg-cyan-950/15 opacity-50" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] glow-overlay bg-purple-950/10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className={`px-3 py-1 rounded-full text-xs font-mono tracking-widest ${colorStuff.badge} uppercase`}>
            Servicios y Licencias
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Nuestros <span className={colorStuff.text}>Productos Digitales</span>
          </h2>
          <p className="font-sans text-gray-400 max-w-xl font-light">
            Soluciones automáticas, recursos para creadores y licencias de herramientas tech premium listas para activar inmediatamente.
          </p>

          {/* Filtering buttons */}
          <div className="flex flex-wrap justify-center gap-2.5 pt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-all duration-300 pointer cursor-pointer ${
                  selectedCategory === category
                    ? `${colorStuff.buttonBg} ${colorStuff.glow}`
                    : 'bg-gray-950/50 hover:bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const defaultMessage = `Hola, estoy interesado en adquirir el producto "${product.name}" de precio "${product.price}" en tu tienda. ¿Me podrías dar los pasos para activar mi licencia?`;
            const customMessage = product.whatsappMessage || defaultMessage;
            const buyUrl = generateWhatsAppUrl(config.whatsappNumber, customMessage);

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`flex flex-col rounded-2xl border border-gray-900 interactive-glass hover:bg-gray-900/20 hover:border-gray-800 transition-all duration-300 relative overflow-hidden group ${colorStuff.glowHover}`}
              >
                {/* Visual Header Grid Gradient */}
                <div className="h-40 relative flex items-center justify-center bg-gray-950 overflow-hidden">
                  {product.imageUrl ? (
                    <>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-black/20" />
                    </>
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(product.id)}`} />
                      {/* Grid background on image */}
                      <div className="absolute inset-0 cyber-grid opacity-25" />
                      
                      {/* Futuristic glass blur circle */}
                      <div className={`absolute w-16 h-16 rounded-full ${colorStuff.bg} border ${colorStuff.border} flex items-center justify-center shadow-lg backdrop-blur-md group-hover:scale-110 transition-transform duration-300`}>
                        {renderProductIcon(product.category)}
                      </div>
                    </>
                  )}
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-gray-950/80 text-gray-300 border border-gray-800 backdrop-blur-sm">
                    <Tag className="h-3 w-3 text-gray-400" />
                    <span>{product.category}</span>
                  </span>

                  {/* Guaranteed Badge */}
                  <span className="absolute top-4 right-4 inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold bg-green-500/10 text-green-400 border border-green-500/20 backdrop-blur-sm">
                    <ShieldCheck className="h-3 w-3" />
                    <span>ACTIVO 24/7</span>
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-display font-extrabold text-xl text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-200">
                      {product.name}
                    </h3>
                  </div>

                  <p className="font-sans text-sm text-gray-400 font-light flex-1 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-gray-900/85">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-wider text-gray-500 uppercase">Inversión</span>
                      <span className={`font-mono font-extrabold text-base tracking-tight ${colorStuff.text}`}>
                        {product.price}
                      </span>
                    </div>

                    <a
                      href={buyUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      onClick={() => onTrackView && onTrackView(product.id)}
                      className={`flex items-center space-x-2 px-4.5 py-2.5 rounded-xl text-xs font-display font-black tracking-widest uppercase cursor-pointer ${colorStuff.buttonBg} transition-all duration-300`}
                    >
                      <span>Comprar</span>
                      <ShoppingCart className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
