import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { StoreConfig } from '../types';
import { getNeonColorClasses } from '../utils';
import MBDigitalLogo from './MBDigitalLogo';

interface HeroProps {
  config: StoreConfig;
}

export default function Hero({ config }: HeroProps) {
  const colorStuff = getNeonColorClasses(config.neonColor);

  const scrollHandler = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Mesh gradients for cyber vibe */}
      <div className="absolute inset-0 bg-[#050506]/30 z-0" />
      
      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 cyber-grid z-0 opacity-40" />
      <div className="absolute inset-0 cyber-grid-radial z-0" />

      {/* Decorative Blur Spheres */}
      <div 
        className="absolute top-1/4 left-1/4 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] rounded-full glow-overlay opacity-15 z-0"
        style={{ backgroundColor: colorStuff.accentHex, filter: 'blur(100px)' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full glow-overlay opacity-10 z-0"
        style={{ 
          backgroundColor: colorStuff.accentHex, 
          filter: 'blur(110px)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-8"
        >
          {/* Prominent Official MB DIGITAL Logo Display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.95, 1, 0.95], opacity: 1 }}
            transition={{ 
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 1 }
            }}
            className="relative"
          >
            <div 
              className="absolute inset-x-0 bottom-0 top-0 m-auto w-32 h-32 rounded-full blur-[60px] pointer-events-none opacity-20" 
              style={{ backgroundColor: colorStuff.accentHex }}
            />
            <MBDigitalLogo 
              className="h-32 w-32 sm:h-40 sm:w-40 relative z-10 hover:scale-105 transition-transform duration-500" 
              showGlow={true} 
              neonColorHex={colorStuff.accentHex}
              customLogoUrl={config.heroLogoUrl || config.logoUrl}
            />
          </motion.div>
          {/* Futuristic pill badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-gray-850 bg-gray-950/60 backdrop-blur-md">
            <MBDigitalLogo className="h-4.5 w-4.5 animate-pulse" showGlow={false} neonColorHex={colorStuff.accentHex} customLogoUrl={config.logoUrl} />
            <span className="text-xs font-mono font-semibold tracking-widest text-gray-400 uppercase">
              Tecnología de Vanguardia
            </span>
          </div>

          {/* Main Title with futuristic neon accents */}
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-white max-w-4xl">
            {config.tagline.split(' ').map((word, idx) => {
              if (idx >= config.tagline.split(' ').length - 2) {
                return (
                  <span key={idx} className="relative inline-block ml-3">
                    <span className="relative z-10 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                      {word}
                    </span>
                    <span 
                      className="absolute -bottom-1 left-0 w-full h-[3px] blur-[1px] opacity-80" 
                      style={{ background: `linear-gradient(to right, ${colorStuff.accentHex}, transparent)` }}
                    />
                  </span>
                );
              }
              return (
                <span key={idx} className="relative z-10 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent ml-3 first:ml-0">
                  {word}
                </span>
              );
            })}
          </h1>

          {/* Descriptive Subtitle */}
          <p className="font-sans text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            {config.aboutText || "Automatizaciones con Inteligencia Artificial, edición cinematográfica y diseño futurista de interfaces para impulsar tu marca a velocidades de hiperespacio."}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={() => scrollHandler('catalog-section')}
              className={`group flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-4 rounded-xl font-display font-bold text-base tracking-wide ${colorStuff.buttonBg} transition-all duration-300 cursor-pointer ${colorStuff.glowHover}`}
            >
              <span>Ver Productos</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollHandler('services-section')}
              className="flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-4 rounded-xl font-display font-bold text-base tracking-wide border border-gray-800 bg-gray-950/40 hover:bg-gray-900/60 hover:border-gray-700 text-gray-200 transition-all cursor-pointer"
            >
              <span>Preguntar por Servicios</span>
            </button>
          </div>
        </motion.div>

        {/* Scroll indicator with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-40 hover:opacity-80 transition-opacity z-10"
          onClick={() => scrollHandler('catalog-section')}
        >
          <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-2">Deslizar para explorar</span>
          <ArrowDown className="h-4 w-4 text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
}
