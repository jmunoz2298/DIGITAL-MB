import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Video, Layout, Wrench, Sparkles, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Service, StoreConfig } from '../types';
import { getNeonColorClasses, generateWhatsAppUrl } from '../utils';

interface ServicesProps {
  services: Service[];
  config: StoreConfig;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Cpu':
      return Cpu;
    case 'Video':
      return Video;
    case 'Layout':
      return Layout;
    case 'Wrench':
    default:
      return Wrench;
  }
};

export default function Services({ services, config }: ServicesProps) {
  const colorStuff = getNeonColorClasses(config.neonColor);

  return (
    <section id="services-section" className="py-24 relative overflow-hidden bg-gray-950/20 border-y border-gray-950">
      {/* Decorative Lights */}
      <div 
        className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full glow-overlay opacity-20 z-0" 
        style={{ backgroundColor: colorStuff.accentHex, filter: 'blur(100px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className={`px-3 py-1 rounded-full text-xs font-mono tracking-widest ${colorStuff.badge} uppercase`}>
            Desarrollo de Élite
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Nuestros <span className={colorStuff.text}>Servicios Oficiales</span>
          </h2>
          <p className="font-sans text-gray-400 max-w-xl font-light">
            Creamos experiencias digitales cinematográficas, automatizamos procesos complejos con IA y optimizamos tu infraestructura digital de punta a punta.
          </p>
        </div>

        {/* Bento Grid layout for Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = getIconComponent(service.iconName);
            const defaultMessage = `Hola, estoy interesado en tu servicio profesional de "${service.name}". ¿Me podrías dar información detallada y una cotización para mi proyecto?`;
            const customMessage = service.whatsappMessage || defaultMessage;
            const contactUrl = generateWhatsAppUrl(config.whatsappNumber, customMessage);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col p-8 sm:p-10 rounded-3xl border border-gray-900 bg-gray-950/40 hover:bg-gray-900/10 hover:border-gray-800 backdrop-blur-md transition-all duration-300 relative overflow-hidden group ${colorStuff.glowHover}`}
              >
                {/* Internal Glow Effect */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorStuff.radial} rounded-full glow-overlay opacity-30 group-hover:opacity-40 transition-opacity duration-300`} />

                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-2xl ${colorStuff.bg} border ${colorStuff.border} ${colorStuff.glow} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                      <IconComponent className={`h-7 w-7 ${colorStuff.text}`} />
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
                      {service.name}
                    </h3>
                  </div>

                  <span className="inline-flex self-start sm:self-center px-3 py-1 rounded-full text-[10px] font-mono tracking-wider font-bold bg-gray-950 text-gray-400 border border-gray-900">
                    SOPORTE DIRECTO
                  </span>
                </div>

                {/* Description */}
                <p className="font-sans text-gray-400 font-light leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Bullet Points */}
                <div className="flex-1">
                  <h4 className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase mb-4">incluye en el servicio:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-sm font-sans text-gray-300">
                        <CheckCircle2 className={`h-4.5 w-4.5 mt-0.5 shrink-0 ${colorStuff.text}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button Bottom Footer */}
                <div className="pt-6 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs font-mono text-gray-500 font-medium">Cotización inmediata sin compromiso</span>
                  <a
                    href={contactUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className={`group flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 rounded-xl font-display font-bold text-sm tracking-wide ${colorStuff.buttonBg} transition-all duration-300 cursor-pointer`}
                  >
                    <span>Obtener Servicio</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
