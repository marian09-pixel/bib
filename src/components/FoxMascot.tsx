import type { LearnLang } from '../data/i18n';

interface FoxMascotProps {
  lang: LearnLang;
  message?: string;
  className?: string;
}

export default function FoxMascot({ lang, message, className = '' }: FoxMascotProps) {
  return (
    <div className={`fixed bottom-2 left-2 z-30 flex items-end gap-2 pointer-events-none ${className}`}>
      {message && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 px-3 py-2 max-w-[200px] mb-2 animate-[fadeIn_0.3s_ease-out] pointer-events-auto">
          <p className="text-xs text-slate-600 leading-relaxed">{message}</p>
          <div className="absolute bottom-3 -right-1.5 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-[-45deg]" />
        </div>
      )}
      <div className="relative pointer-events-auto" style={{ width: '110px', height: '150px' }}>
        <svg viewBox="0 0 120 170" className="w-full h-full drop-shadow-lg">
          {/* ===== TAIL ===== */}
          <path d="M95 110 Q115 100 112 80 Q108 75 102 78 Q100 90 92 100 Z" fill="#E07A3E" />
          <path d="M100 105 Q112 95 108 82 Q106 80 103 82 Q102 92 96 102 Z" fill="#F5E6D3" />

          {/* ===== BODY ===== */}
          <ellipse cx="60" cy="120" rx="28" ry="32" fill="#E8843C" />
          {/* Belly */}
          <ellipse cx="60" cy="125" rx="18" ry="22" fill="#FFF5EB" />

          {/* ===== ARMS ===== */}
          <ellipse cx="36" cy="115" rx="7" ry="14" fill="#E07A3E" transform="rotate(-15 36 115)" />
          <ellipse cx="84" cy="115" rx="7" ry="14" fill="#E07A3E" transform="rotate(15 84 115)" />
          {/* Paws */}
          <circle cx="33" cy="126" r="5" fill="#F5E6D3" />
          <circle cx="87" cy="126" r="5" fill="#F5E6D3" />

          {/* ===== LEGS ===== */}
          <ellipse cx="48" cy="152" rx="8" ry="10" fill="#E07A3E" />
          <ellipse cx="72" cy="152" rx="8" ry="10" fill="#E07A3E" />
          <ellipse cx="48" cy="160" rx="7" ry="5" fill="#2D2D2D" />
          <ellipse cx="72" cy="160" rx="7" ry="5" fill="#2D2D2D" />

          {/* ===== HEAD ===== */}
          {/* Ears */}
          <path d="M28 48 L22 22 L40 40 Z" fill="#E07A3E" />
          <path d="M92 48 L98 22 L80 40 Z" fill="#E07A3E" />
          <path d="M30 45 L27 30 L36 40 Z" fill="#F5E6D3" />
          <path d="M90 45 L93 30 L84 40 Z" fill="#F5E6D3" />

          {/* Head shape */}
          <ellipse cx="60" cy="62" rx="32" ry="30" fill="#E8843C" />
          {/* Face white area */}
          <path d="M60 55 Q42 65 38 80 Q48 90 60 88 Q72 90 82 80 Q78 65 60 55 Z" fill="#FFF5EB" />

          {/* Eyes */}
          <ellipse cx="46" cy="60" rx="4" ry="5" fill="#2D2D2D" />
          <ellipse cx="74" cy="60" rx="4" ry="5" fill="#2D2D2D" />
          <circle cx="47.5" cy="58.5" r="1.5" fill="white" />
          <circle cx="75.5" cy="58.5" r="1.5" fill="white" />

          {/* Nose */}
          <ellipse cx="60" cy="72" rx="3" ry="2.5" fill="#2D2D2D" />
          {/* Mouth */}
          <path d="M60 75 Q60 80 55 81" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M60 75 Q60 80 65 81" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Blush */}
          <circle cx="40" cy="70" r="3" fill="#FF9999" opacity="0.4" />
          <circle cx="80" cy="70" r="3" fill="#FF9999" opacity="0.4" />

          {/* ===== COSTUME OVERLAY ===== */}
          {lang === 'ru' && <Ushanka />}
          {lang === 'en' && <TopHat />}
          {lang === 'ja' && <Hachimaki />}
          {lang === 'zh' && <ChineseHat />}
          {lang === 'ko' && <Hanbok />}
          {lang === 'fr' && <Beret />}
        </svg>

        {/* Noodle bowl for Korean */}
        {lang === 'ko' && (
          <div className="absolute -right-1 bottom-2 text-2xl select-none" style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.25))' }}>
            🍜
          </div>
        )}

        {/* Baguette for French */}
        {lang === 'fr' && (
          <div className="absolute -right-2 bottom-3 text-2xl select-none rotate-[20deg]" style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.25))' }}>
            🥖
          </div>
        )}
      </div>
    </div>
  );
}

