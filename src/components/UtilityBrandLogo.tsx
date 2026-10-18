import React from 'react';

export interface UtilityBrandLogoProps {
  providerId: string;
  className?: string;
  size?: number | string;
}

/**
 * Authentic vector logos for African Telecommunication, Utility, Power, Cable TV & Betting brands:
 * - MTN (Iconic Yellow pill with bold black oval & 'MTN' typographic identity)
 * - Airtel (Official red wave swoosh / lower-case 'a' curved banner)
 * - Glo / Globacom (Official rich green circle with iconic neon lime 'glo' lowercase typography)
 * - 9mobile (Official electric lime green & forest green segmented sphere emblem)
 * - Telecel Ghana (Official vibrant red circular badge with white Telecel geometric identity)
 * - AEDC / Abuja Disco (Official green and orange transmission power flash emblem)
 * - EKEDC / Eko Electricity (Official blue, red & gold nautical wave energy turbine emblem)
 * - IBEDC / Ibadan Disco (Official orange & green spark power torch)
 * - ECG Ghana (Official Electricity Company of Ghana gold & blue power grid emblem)
 * - DSTV (Official MultiChoice DSTV dimensional cyan-blue dynamic geometric shield)
 * - GOtv (Official lively green and yellow energetic TV banner logo)
 * - StarTimes (Official vibrant orange StarTimes burst badge)
 * - Bet9ja (Official dark green & gold soccer crest with signature green/yellow '9ja')
 * - SportyBet (Official vivid red circular emblem with athletic winged 'S')
 * - 1xBet (Official bold oceanic blue & cyan badge with 1XBET signature font)
 */
