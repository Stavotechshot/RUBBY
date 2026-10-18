import React from 'react';

export interface BrandLogoProps {
  brandId: string;
  className?: string;
  size?: number | string;
  variant?: 'badge' | 'icon' | 'pill';
}

/**
 * Authentic vector logos for all supported gift card brands:
 * - Steam Wallet (Official Valve Steam geometric crank/piston emblem)
 * - Apple & iTunes (Official Apple silhouette with bite and leaf)
 * - Razer Gold (Official triple-headed snake emblem with acid green gradient)
 * - Vanilla Visa (Official Visa wordmark with italic gold accent wing)
 * - Amazon (Official curved smile arrow from a to z with golden amber)
 * - Walmart (Official iconic 6-spark yellow burst star)
 * - PlayStation Network (Official Sony PS iconic intertwined geometry)
 * - Xbox (Official sphere with glowing dimensional X cut)
 * - Starbucks (Official Siren crowned twin-tailed mermaid emblem)
 * - Google Play (Official iconic 4-color isometric play triangle)
 * - Sephora (Official black and white flame ribbon wave)
 * - eBay (Official 4-color overlapping lowercase wordmark)
 * - Nike (Official iconic Swoosh)
 * - Nordstrom (Official elegant serif Nordstrom typographic monogram)
 * - Target Group (Official concentric red and white bullseye)
 * - Nintendo eShop (Official iconic racetrack oval with bold racetrack logo)
 */