// ===== Ushanka (Russian fur hat) =====
function Ushanka() {
  return (
    <g>
      {/* Side flaps */}
      <ellipse cx="26" cy="50" rx="9" ry="14" fill="#3A2A1A" />
      <ellipse cx="94" cy="50" rx="9" ry="14" fill="#3A2A1A" />
      {/* Fur texture dots */}
      <circle cx="24" cy="45" r="1" fill="#5A4530" />
      <circle cx="28" cy="48" r="1" fill="#5A4530" />
      <circle cx="92" cy="45" r="1" fill="#5A4530" />
      <circle cx="96" cy="48" r="1" fill="#5A4530" />
      {/* Top dome */}
      <path d="M32 42 Q60 22 88 42 L88 48 Q60 30 32 48 Z" fill="#4A3520" />
      <path d="M34 44 Q60 26 86 44 L86 49 Q60 32 34 49 Z" fill="#5A4530" />
      {/* Red star */}
      <circle cx="60" cy="36" r="4" fill="#D4252E" />
      <path d="M60 33 L61 36 L64 36 L61.5 38 L62.5 41 L60 39 L57.5 41 L58.5 38 L56 36 L59 36 Z" fill="#FFD700" />
    </g>
  );
}

// ===== Top Hat (English gentleman) =====
function TopHat() {
  return (
    <g>
      {/* Brim */}
      <ellipse cx="60" cy="40" rx="30" ry="5" fill="#1A1A1A" />
      <ellipse cx="60" cy="40" rx="30" ry="3" fill="#2A2A2A" />
      {/* Hat body */}
      <rect x="40" y="14" width="40" height="28" rx="3" fill="#1A1A1A" />
      <rect x="40" y="14" width="40" height="28" rx="3" fill="url(#hatShine)" opacity="0.3" />
      {/* Red band */}
      <rect x="40" y="34" width="40" height="5" fill="#8B0000" />
      <rect x="40" y="36" width="40" height="1" fill="#D4252E" opacity="0.5" />
      {/* Shine */}
      <rect x="44" y="16" width="3" height="20" rx="1.5" fill="#3A3A3A" />
      {/* Monocle */}
      <circle cx="76" cy="62" r="6" fill="none" stroke="#C0A050" strokeWidth="1.5" />
      <circle cx="76" cy="62" r="5" fill="none" stroke="#E0C070" strokeWidth="0.5" />
      <line x1="70" y1="66" x2="64" y2="72" stroke="#C0A050" strokeWidth="0.8" />
      <defs>
        <linearGradient id="hatShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#444" />
          <stop offset="50%" stopColor="#666" />
          <stop offset="100%" stopColor="#222" />
        </linearGradient>
      </defs>
    </g>
  );
}

// ===== Hachimaki (Japanese headband) =====
function Hachimaki() {
  return (
    <g>
      {/* Main band */}
      <rect x="26" y="46" width="68" height="9" fill="#D4252E" />
      <rect x="26" y="46" width="68" height="2" fill="#F5E6D3" opacity="0.3" />
      <rect x="26" y="53" width="68" height="2" fill="#8B0000" opacity="0.3" />
      {/* Rising sun circle */}
      <circle cx="60" cy="50.5" r="4" fill="white" />
      <circle cx="60" cy="50.5" r="2.5" fill="#D4252E" />
      {/* Knot tails right */}
      <path d="M94 49 L104 45 L102 52 L100 50 L104 55 Z" fill="#D4252E" />
      <path d="M94 51 L106 53 L100 56 Z" fill="#B22222" />
      {/* Knot tails left */}
      <path d="M26 49 L16 45 L18 52 L20 50 L16 55 Z" fill="#D4252E" />
      <path d="M26 51 L14 53 L20 56 Z" fill="#B22222" />
    </g>
  );
}

