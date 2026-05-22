import React from 'react';

interface MBDigitalLogoProps {
  className?: string;
  showGlow?: boolean;
  neonColorHex?: string;
}

export default function MBDigitalLogo({ 
  className = "h-12 w-12", 
  showGlow = true,
  neonColorHex = "#13f064" // Vibrant high-tech neon green from official logo
}: MBDigitalLogoProps) {
  return (
    <svg 
      viewBox="0 0 500 500" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Intense neon glow filter */}
        {showGlow && (
          <filter id="mb-neon-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="16" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
        
        {/* Soft shadow for depth */}
        <filter id="mb-drop-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.8" />
        </filter>

        {/* Premium gradient for letter 'M' */}
        <linearGradient id="mb-m-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#13f064" />
          <stop offset="100%" stopColor="#00b0ff" />
        </linearGradient>

        {/* Premium chrome-silver gradient for letter 'B' */}
        <linearGradient id="mb-b-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#D1D5DB" />
        </linearGradient>
      </defs>

      {/* Main container with subtle drop shadow */}
      <g filter="url(#mb-drop-shadow)">
        
        {/* --- OUTER SPLIT CIRCLE --- */}
        {/* Top-Right Arc (Glowing Neon Green) */}
        <path 
          d="M 255 70 A 180 180 0 0 1 430 245" 
          stroke={neonColorHex} 
          strokeWidth="6" 
          strokeLinecap="round"
          filter={showGlow ? "url(#mb-neon-glow)" : undefined}
        />
        
        {/* Bottom-Left Arc (Glowing Neon Green) */}
        <path 
          d="M 245 430 A 180 180 0 0 1 70 255" 
          stroke={neonColorHex} 
          strokeWidth="6" 
          strokeLinecap="round"
          filter={showGlow ? "url(#mb-neon-glow)" : undefined}
        />
        
        {/* Top-Left Arc (Sleek Clean White) */}
        <path 
          d="M 70 245 A 180 180 0 0 1 245 70" 
          stroke="#FFFFFF" 
          strokeWidth="4.5" 
          strokeLinecap="round"
        />
        
        {/* Bottom-Right Arc (Sleek Clean White) */}
        <path 
          d="M 430 255 A 180 180 0 0 1 255 430" 
          stroke="#FFFFFF" 
          strokeWidth="4.5" 
          strokeLinecap="round"
        />

        {/* --- ATOM / ELECTRON ORBITS (Top Inner Section) --- */}
        <g filter={showGlow ? "url(#mb-neon-glow)" : undefined}>
          {/* Orbit Ring 1 (Tilted Left) */}
          <ellipse 
            cx="250" 
            cy="160" 
            rx="53" 
            ry="21" 
            stroke={neonColorHex} 
            strokeWidth="3.2" 
            fill="none" 
            transform="rotate(-55 250 160)" 
            opacity="0.85"
          />
          
          {/* Orbit Ring 2 (Tilted Right) */}
          <ellipse 
            cx="250" 
            cy="160" 
            rx="53" 
            ry="21" 
            stroke={neonColorHex} 
            strokeWidth="3.2" 
            fill="none" 
            transform="rotate(55 250 160)" 
            opacity="0.85"
          />
          
          {/* Orbit Ring 3 (Horizontal Angle) */}
          <ellipse 
            cx="250" 
            cy="160" 
            rx="56" 
            ry="14" 
            stroke={neonColorHex} 
            strokeWidth="3" 
            fill="none" 
            transform="rotate(-15 250 160)" 
            opacity="0.8"
          />
        </g>

        {/* --- GLOWING ORBITAL SPHERES --- */}
        {/* Sphere 1 (Top Right) */}
        <g>
          {/* Large soft glow circle */}
          <circle cx="295" cy="132" r="14" fill={neonColorHex} opacity="0.3" filter={showGlow ? "url(#mb-neon-glow)" : undefined} />
          {/* Main solid sphere */}
          <circle cx="295" cy="132" r="8" fill={neonColorHex} filter={showGlow ? "url(#mb-neon-glow)" : undefined} />
          {/* Metallic highlight */}
          <circle cx="293.5" cy="130.5" r="2.2" fill="#FFFFFF" />
        </g>

        {/* Sphere 2 (Mid Left) */}
        <g>
          {/* Large soft glow circle */}
          <circle cx="203" cy="158" r="14" fill={neonColorHex} opacity="0.3" filter={showGlow ? "url(#mb-neon-glow)" : undefined} />
          {/* Main solid sphere */}
          <circle cx="203" cy="158" r="8" fill={neonColorHex} filter={showGlow ? "url(#mb-neon-glow)" : undefined} />
          {/* Metallic highlight */}
          <circle cx="201.5" cy="156.5" r="2.2" fill="#FFFFFF" />
        </g>

        {/* Sphere 3 (Bottom Center Left) */}
        <g>
          {/* Large soft glow circle */}
          <circle cx="225" cy="189" r="14" fill={neonColorHex} opacity="0.3" filter={showGlow ? "url(#mb-neon-glow)" : undefined} />
          {/* Main solid sphere */}
          <circle cx="225" cy="189" r="8" fill={neonColorHex} filter={showGlow ? "url(#mb-neon-glow)" : undefined} />
          {/* Metallic highlight */}
          <circle cx="223.5" cy="187.5" r="2.2" fill="#FFFFFF" />
        </g>

        {/* --- GEOMETRIC FUTURISTIC 'MB' HEADLINE --- */}
        {/* Letter 'M' (Vibrant Gradient with optional neon glow) */}
        <text 
          x="192" 
          y="298" 
          fontFamily="'Outfit', 'Inter', 'Space Grotesk', system-ui, sans-serif" 
          fontWeight="900" 
          fontSize="98" 
          fill="url(#mb-m-gradient)" 
          textAnchor="middle"
          filter={showGlow ? "url(#mb-neon-glow)" : undefined}
        >
          M
        </text>

        {/* Letter 'B' (Gleaming Chrome Steel White) */}
        <text 
          x="302" 
          y="298" 
          fontFamily="'Outfit', 'Inter', 'Space Grotesk', system-ui, sans-serif" 
          fontWeight="900" 
          fontSize="98" 
          fill="url(#mb-b-gradient)" 
          textAnchor="middle"
        >
          B
        </text>

        {/* --- SUBTITLE '- DIGITAL -' --- */}
        {/* Left Green Accent Bar */}
        <rect 
          x="105" 
          y="342" 
          width="32" 
          height="4" 
          rx="2" 
          fill={neonColorHex} 
          filter={showGlow ? "url(#mb-neon-glow)" : undefined} 
        />

        {/* Core Subtitle Text */}
        <text 
          x="252" 
          y="349" 
          fontFamily="'Space Grotesk', 'Inter', sans-serif" 
          fontWeight="800" 
          fontSize="21" 
          letterSpacing="15" 
          fill="#FFFFFF" 
          textAnchor="middle"
        >
          DIGITAL
        </text>

        {/* Right Green Accent Bar */}
        <rect 
          x="363" 
          y="342" 
          width="32" 
          height="4" 
          rx="2" 
          fill={neonColorHex} 
          filter={showGlow ? "url(#mb-neon-glow)" : undefined} 
        />
      </g>
    </svg>
  );
}
