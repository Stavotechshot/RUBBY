import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Copy, Check, Download, ExternalLink, X, Sparkles, Layers, Sliders, CheckCircle2 } from 'lucide-react';

export interface RubbyLogoProps {
  variant?: 'full' | 'compact' | 'icon' | 'badge';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  isLightMode?: boolean;
  className?: string;
  showSubtitle?: boolean;
  interactive?: boolean;
}

/**
 * World-Class Bespoke Geometric Vector Emblem for Rubby:
 * Pure SVG vector mark engineered with isometric diamond facet geometry.
 * Represents:
 * 1. The multifaceted Brilliance of a Royal Ruby (Security, Enduring Value, Rarity)
 * 2. An architectural forward-leaning 'R' Monogram (Liquidity, Velocity, Innovation)
 * 3. Continuous interlinked exchange facets (Card to Fiat Settlement)
 */
export function RubbyVectorMark({ className = 'w-10 h-10', isLightMode = false }: { className?: string; isLightMode?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Rubby Brand Mark"
    >
      <defs>
        {/* Core Imperial Ruby Gradients */}
        <linearGradient id="rubbyFacetTop" x1="20" y1="15" x2="80" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF3366" />
          <stop offset="50%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>

        <linearGradient id="rubbyFacetLoop" x1="45" y1="20" x2="105" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6584" />
          <stop offset="60%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#9F1239" />
        </linearGradient>

        <linearGradient id="rubbyFacetStem" x1="25" y1="30" x2="50" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BE123C" />
          <stop offset="70%" stopColor="#881337" />
          <stop offset="100%" stopColor="#4C0519" />
        </linearGradient>

        <linearGradient id="rubbyFacetKick" x1="50" y1="55" x2="95" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF4D6D" />
          <stop offset="60%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>

        <linearGradient id="rubbyGlint" x1="35" y1="20" x2="65" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#FFE4E6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="rubbyRoseGoldRim" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#F43F5E" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.7" />
        </linearGradient>

        {/* Outer Shadow Filter */}
        <filter id="rubbyDepthGlow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#E11D48" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Hexagonal Isometric Gemstone Outline with Micro Rose Gold Rim */}
      <polygon
        points="60,10 98,32 98,78 60,100 22,78 22,32"
        fill="#090B14"
        stroke="url(#rubbyRoseGoldRim)"
        strokeWidth="2"
        strokeLinejoin="round"
        filter="url(#rubbyDepthGlow)"
      />

      {/* Primary Facet 1: The Left Pillar / Stem of the 'R' */}
      <polygon
        points="26,35 48,35 48,88 32,79 26,75"
        fill="url(#rubbyFacetStem)"
      />

      {/* Primary Facet 2: The Upper Arch / Gemstone Table */}
      <polygon
        points="26,35 60,15 88,31 72,48 48,35"
        fill="url(#rubbyFacetTop)"
      />

      {/* Primary Facet 3: The Curved Right Vault / 'R' Loop */}
      <polygon
        points="72,48 94,35 94,65 72,70 54,58 72,48"
        fill="url(#rubbyFacetLoop)"
      />

      {/* Facet 4: The Internal Crystal Window (Gem Refraction) */}
      <polygon
        points="48,42 66,51 66,62 48,54"
        fill="#120A1A"
      />

      {/* Primary Facet 5: The Forward Dynamic Exchange Leg ('R' Kick / Arrow) */}
      <polygon
        points="52,58 72,58 92,90 70,95 48,68"
        fill="url(#rubbyFacetKick)"
      />

      {/* Optical Specular Glint: White Diamond Brilliant Reflection */}
      <polygon
        points="30,35 55,20 65,30 40,42"
        fill="url(#rubbyGlint)"
      />

      {/* Micro-Facet Accents: Refraction Seams */}
      <line x1="60" y1="15" x2="48" y2="35" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" />
      <line x1="72" y1="48" x2="94" y2="65" stroke="#FFA3B8" strokeOpacity="0.3" strokeWidth="0.8" />
      <line x1="48" y1="88" x2="70" y2="95" stroke="#BE123C" strokeOpacity="0.5" strokeWidth="1" />

      {/* Central Star Specular Glint Dot */}
      <circle cx="56" cy="34" r="2.2" fill="#FFFFFF" />
      <circle cx="56" cy="34" r="5" fill="#FFFFFF" fillOpacity="0.25" />
    </svg>
  );
}