// ===== Chinese traditional round hat =====
function ChineseHat() {
  return (
    <g>
      {/* Wide brim */}
      <ellipse cx="60" cy="44" rx="34" ry="6" fill="#2A4A3A" />
      <ellipse cx="60" cy="44" rx="34" ry="4" fill="#3A6A4A" />
      {/* Dome */}
      <path d="M30 44 Q60 14 90 44 Z" fill="#3A6A4A" />
      <path d="M32 44 Q60 18 88 44 Z" fill="#4A7A5A" />
      <path d="M35 44 Q60 22 85 44 Z" fill="#5A8A6A" opacity="0.5" />
      {/* Red button on top */}
      <circle cx="60" cy="18" r="3" fill="#D4252E" />
      <circle cx="60" cy="18" r="1.5" fill="#FF4444" />
      {/* Gold trim on brim */}
      <ellipse cx="60" cy="44" rx="34" ry="1.5" fill="#D4A843" opacity="0.7" />
      {/* Tassel */}
      <path d="M60 18 Q62 22 60 26" stroke="#D4A843" strokeWidth="1" fill="none" />
      <circle cx="60" cy="27" r="1.5" fill="#D4A843" />
    </g>
  );
}

// ===== Hanbok (Korean traditional outfit) =====
function Hanbok() {
  return (
    <g>
      {/* Headband */}
      <rect x="28" y="46" width="64" height="6" fill="#C8332E" />
      <rect x="28" y="46" width="64" height="1.5" fill="#E8D5B8" opacity="0.4" />
      <rect x="28" y="50.5" width="64" height="1.5" fill="#8B0000" opacity="0.3" />

      {/* Hanbok top (jeogori) - covers upper body */}
      <path d="M32 92 Q28 95 30 110 L34 130 Q60 135 86 130 L90 110 Q92 95 88 92 Q60 88 32 92 Z" fill="#2A5A8A" />
      <path d="M34 94 Q32 98 34 110 L37 128 Q60 132 83 128 L86 110 Q88 98 86 94 Q60 90 34 94 Z" fill="#3A6A9A" />

      {/* Collar strip (white) */}
      <path d="M48 92 L52 100 L60 102 L68 100 L72 92 Q60 90 48 92 Z" fill="#F5E6D3" />
      <path d="M50 94 L53 100 L60 101 L67 100 L70 94 Q60 92 50 94 Z" fill="#FFF5EB" />

      {/* Bow (gorum) */}
      <path d="M55 100 Q50 96 48 100 Q50 104 55 102 Z" fill="#F5D040" />
      <path d="M65 100 Q70 96 72 100 Q70 104 65 102 Z" fill="#F5D040" />
      <rect x="58" y="99" width="4" height="4" rx="1" fill="#E8B830" />

      {/* Belt */}
      <rect x="34" y="128" width="52" height="4" fill="#1A4A7A" />
      <rect x="34" y="128" width="52" height="1" fill="#3A6AAA" opacity="0.5" />

      {/* Skirt lower portion */}
      <path d="M34 132 L30 160 L90 160 L86 132 Q60 136 34 132 Z" fill="#1A4A7A" />
      <path d="M36 134 L33 158 L87 158 L84 134 Q60 138 36 134 Z" fill="#2A5A8A" />

      {/* Decorative gold pattern on skirt */}
      <circle cx="50" cy="145" r="1.5" fill="#D4A843" opacity="0.6" />
      <circle cx="60" cy="148" r="1.5" fill="#D4A843" opacity="0.6" />
      <circle cx="70" cy="145" r="1.5" fill="#D4A843" opacity="0.6" />
    </g>
  );
}

// ===== Beret (French traditional hat) =====
function Beret() {
  return (
    <g>
      {/* Beret base - flat round cap */}
      <ellipse cx="60" cy="44" rx="28" ry="10" fill="#1A1A2E" />
      <ellipse cx="60" cy="42" rx="26" ry="9" fill="#2A2A4E" />
      <ellipse cx="60" cy="41" rx="24" ry="7" fill="#3A3A5E" opacity="0.5" />

      {/* Beret rim band */}
      <ellipse cx="60" cy="47" rx="22" ry="4" fill="#0A0A1E" />

      {/* Small stem on top */}
      <circle cx="66" cy="36" r="2.5" fill="#1A1A2E" />

      {/* Tricolor cockade (blue-white-red) */}
      <circle cx="48" cy="44" r="3.5" fill="#0055A4" />
      <circle cx="48" cy="44" r="2.2" fill="#FFFFFF" />
      <circle cx="48" cy="44" r="0.9" fill="#EF4135" />
    </g>
  );
}