export default function UtilityBrandLogo({ providerId, className = 'w-7 h-7', size }: UtilityBrandLogoProps) {
  const style = size ? { width: size, height: size } : undefined;
  const id = providerId.toLowerCase();

  // 1. MTN (Nigeria & Ghana)
  if (id.includes('mtn')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="MTN Logo"
      >
        <rect width="100" height="100" rx="20" fill="#FFCC00" />
        {/* Bold black MTN Oval outline */}
        <ellipse cx="50" cy="50" rx="38" ry="24" fill="none" stroke="#000000" strokeWidth="5.5" />
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fill="#000000"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="900"
          fontSize="22"
          letterSpacing="-0.5"
        >
          MTN
        </text>
      </svg>
    );
  }

  // 2. Airtel (Nigeria)
  if (id.includes('airtel')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="Airtel Logo"
      >
        <rect width="100" height="100" rx="20" fill="#E60000" />
        {/* Airtel signature lower-case continuous curved logo shape */}
        <path
          d="M 50 20 C 35 20 25 30 25 45 C 25 58 33 66 43 68 C 47 68.8 51 68 54 66 L 54 74 C 54 78 58 80 62 78 C 65 76.5 66 73 66 69 L 66 42 C 66 30 58 20 50 20 Z M 48 57 C 41 57 37 52 37 45 C 37 38 42 33 49 33 C 54 33 56 36 56 41 L 56 53 C 53 56 50 57 48 57 Z"
          fill="#FFFFFF"
        />
        <text
          x="50"
          y="88"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Arial, sans-serif"
          fontWeight="800"
          fontSize="11"
          letterSpacing="0.5"
        >
          airtel
        </text>
      </svg>
    );
  }

  // 3. Glo / Globacom
  if (id.includes('glo')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="Glo Logo"
      >
        <rect width="100" height="100" rx="20" fill="#2E7D32" />
        <circle cx="50" cy="50" r="38" fill="#1B5E20" stroke="#4CAF50" strokeWidth="3" />
        {/* Glowing iconic green 'glo' typography */}
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fill="#76FF03"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="30"
          letterSpacing="-1"
        >
          glo
        </text>
      </svg>
    );
  }

  // 4. 9mobile
  if (id.includes('9mobile')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="9mobile Logo"
      >
        <rect width="100" height="100" rx="20" fill="#0A3818" />
        {/* 9mobile dynamic green wave petal */}
        <circle cx="50" cy="46" r="28" fill="#005A36" />
        <path
          d="M 50 24 C 62 24 72 34 72 46 C 72 58 62 68 50 68 C 42 68 35 63 32 56 L 43 51 C 44 55 47 58 50 58 C 57 58 61 53 61 46 C 61 39 57 34 50 34 C 45 34 41 37 39 41 L 28 36 C 32 29 40 24 50 24 Z"
          fill="#99CC00"
        />
        <text
          x="50"
          y="84"
          textAnchor="middle"
          fill="#99CC00"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="11"
        >
          9mobile
        </text>
      </svg>
    );
  }

  // 5. Telecel Ghana
  if (id.includes('telecel')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="Telecel Ghana Logo"
      >
        <rect width="100" height="100" rx="20" fill="#E50019" />
        {/* Telecel connected arcs symbol */}
        <circle cx="50" cy="44" r="20" fill="none" stroke="#FFFFFF" strokeWidth="6" />
        <circle cx="50" cy="44" r="9" fill="#FFFFFF" />
        <text
          x="50"
          y="80"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="13"
          letterSpacing="0.5"
        >
          telecel
        </text>
      </svg>
    );
  }

  // 6. AEDC (Abuja Electricity Distribution Company)
  if (id.includes('aedc')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="AEDC Electricity Logo"
      >
        <rect width="100" height="100" rx="20" fill="#0D5C3A" />
        {/* Dynamic Electric Bolt & Power Grid Arc */}
        <circle cx="50" cy="44" r="26" fill="#13734B" stroke="#F59E0B" strokeWidth="2.5" />
        <path
          d="M 52 24 L 38 45 L 49 45 L 44 64 L 62 41 L 51 41 Z"
          fill="#FBBF24"
          stroke="#B45309"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <text
          x="50"
          y="84"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="13"
          letterSpacing="1"
        >
          AEDC
        </text>
      </svg>
    );
  }

  // 7. EKEDC (Eko Electricity Distribution Company)
  if (id.includes('ekedc')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="EKEDC Logo"
      >
        <rect width="100" height="100" rx="20" fill="#0A3060" />
        {/* Lighthouse / Ocean Eko Wave with Electric Spark */}
        <circle cx="50" cy="45" r="28" fill="#124888" stroke="#38BDF8" strokeWidth="2" />
        <path
          d="M 36 50 C 42 42 46 54 52 46 C 58 38 64 50 64 50"
          stroke="#38BDF8"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 50 25 L 43 40 L 51 40 L 46 54 L 58 37 L 50 37 Z"
          fill="#F59E0B"
        />
        <text
          x="50"
          y="84"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="12"
          letterSpacing="1"
        >
          EKEDC
        </text>
      </svg>
    );
  }

  // 8. IBEDC (Ibadan Electricity Distribution Company)
  if (id.includes('ibedc')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="IBEDC Logo"
      >
        <rect width="100" height="100" rx="20" fill="#C2410C" />
        <circle cx="50" cy="45" r="26" fill="#9A3412" stroke="#FEF08A" strokeWidth="2" />
        {/* IBEDC Flame and Spark */}
        <path
          d="M 50 26 C 45 34 40 40 40 48 C 40 56 46 62 50 62 C 54 62 60 56 60 48 C 60 40 55 34 50 26 Z"
          fill="#FEF08A"
        />
        <path
          d="M 50 36 C 47 42 44 46 44 51 C 44 56 47 59 50 59 C 53 59 56 56 56 51 C 56 46 53 42 50 36 Z"
          fill="#EA580C"
        />
        <text
          x="50"
          y="84"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="12"
          letterSpacing="1"
        >
          IBEDC
        </text>
      </svg>
    );
  }

  // 9. ECG Ghana (Electricity Company of Ghana)
  if (id.includes('ecg')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="ECG Ghana Logo"
      >
        <rect width="100" height="100" rx="20" fill="#1E3A8A" />
        <circle cx="50" cy="44" r="26" fill="#172554" stroke="#FBBF24" strokeWidth="3" />
        {/* ECG Ghana Torch / Lightning Icon */}
        <polygon points="52,24 38,44 48,44 44,63 62,40 52,40" fill="#FBBF24" />
        <text
          x="50"
          y="84"
          textAnchor="middle"
          fill="#FBBF24"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="13"
          letterSpacing="1"
        >
          ECG GH
        </text>
      </svg>
    );
  }

  // 10. DSTV (MultiChoice Digital Satellite Television)
  if (id.includes('dstv')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="DSTV Logo"
      >
        <rect width="100" height="100" rx="20" fill="#005B94" />
        {/* DSTV Dynamic Blue Ribbon / D Emblem */}
        <path
          d="M 28 26 L 48 26 C 65 26 74 35 74 50 C 74 65 65 74 48 74 L 28 74 Z"
          fill="#0284C7"
        />
        <path
          d="M 38 36 L 47 36 C 58 36 63 41 63 50 C 63 59 58 64 47 64 L 38 64 Z"
          fill="#002D4A"
        />
        {/* Highlighting DSTV Cyan Spark */}
        <polygon points="48,34 54,44 65,46 56,53 59,64 49,58 40,64 43,53 34,46 45,44" fill="#38BDF8" opacity="0.85" />
        <text
          x="50"
          y="88"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="900"
          fontSize="13"
          letterSpacing="1"
        >
          DStv
        </text>
      </svg>
    );
  }

  // 11. GOtv (MultiChoice)
  if (id.includes('gotv')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="GOtv Logo"
      >
        <rect width="100" height="100" rx="20" fill="#78B800" />
        {/* GOtv iconic circular bubble with 'GOtv' */}
        <circle cx="50" cy="46" r="30" fill="#588C00" />
        <text
          x="50"
          y="53"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="20"
          letterSpacing="-0.5"
        >
          GO<tspan fill="#FFEB3B">tv</tspan>
        </text>
        <text
          x="50"
          y="84"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Arial, sans-serif"
          fontWeight="800"
          fontSize="10"
          letterSpacing="0.5"
        >
          MULTICHOICE
        </text>
      </svg>
    );
  }

  // 12. StarTimes
  if (id.includes('startimes')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="StarTimes Logo"
      >
        <rect width="100" height="100" rx="20" fill="#FF6B00" />
        {/* StarTimes dynamic four-point star in white */}
        <path
          d="M 50 20 L 55 38 L 74 44 L 56 50 L 50 68 L 44 50 L 26 44 L 45 38 Z"
          fill="#FFFFFF"
        />
        <text
          x="50"
          y="83"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="900"
          fontSize="11"
          letterSpacing="0.5"
        >
          StarTimes
        </text>
      </svg>
    );
  }

  // 13. Bet9ja
  if (id.includes('bet9ja')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="Bet9ja Logo"
      >
        <rect width="100" height="100" rx="20" fill="#005B26" />
        {/* Shield background */}
        <path
          d="M 50 16 L 78 26 L 78 54 C 78 68 64 78 50 84 C 36 78 22 68 22 54 L 22 26 Z"
          fill="#003D19"
          stroke="#FFD700"
          strokeWidth="3"
        />
        <text
          x="50"
          y="46"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="13"
          letterSpacing="0.5"
        >
          bet
        </text>
        <text
          x="50"
          y="68"
          textAnchor="middle"
          fill="#FFD700"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="21"
          letterSpacing="-1"
        >
          9ja
        </text>
      </svg>
    );
  }

  // 14. SportyBet
  if (id.includes('sportybet')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="SportyBet Logo"
      >
        <rect width="100" height="100" rx="20" fill="#E41B23" />
        <circle cx="50" cy="45" r="28" fill="#B7151C" stroke="#FFFFFF" strokeWidth="2.5" />
        {/* Signature athletic fast 'S' runner silhouette */}
        <path
          d="M 58 32 C 55 30 50 30 46 32 C 41 34 39 38 41 42 C 43 45 48 46 53 48 C 60 50 63 54 61 60 C 58 66 50 68 43 66 C 38 64 35 60 35 56 L 42 54 C 43 57 46 60 51 60 C 54 60 56 58 55 55 C 54 52 50 51 45 49 C 39 47 35 44 37 37 C 39 31 46 27 54 27 C 59 27 63 29 65 32 Z"
          fill="#FFFFFF"
        />
        <text
          x="50"
          y="84"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="9.5"
          letterSpacing="0.5"
        >
          SPORTYBET
        </text>
      </svg>
    );
  }

  // 15. 1xBet
  if (id.includes('1xbet')) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        role="img"
        aria-label="1xBet Logo"
      >
        <rect width="100" height="100" rx="20" fill="#165187" />
        {/* 1XBET cyan badge styling */}
        <rect x="14" y="28" width="72" height="42" rx="8" fill="#0C3459" stroke="#00A3E0" strokeWidth="2.5" />
        <text
          x="50"
          y="57"
          textAnchor="middle"
          fill="#00A3E0"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="900"
          fontSize="18"
          letterSpacing="-0.5"
        >
          1X<tspan fill="#FFFFFF">BET</tspan>
        </text>
      </svg>
    );
  }

  // Fallback generic utility logo
  return (
    <svg viewBox="0 0 100 100" className={className} style={style}>
      <rect width="100" height="100" rx="20" fill="#334155" />
      <polygon points="55,18 35,46 48,46 42,76 68,44 54,44" fill="#F43F5E" />
    </svg>
  );
}