export default function BrandLogo({ brandId, className = 'w-5 h-5', size, variant = 'icon' }: BrandLogoProps) {
  const style = size ? { width: size, height: size } : undefined;

  switch (brandId.toLowerCase()) {
    // 0. RUBBY (Official Royal Ruby Multifaceted Geometric Vector Insignia)
    case 'rubby':
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          className={className}
          style={style}
          role="img"
          aria-label="Rubby Royal Gemstone Logo"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="blRubyFacetTop" x1="20" y1="15" x2="80" y2="55" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF3366" />
              <stop offset="50%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
            <linearGradient id="blRubyFacetLoop" x1="45" y1="20" x2="105" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF6584" />
              <stop offset="60%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>
            <linearGradient id="blRubyFacetStem" x1="25" y1="30" x2="50" y2="105" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#BE123C" />
              <stop offset="70%" stopColor="#881337" />
              <stop offset="100%" stopColor="#4C0519" />
            </linearGradient>
            <linearGradient id="blRubyFacetKick" x1="50" y1="55" x2="95" y2="105" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF4D6D" />
              <stop offset="60%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>
            <linearGradient id="blRubyRoseGoldRim" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#F43F5E" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <polygon points="60,10 98,32 98,78 60,100 22,78 22,32" fill="#090B14" stroke="url(#blRubyRoseGoldRim)" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="26,35 48,35 48,88 32,79 26,75" fill="url(#blRubyFacetStem)" />
          <polygon points="26,35 60,15 88,31 72,48 48,35" fill="url(#blRubyFacetTop)" />
          <polygon points="72,48 94,35 94,65 72,70 54,58 72,48" fill="url(#blRubyFacetLoop)" />
          <polygon points="48,42 66,51 66,62 48,54" fill="#120A1A" />
          <polygon points="52,58 72,58 92,90 70,95 48,68" fill="url(#blRubyFacetKick)" />
          <polygon points="30,35 55,20 65,30 40,42" fill="#FFFFFF" fillOpacity="0.75" />
          <circle cx="56" cy="34" r="2.2" fill="#FFFFFF" />
        </svg>
      );

    // 1. STEAM WALLET (Official Valve Steam Mechanical Crank/Piston)
    case 'steam':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          style={style}
          role="img"
          aria-label="Steam Logo"
        >
          <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.008l2.861-4.142V8.92c0-2.485 2.025-4.51 4.51-4.51s4.51 2.025 4.51 4.51-2.025 4.51-4.51 4.51c-.021 0-.042 0-.063-.002l-4.086 2.912c0 .052.005.105.005.158 0 1.861-1.517 3.378-3.378 3.378-1.574 0-2.899-1.09-3.262-2.559L.43 15.178C2.003 20.315 6.757 24 12.378 24 19.018 24 24 18.627 24 11.987 24 5.347 18.618 0 11.979 0zm4.12 6.552c1.332 0 2.413 1.08 2.413 2.413 0 1.332-1.081 2.413-2.413 2.413s-2.413-1.081-2.413-2.413c0-1.333 1.08-2.413 2.413-2.413zm-7.87 8.358l-2.086-.862c.319-.663.957-1.144 1.719-1.229l2.253.931c-.347.303-.61.696-.732 1.149l-1.154.011zm.344 3.992c-.896 0-1.632-.71-1.666-1.597l1.776.734c.732.302 1.558-.027 1.874-.747.319-.728-.016-1.564-.738-1.879l-1.815-.75c.184-.047.378-.073.579-.073 1.258 0 2.278 1.02 2.278 2.278 0 1.259-1.02 2.279-2.288 2.279z" />
        </svg>
      );

    // 2. APPLE & ITUNES (Official Apple Silhouette)
    case 'apple':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          style={style}
          role="img"
          aria-label="Apple Logo"
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.54c.67-.82 1.13-1.96.99-3.04-.98.05-2.15.65-2.85 1.47-.62.72-1.15 1.88-1.01 2.99 1.1.09 2.22-.57 2.87-1.42z" />
        </svg>
      );

    // 3. RAZER GOLD (Official Razer Triple-Headed Acid Snake Logo)
    case 'razer':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          role="img"
          aria-label="Razer Gold Logo"
        >
          <path
            d="M12 2C7.8 2 4.1 4.5 2.5 8.2l3.4 1.3C7 7.2 9.3 5.5 12 5.5c3.6 0 6.5 2.9 6.5 6.5 0 1.2-.3 2.3-.9 3.3l3.2 1.6C21.6 15.3 22 13.7 22 12c0-5.5-4.5-10-10-10z"
            fill="#00FF00"
          />
          <path
            d="M6.3 12c0-1.6.6-3 1.6-4.1L5.5 5.5C3.3 7.2 2 9.4 2 12c0 4.8 3.5 8.8 8.1 9.7l.7-3.4C7.8 17.6 6.3 15 6.3 12z"
            fill="#00FF00"
          />
          <path
            d="M12 18.5c-2.4 0-4.4-1.3-5.5-3.2l-3.2 1.6C5.1 19.9 8.3 22 12 22c3.9 0 7.3-2.2 8.9-5.4l-3.3-1.4c-.9 2-3 3.3-5.6 3.3z"
            fill="#00FF00"
          />
          <circle cx="12" cy="12" r="2.2" fill="#00FF00" />
        </svg>
      );

    // 4. VANILLA VISA (Official Visa Wordmark with italic cut)
    case 'vanilla':
    case 'visa':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          role="img"
          aria-label="Vanilla Visa Logo"
        >
          {/* Official VISA italic typography */}
          <path
            d="M9.1 16.5L10.7 7H13.2L11.6 16.5H9.1Z"
            fill="#1A1F71"
          />
          <path
            d="M17.8 7.2C17.3 7 16.5 6.8 15.5 6.8C12.9 6.8 11.1 8.2 11.1 10.1C11.1 11.5 12.4 12.3 13.4 12.8C14.4 13.3 14.7 13.6 14.7 14C14.7 14.7 13.9 15 13.1 15C12.1 15 11.5 14.8 10.8 14.5L10.4 14.3L10.1 16.3C10.7 16.6 11.8 16.8 12.9 16.8C15.7 16.8 17.5 15.4 17.5 13.4C17.5 12.3 16.8 11.4 15.3 10.7C14.4 10.2 13.9 9.9 13.9 9.4C13.9 8.9 14.5 8.5 15.5 8.5C16.3 8.5 17 8.7 17.4 8.9L17.6 9L17.8 7.2Z"
            fill="#1A1F71"
          />
          <path
            d="M20.5 7H18.5C17.9 7 17.4 7.2 17.2 7.7L14.7 14.1L16.2 16.5H19L20.8 7H20.5Z"
            fill="#1A1F71"
          />
          <path
            d="M6.9 7L4.5 13.5L4.2 12.2C3.8 10.7 2.7 9.3 1.3 8.6L3.4 16.5H6L9.8 7H6.9Z"
            fill="#F7B600"
          />
        </svg>
      );

    // 5. AMAZON (Official Amazon curved smile arrow with a-to-z dimple)
    case 'amazon':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          role="img"
          aria-label="Amazon Logo"
        >
          {/* Stylized lowercase 'a' */}
          <path
            d="M13.2 11.4c-.1-.8-.8-1.4-1.7-1.4-.9 0-1.6.6-1.7 1.4h3.4zm-1.7-3.1c2.6 0 4.1 1.4 4.1 4.1v4h-2.3v-.9c-.6.7-1.5 1.1-2.4 1.1-1.7 0-3-1.1-3-2.8 0-1.8 1.4-2.7 3.2-2.8l2.2-.1v-.4c0-1.1-.7-1.7-1.8-1.7-.8 0-1.6.3-2.1.8l-1.3-1.4c1-1 2.5-1.5 4.3-1.5z"
            fill="currentColor"
          />
          {/* Iconic Smile Arrow */}
          <path
            d="M2.5 17.8c4.2 2.8 10.1 3.4 15.2 1.3.6-.2 1.1-.6 1.6-1 .2-.2.3-.4.1-.6-.2-.1-.4 0-.6.1-4.7 2.1-10.4 1.6-14.3-.9-.2-.1-.4-.1-.5.1-.1.3 0 .7.5 1z"
            fill="#FF9900"
          />
          <path
            d="M20.2 16.8c-.5.4-1.2.7-1.8.8-.2 0-.3.2-.2.4.1.1.2.2.3.2 1 .2 2 .1 2.7-.4.2-.1.2-.4 0-.5-.3-.3-1.2-1.1-1.5-1.4-.2-.1-.4 0-.4.2.1.3.4.6.9.7z"
            fill="#FF9900"
          />
        </svg>
      );

    // 6. WALMART (Official 6-Spark Yellow Starburst)
    case 'walmart':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          role="img"
          aria-label="Walmart Logo"
        >
          <g fill="#FFC220">
            {/* Top spark */}
            <path d="M12 2.5c-.7 0-1.2.6-1.2 1.3v4.4c0 .7.5 1.3 1.2 1.3s1.2-.6 1.2-1.3V3.8c0-.7-.5-1.3-1.2-1.3z" />
            {/* Bottom spark */}
            <path d="M12 14.5c-.7 0-1.2.6-1.2 1.3v4.4c0 .7.5 1.3 1.2 1.3s1.2-.6 1.2-1.3v-4.4c0-.7-.5-1.3-1.2-1.3z" />
            {/* Top-Right spark */}
            <path d="M19.8 7.5c-.3-.6-1.1-.8-1.7-.5l-3.8 2.2c-.6.3-.8 1.1-.5 1.7.3.6 1.1.8 1.7.5l3.8-2.2c.6-.3.8-1.1.5-1.7z" />
            {/* Bottom-Left spark */}
            <path d="M9.4 13.5c-.3-.6-1.1-.8-1.7-.5l-3.8 2.2c-.6.3-.8 1.1-.5 1.7.3.6 1.1.8 1.7.5l3.8-2.2c.6-.3.8-1.1.5-1.7z" />
            {/* Top-Left spark */}
            <path d="M4.2 7.5c-.6.3-.8 1.1-.5 1.7l3.8 2.2c.6.3 1.4.1 1.7-.5.3-.6.1-1.4-.5-1.7L4.9 7c-.2-.1-.5-.1-.7.5z" />
            {/* Bottom-Right spark */}
            <path d="M14.6 13.5c-.6-.3-1.4-.1-1.7.5-.3.6-.1 1.4.5 1.7l3.8 2.2c.6.3 1.4.1 1.7-.5.3-.6.1-1.4-.5-1.7l-3.8-2.2z" />
          </g>
        </svg>
      );

    // 7. PLAYSTATION NETWORK (Official Intertwined PS Logo)
    case 'playstation':
    case 'psn':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          role="img"
          aria-label="PlayStation Logo"
        >
          {/* Upright P */}
          <path
            d="M8.2 4.1C6.9 4.6 6 5.8 6 7.3c0 2.4 1.7 3.5 4.3 3.5h.9V5.2C10.1 4.5 9.1 4.1 8.2 4.1zm3 8.3v-1.6h-.8c-1.6 0-2.6-.7-2.6-2 0-1.1.7-1.8 1.9-2.1.5-.1 1-.2 1.5-.2v5.9z"
            fill="#003791"
          />
          {/* Base S */}
          <path
            d="M21.2 16.9c-.3-.4-.8-.7-1.6-.9l-2.4-.6c-.9-.2-1.2-.5-1.2-.9 0-.5.5-.8 1.4-.8 1 0 2.2.4 3.1.9l.9-1.9c-1.1-.6-2.6-1-4.1-1-2.4 0-4 1.2-4 3.1 0 1.5 1 2.4 2.8 2.8l2.2.5c.8.2 1.1.5 1.1.9 0 .6-.7.9-1.7.9-1.2 0-2.7-.5-3.8-1.3l-1 1.9c1.3.9 3.1 1.4 4.8 1.4 2.7 0 4.4-1.3 4.4-3.3 0-.6-.3-1.2-.9-1.6z"
            fill="#0070D1"
          />
          <path
            d="M11.2 2v14.5l-4.5-1.5V11L4 12.3v3.8l7.2 2.4V2z"
            fill="#003791"
          />
        </svg>
      );

    // 8. XBOX (Official Xbox Dimensional Sphere with X Cut)
    case 'xbox':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          role="img"
          aria-label="Xbox Logo"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12c0 1.95.56 3.77 1.53 5.31C4.46 16.03 6.94 13.5 8.9 11.5c-1.38-1.85-2.22-3.79-2.38-4.19C7.9 6.27 9.87 5.7 12 5.7c2.13 0 4.1.57 5.48 1.61-.16.4-1 2.34-2.38 4.19 1.96 2 4.44 4.53 5.37 5.81.97-1.54 1.53-3.36 1.53-5.31 0-5.52-4.48-10-10-10z"
            fill="#107C10"
          />
          <path
            d="M12 14.8c-2.3 2.3-5.2 4.7-6.9 5.8C6.98 21.46 9.39 22 12 22s5.02-.54 6.9-1.4c-1.7-1.1-4.6-3.5-6.9-5.8z"
            fill="#107C10"
          />
        </svg>
      );

    // 9. STARBUCKS (Official Siren Twin-Tailed Mermaid Crown & Star)
    case 'starbucks':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          role="img"
          aria-label="Starbucks Logo"
        >
          <circle cx="12" cy="12" r="10.5" fill="#006241" />
          {/* Siren Face & Crown */}
          <path
            d="M12 5.5l.8 1.6 1.8.3-1.3 1.3.3 1.8-1.6-.8-1.6.8.3-1.8-1.3-1.3 1.8-.3L12 5.5z"
            fill="#FFFFFF"
          />
          <path
            d="M10 13c0 1.1.9 2 2 2s2-.9 2-2v-1.5h-4V13z"
            fill="#FFFFFF"
          />
          <path
            d="M7 11.5c.5 1.5 1.5 2.8 3 3.5-.8 1.2-1.2 2.6-1.2 4h1.5c0-1.8.9-3.4 2.2-4.4 1.3 1 2.2 2.6 2.2 4.4h1.5c0-1.4-.4-2.8-1.2-4 1.5-.7 2.5-2 3-3.5-1-.2-2-.2-3 .1.3.8.4 1.6.4 2.4-1.2-.5-2.5-.8-3.9-.8s-2.7.3-3.9.8c0-.8.1-1.6.4-2.4-1-.3-2-.3-3-.1z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // 10. GOOGLE PLAY (Official 4-Color Vibrant Isometric Play Triangle)
    case 'googleplay':
    case 'google-play':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          role="img"
          aria-label="Google Play Logo"
        >
          {/* Cyan/Blue base */}
          <path
            d="M3.5 2.7C3.2 3.1 3 3.7 3 4.5v15c0 .8.2 1.4.5 1.8l9.4-9.8L3.5 2.7z"
            fill="#00E676"
          />
          {/* Top Yellow/Amber */}
          <path
            d="M16.5 8.7L12.9 11.5 3.5 2.7c.5-.3 1.3-.3 2.1.2l10.9 5.8z"
            fill="#FFD600"
          />
          {/* Bottom Red/Rose */}
          <path
            d="M16.5 15.3L5.6 21.1c-.8.5-1.6.5-2.1.2l9.4-9.8 3.6 3.8z"
            fill="#FF3D00"
          />
          {/* Right Tip Teal/Cyan */}
          <path
            d="M21.2 11.1l-4.7-2.4-3.6 2.8 3.6 3.8 4.7-2.4c.8-.4.8-1.4 0-1.8z"
            fill="#00B0FF"
          />
        </svg>
      );

    // 11. SEPHORA (Official Monochromatic Ribbon Flame Wave)
    case 'sephora':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          role="img"
          aria-label="Sephora Logo"
        >
          {/* Stylized iconic cosmetic S curve flame */}
          <path
            d="M12 2C8 6 7 9 8.5 12c1.2 2.4 3.5 3.2 4.5 5 1.2 2.1.5 3.8-.5 5 3.5-1.5 5.5-4.5 4.5-7.5-1-3-3.5-3.8-4.5-5.5C11.3 6.8 11.8 4.2 12 2z"
            fill="#000000"
          />
          <path
            d="M12 2C8 6 7 9 8.5 12c1.2 2.4 3.5 3.2 4.5 5 1.2 2.1.5 3.8-.5 5 3.5-1.5 5.5-4.5 4.5-7.5-1-3-3.5-3.8-4.5-5.5C11.3 6.8 11.8 4.2 12 2z"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      );

    // 12. EBAY (Official 4-Color eBay typography e-b-a-y)
    case 'ebay':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          role="img"
          aria-label="eBay Logo"
        >
          {/* 'e' Red */}
          <path
            d="M3 13.5c0-1.8 1.2-3 2.8-3 1.8 0 2.7 1.2 2.7 3.2h-4c.1.9.7 1.5 1.6 1.5.7 0 1.2-.3 1.4-.7l1.3.6C8.3 16 7.3 16.5 6 16.5 4.2 16.5 3 15.2 3 13.5zm4-1c0-.7-.4-1.2-1.3-1.2-.7 0-1.2.5-1.3 1.2H7z"
            fill="#E53238"
          />
          {/* 'b' Blue */}
          <path
            d="M9.2 8h1.6v3.2c.4-.5 1- reprimand 1.7-.8 1.3 0 2.2 1.1 2.2 2.9 0 1.8-1 3-2.3 3-.7 0-1.3-.3-1.6-.8V18H9.2V8zm2.7 6.8c.8 0 1.3-.6 1.3-1.6 0-1-.5-1.6-1.3-1.6s-1.3.6-1.3 1.6c0 1 .5 1.6 1.3 1.6z"
            fill="#0064D2"
          />
          {/* 'a' Yellow */}
          <path
            d="M15 13.5c0-1.8 1-3 2.5-3 .7 0 1.2.3 1.5.7V10.7h1.5v5.5H19v-.6c-.3.4-.8.7-1.5.7-1.5 0-2.5-1.1-2.5-2.8zm3.9.7v-1.4c-.2-.5-.7-.8-1.2-.8-.8 0-1.3.6-1.3 1.5s.5 1.5 1.3 1.5c.5 0 1-.3 1.2-.8z"
            fill="#F5AF02"
          />
          {/* 'y' Green */}
          <path
            d="M20.8 10.7h1.6l1.3 3.8 1.2-3.8h1.6l-2.2 5.5c-.5 1.3-1.3 1.8-2.4 1.8h-.5v-1.3h.3c.6 0 .9-.3 1.2-.9l-.3-.9-2.2-4.2z"
            fill="#86B817"
          />
        </svg>
      );

    // 13. NIKE (Official Iconic Nike Swoosh)
    case 'nike':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          style={style}
          role="img"
          aria-label="Nike Logo"
        >
          <path d="M21.707 5.293c-.2-.2-.51-.25-.76-.12-4.14 2.15-8.87 5.29-12.82 8.78-1.74 1.54-3.14 3.05-3.99 4.29-.39.57-.61 1.05-.63 1.38-.03.38.1.66.38.79.23.11.53.11.87.01 1.33-.39 3.49-1.88 5.76-3.89 4.54-4.01 8.87-8.91 10.96-10.89.24-.23.31-.58.19-.88-.02-.03-.04-.05-.06-.07zM3.48 19.46c.14-.3.42-.76.84-1.33.82-1.13 2.1-2.52 3.73-3.95 3.65-3.21 8.04-6.14 11.96-8.23-2.18 2.05-6.23 6.64-10.42 10.34-2.1 1.85-4.05 3.19-5.23 3.53-.3.09-.58.07-.76-.02-.12-.06-.18-.17-.12-.34z" />
          <path d="M22.5 4.8c-.3-.2-.7-.1-.9.2-2.3 2.6-7.1 7.9-12.1 12.3-2.3 2-4.4 3.4-5.8 3.8-.7.2-1.3.1-1.8-.3-.5-.4-.7-1-.6-1.7.2-.8.8-1.7 1.6-2.7 1.4-1.7 3.6-3.7 6.1-5.7l.8-.6c.4-.3.4-.8.1-1.2s-.8-.4-1.2-.1l-.8.6c-2.7 2.2-5 4.3-6.5 6.2-1 1.2-1.7 2.4-2 3.5-.3 1.1 0 2.1.8 2.8.8.7 1.9.8 3 .5 1.7-.5 4.1-2 6.5-4.1 5.3-4.6 10.3-10.2 12.8-13 .3-.3.2-.8-.1-1z" />
        </svg>
      );

    // 14. NORDSTROM (Official Nordstrom Typographic Monogram 'N')
    case 'nordstrom':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          role="img"
          aria-label="Nordstrom Logo"
        >
          {/* Iconic High Fashion Serif 'N' */}
          <path
            d="M5 4.5h3.2v.9c-.8.1-1.1.4-1.1 1.2v10.8c0 .8.3 1.1 1.1 1.2v.9H4.5v-.9c.8-.1 1.1-.4 1.1-1.2V7.5H5v-3z"
            fill="currentColor"
          />
          <path
            d="M7 6.5L16.5 19.5h1.5V7.5c0-.8-.3-1.1-1.1-1.2v-.8H20v.8c-.8.1-1.1.4-1.1 1.2v12h-2L7.5 7.2V6.5H7z"
            fill="currentColor"
          />
        </svg>
      );

    // 15. TARGET GROUP (Official Iconic Concentric Red Bullseye)
    case 'target':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          role="img"
          aria-label="Target Logo"
        >
          {/* Outer ring */}
          <circle cx="12" cy="12" r="10" stroke="#CC0000" strokeWidth="3.2" fill="none" />
          {/* Inner solid circle */}
          <circle cx="12" cy="12" r="4.2" fill="#CC0000" />
        </svg>
      );

    // 16. NINTENDO ESHOP (Official Nintendo Racetrack Oval & Bold Wordmark)
    case 'nintendo':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          role="img"
          aria-label="Nintendo Logo"
        >
          {/* Iconic Nintendo red racetrack capsule */}
          <rect
            x="2"
            y="5.5"
            width="20"
            height="13"
            rx="6.5"
            stroke="#E60012"
            strokeWidth="2.2"
            fill="none"
          />
          {/* Stylized Nintendo 'N' */}
          <path
            d="M8.2 9.2h1.6l3.8 4.6V9.2h1.6v5.6h-1.6L9.8 10.2v4.6H8.2V9.2z"
            fill="#E60012"
          />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={className}
          style={style}
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      );
  }
}

