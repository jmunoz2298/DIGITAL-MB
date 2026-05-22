export const getNeonColorClasses = (color: string) => {
  switch (color) {
    case 'blue':
      return {
        text: 'text-blue-400',
        textMuted: 'text-blue-500/80',
        border: 'border-blue-500/20',
        borderHover: 'hover:border-blue-400/50',
        bg: 'bg-blue-500/5',
        bgSolid: 'bg-blue-600',
        bgSolidHover: 'hover:bg-blue-500',
        buttonBg: 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20',
        glow: 'shadow-[0_0_20px_-3px_rgba(59,130,246,0.25)]',
        glowHover: 'hover:shadow-[0_0_25px_-2px_rgba(59,130,246,0.45)]',
        radial: 'from-blue-500/10 via-transparent to-transparent',
        accentHex: '#3b82f6',
        bullet: 'bg-blue-400',
        waveGlow: 'rgba(59,130,246,0.15)',
        badge: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      };
    case 'purple':
      return {
        text: 'text-purple-400',
        textMuted: 'text-purple-500/80',
        border: 'border-purple-500/20',
        borderHover: 'hover:border-purple-400/50',
        bg: 'bg-purple-500/5',
        bgSolid: 'bg-purple-600',
        bgSolidHover: 'hover:bg-purple-500',
        buttonBg: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20',
        glow: 'shadow-[0_0_20px_-3px_rgba(168,85,247,0.25)]',
        glowHover: 'hover:shadow-[0_0_25px_-2px_rgba(168,85,247,0.45)]',
        radial: 'from-purple-500/10 via-transparent to-transparent',
        accentHex: '#a855f7',
        bullet: 'bg-purple-400',
        waveGlow: 'rgba(168,85,247,0.15)',
        badge: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
      };
    case 'emerald':
      return {
        text: 'text-emerald-400',
        textMuted: 'text-emerald-500/80',
        border: 'border-emerald-500/20',
        borderHover: 'hover:border-emerald-400/50',
        bg: 'bg-emerald-500/5',
        bgSolid: 'bg-emerald-600',
        bgSolidHover: 'hover:bg-emerald-500',
        buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20',
        glow: 'shadow-[0_0_20px_-3px_rgba(16,185,129,0.25)]',
        glowHover: 'hover:shadow-[0_0_25px_-2px_rgba(16,185,129,0.45)]',
        radial: 'from-emerald-500/10 via-transparent to-transparent',
        accentHex: '#10b981',
        bullet: 'bg-emerald-400',
        waveGlow: 'rgba(16,185,129,0.15)',
        badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      };
    case 'indigo':
      return {
        text: 'text-indigo-400',
        textMuted: 'text-indigo-500/80',
        border: 'border-indigo-500/20',
        borderHover: 'hover:border-indigo-400/50',
        bg: 'bg-indigo-500/5',
        bgSolid: 'bg-indigo-600',
        bgSolidHover: 'hover:bg-indigo-500',
        buttonBg: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20',
        glow: 'shadow-[0_0_20px_-3px_rgba(99,102,241,0.25)]',
        glowHover: 'hover:shadow-[0_0_25px_-2px_rgba(99,102,241,0.45)]',
        radial: 'from-indigo-500/10 via-transparent to-transparent',
        accentHex: '#6366f1',
        bullet: 'bg-indigo-400',
        waveGlow: 'rgba(99,102,241,0.15)',
        badge: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
      };
    case 'cyan':
    default:
      return {
        text: 'text-cyan-400',
        textMuted: 'text-cyan-500/80',
        border: 'border-cyan-500/20',
        borderHover: 'hover:border-cyan-400/50',
        bg: 'bg-cyan-500/5',
        bgSolid: 'bg-cyan-600',
        bgSolidHover: 'hover:bg-cyan-500',
        buttonBg: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/20',
        glow: 'shadow-[0_0_20px_-3px_rgba(6,182,212,0.25)]',
        glowHover: 'hover:shadow-[0_0_25px_-2px_rgba(6,182,212,0.45)]',
        radial: 'from-cyan-500/10 via-transparent to-transparent',
        accentHex: '#06b6d4',
        bullet: 'bg-cyan-400',
        waveGlow: 'rgba(6,182,212,0.15)',
        badge: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
      };
  }
};

export function generateWhatsAppUrl(phoneNumber: string, message: string) {
  // Use simple sanitization, preserving numbers
  const sanitizedNumber = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(message)}`;
}