export default function RubbyLogo({
  variant = 'full',
  size = 'md',
  isLightMode = false,
  className = '',
  showSubtitle = true,
  interactive = false
}: RubbyLogoProps) {
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [copiedSvg, setCopiedSvg] = useState(false);

  // Responsive dimension mapping
  const dimensions = {
    xs: { icon: 'w-6 h-6', text: 'text-sm', sub: 'text-[8px]', gap: 'gap-2' },
    sm: { icon: 'w-8 h-8', text: 'text-base', sub: 'text-[9px]', gap: 'gap-2.5' },
    md: { icon: 'w-10 h-10', text: 'text-lg', sub: 'text-[10px]', gap: 'gap-3' },
    lg: { icon: 'w-12 h-12', text: 'text-xl', sub: 'text-xs', gap: 'gap-3.5' },
    xl: { icon: 'w-16 h-16', text: 'text-2xl', sub: 'text-sm', gap: 'gap-4' },
    hero: { icon: 'w-24 h-24', text: 'text-4xl', sub: 'text-base', gap: 'gap-5' }
  }[size];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  const svgVectorCode = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rubbyFacetTop" x1="20" y1="15" x2="80" y2="55" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FF3366" />
      <stop offset="50%" stop-color="#E11D48" />
      <stop offset="100%" stop-color="#BE123C" />
    </linearGradient>
    <linearGradient id="rubbyFacetLoop" x1="45" y1="20" x2="105" y2="70" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FF6584" />
      <stop offset="60%" stop-color="#E11D48" />
      <stop offset="100%" stop-color="#9F1239" />
    </linearGradient>
    <linearGradient id="rubbyFacetStem" x1="25" y1="30" x2="50" y2="105" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#BE123C" />
      <stop offset="70%" stop-color="#881337" />
      <stop offset="100%" stop-color="#4C0519" />
    </linearGradient>
    <linearGradient id="rubbyFacetKick" x1="50" y1="55" x2="95" y2="105" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FF4D6D" />
      <stop offset="60%" stop-color="#E11D48" />
      <stop offset="100%" stop-color="#881337" />
    </linearGradient>
    <linearGradient id="rubbyRoseGoldRim" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FDE68A" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#F43F5E" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#F59E0B" stop-opacity="0.7" />
    </linearGradient>
  </defs>
  <polygon points="60,10 98,32 98,78 60,100 22,78 22,32" fill="#090B14" stroke="url(#rubbyRoseGoldRim)" stroke-width="2" stroke-linejoin="round" />
  <polygon points="26,35 48,35 48,88 32,79 26,75" fill="url(#rubbyFacetStem)" />
  <polygon points="26,35 60,15 88,31 72,48 48,35" fill="url(#rubbyFacetTop)" />
  <polygon points="72,48 94,35 94,65 72,70 54,58 72,48" fill="url(#rubbyFacetLoop)" />
  <polygon points="48,42 66,51 66,62 48,54" fill="#120A1A" />
  <polygon points="52,58 72,58 92,90 70,95 48,68" fill="url(#rubbyFacetKick)" />
  <circle cx="56" cy="34" r="2.2" fill="#FFFFFF" />
</svg>`;

  const handleCopySvg = () => {
    navigator.clipboard?.writeText(svgVectorCode);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  // High-performance emblem container with subtle ambient glow
  const renderEmblem = () => (
    <div className={`relative ${dimensions.icon} shrink-0 group`}>
      {/* Outer ambient glow */}
      <div className="absolute -inset-1 bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 rounded-2xl blur-[6px] opacity-40 group-hover:opacity-75 transition duration-300" />
      
      {/* Precision Vector Emblem */}
      <div className="relative w-full h-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
        <RubbyVectorMark className="w-full h-full" isLightMode={isLightMode} />
      </div>
    </div>
  );

  // Icon only variant
  if (variant === 'icon') {
    return (
      <div 
        className={`inline-flex items-center ${className} ${interactive ? 'cursor-pointer' : ''}`}
        onClick={interactive ? () => setShowBrandModal(true) : undefined}
        title="Rubby Master Mark"
      >
        {renderEmblem()}
      </div>
    );
  }

  // Institutional Badge variant
  if (variant === 'badge') {
    return (
      <div 
        onClick={interactive ? () => setShowBrandModal(true) : undefined}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 backdrop-blur-md shadow-lg shadow-rose-900/20 ${className} ${interactive ? 'cursor-pointer hover:border-rose-400' : ''}`}
      >
        <div className="w-5 h-5 shrink-0">
          <RubbyVectorMark className="w-full h-full" isLightMode={isLightMode} />
        </div>
        <span className="text-xs font-black tracking-wider text-rose-300 font-sans uppercase">
          Rubby Verified
        </span>
      </div>
    );
  }

  // Full & Compact Variants
  return (
    <>
      <div 
        className={`inline-flex items-center ${dimensions.gap} ${className}`}
      >
        {renderEmblem()}

        <div className="flex flex-col text-left select-none">
          {/* Typographic Identity: Modern Bold Wordmark + Ruby Diamond Accent */}
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black tracking-[0.08em] ${dimensions.text} font-sans ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}>
              RUBBY
            </span>
            {/* Precious Ruby Prism Pip */}
            <span className="w-1.5 h-1.5 rotate-45 bg-gradient-to-r from-rose-500 to-amber-500 rounded-[1px] shadow-sm shadow-rose-500/80 inline-block" />
          </div>

          {/* Subtitle / Department Lockup */}
          {showSubtitle && variant === 'full' && (
            <span className={`hidden sm:block font-bold tracking-[0.18em] uppercase font-sans mt-0.5 leading-none ${dimensions.sub} ${
              isLightMode ? 'text-slate-500' : 'text-rose-400/90'
            }`}>
              Global Asset Exchange
            </span>
          )}
        </div>
      </div>

      {/* BRAND IDENTITY & DESIGN SPEC MODAL */}
      <AnimatePresence>
        {showBrandModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              className="relative w-full max-w-2xl bg-[#090C16] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden max-h-[92vh] overflow-y-auto"
            >
              {/* Luxury ambient backdrop */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/15 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-600/10 rounded-full blur-[90px] pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowBrandModal(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl border border-rose-500/40 p-2 bg-[#101424] shadow-xl shadow-rose-950/60 shrink-0 flex items-center justify-center">
                  <RubbyVectorMark className="w-full h-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                      Rubby Brand Architecture
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                      Vector Mark
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Mathematical isometric gemstone geometry, interlocking liquidity facets, and institutional typography.
                  </p>
                </div>
              </div>

              {/* Showcase Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121628] to-[#0A0D18] border border-white/5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-1">
                    Design Constitution & Geometry
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1.5">
                    The Hexagonal Prism & Monogram 'R'
                  </h3>
                  <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
                    Built on strict vector mathematics, the emblem synthesizes the 6-point pavilion of a brilliant ruby gemstone with the dynamic forward leg of an 'R', signifying continuous liquidity and instant settlement.
                  </p>
                </div>

                <div className="w-32 h-32 rounded-2xl p-3 bg-[#080B14] border-2 border-rose-500/40 shadow-2xl shadow-rose-900/40 shrink-0 flex items-center justify-center">
                  <RubbyVectorMark className="w-full h-full" />
                </div>
              </div>

              {/* Brand Color System */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                  <span>Official Palette Tokens</span>
                  <span className="text-[10px] text-slate-500 font-normal">Click to copy hex</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { name: 'Imperial Ruby', hex: '#E11D48', desc: 'Primary Brand Token', bg: 'bg-[#E11D48]' },
                    { name: 'Rose Glint', hex: '#FF4D6D', desc: 'Prismatic Highlight', bg: 'bg-[#FF4D6D]' },
                    { name: 'Royal Garnet', hex: '#881337', desc: 'Pavilion Shadow', bg: 'bg-[#881337]' },
                    { name: 'Obsidian Velvet', hex: '#090A11', desc: 'Exchange Canvas', bg: 'bg-[#090A11]' },
                  ].map(color => (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => handleCopyColor(color.hex)}
                      className="p-3 rounded-xl border border-white/10 bg-white/5 hover:border-rose-500/40 text-left transition flex flex-col justify-between cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-6 h-6 rounded-lg ${color.bg} border border-white/20 shadow-xs`} />
                        {copiedColor === color.hex ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">{color.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono block">{color.hex}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vector Code & Usage */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-white block">Production Scalable SVG</span>
                  <span className="text-[11px] text-slate-400 block">
                    Zero blur at any resolution. Pure mathematical vectors.
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopySvg}
                    className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-rose-600/30 cursor-pointer"
                  >
                    {copiedSvg ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                    <span>{copiedSvg ? 'Copied SVG' : 'Copy SVG'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const blob = new Blob([svgVectorCode], { type: 'image/svg+xml' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'rubby_official_logo.svg';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .SVG</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