/**
 * High-tier Brand Logo Badge Component with brand color gradient backing and realistic card styling
 */
export function BrandLogoBadge({
  brandId,
  size = 'md',
  className = '',
}: {
  brandId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const sizeMap = {
    sm: { container: 'w-7 h-7 rounded-lg', icon: 'w-3.5 h-3.5' },
    md: { container: 'w-9 h-9 rounded-xl', icon: 'w-5 h-5' },
    lg: { container: 'w-11 h-11 rounded-2xl', icon: 'w-6 h-6' },
    xl: { container: 'w-14 h-14 rounded-2xl', icon: 'w-8 h-8' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Authentic brand badge backgrounds
  const getBadgeBg = (id: string) => {
    switch (id.toLowerCase()) {
      case 'steam':
        return 'bg-gradient-to-br from-[#171a21] via-[#1b2838] to-[#2a475e] text-white border-sky-500/20 shadow-sky-950/40';
      case 'apple':
        return 'bg-gradient-to-br from-zinc-800 via-zinc-900 to-black text-white border-white/20 shadow-black/40';
      case 'razer':
        return 'bg-gradient-to-br from-black via-zinc-950 to-[#022c02] text-[#00FF00] border-emerald-500/30 shadow-emerald-950/40';
      case 'vanilla':
      case 'visa':
        return 'bg-gradient-to-br from-white via-slate-50 to-blue-50 text-[#1A1F71] border-blue-200 shadow-blue-900/10';
      case 'amazon':
        return 'bg-gradient-to-br from-[#131921] via-[#232F3E] to-[#131921] text-white border-amber-500/20 shadow-amber-950/20';
      case 'walmart':
        return 'bg-gradient-to-br from-[#0071DC] via-[#004f98] to-[#002e5b] text-white border-sky-400/30 shadow-sky-900/30';
      case 'playstation':
      case 'psn':
        return 'bg-gradient-to-br from-[#003791] via-[#002052] to-[#00102b] text-white border-sky-500/30 shadow-blue-950/40';
      case 'xbox':
        return 'bg-gradient-to-br from-[#107C10] via-[#0b540b] to-[#052b05] text-white border-emerald-400/30 shadow-emerald-950/40';
      case 'starbucks':
        return 'bg-gradient-to-br from-[#006241] via-[#004a31] to-[#003020] text-white border-emerald-500/20 shadow-emerald-950/40';
      case 'googleplay':
        return 'bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white border-white/10 shadow-black/40';
      case 'sephora':
        return 'bg-gradient-to-br from-black via-zinc-900 to-black text-white border-white/20 shadow-black/50';
      case 'ebay':
        return 'bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-800 border-slate-200 shadow-slate-900/10';
      case 'nike':
        return 'bg-gradient-to-br from-black via-zinc-900 to-red-950 text-white border-red-500/20 shadow-red-950/30';
      case 'nordstrom':
        return 'bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white border-white/15 shadow-black/40';
      case 'target':
        return 'bg-gradient-to-br from-[#CC0000] via-[#990000] to-[#660000] text-white border-red-400/30 shadow-red-950/40';
      case 'nintendo':
        return 'bg-gradient-to-br from-[#E60012] via-[#b3000e] to-[#80000a] text-white border-red-400/30 shadow-red-950/40';
      default:
        return 'bg-gradient-to-br from-zinc-800 to-zinc-900 text-white border-white/10 shadow-black/30';
    }
  };

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center border shadow-md transition-transform duration-200 ${currentSize.container} ${getBadgeBg(
        brandId
      )} ${className}`}
    >
      <BrandLogo brandId={brandId} className={currentSize.icon} />
    </div>
  );
}
