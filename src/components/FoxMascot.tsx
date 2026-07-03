import type { LearnLang } from '../data/i18n';

interface FoxMascotProps {
  lang: LearnLang;
  message?: string;
  className?: string;
}

export default function FoxMascot({ lang, message, className = '' }: FoxMascotProps) {
  return (
    <div className={`fixed bottom-4 left-4 z-30 flex items-end gap-2 pointer-events-none ${className}`}>
      {message && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 px-3 py-2 max-w-[180px] mb-1 animate-[fadeIn_0.3s_ease-out] pointer-events-auto">
          <p className="text-xs text-slate-600 leading-relaxed">{message}</p>
        </div>
      )}
      <div className="relative w-16 h-16 md:w-20 md:h-20 pointer-events-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Fox body color */}
          {/* Ears */}
          <path d="M25 28 L20 10 L35 22 Z" fill="#E07A3E" />
          <path d="M75 28 L80 10 L65 22 Z" fill="#E07A3E" />
          <path d="M27 25 L24 15 L32 22 Z" fill="#F5E6D3" />
          <path d="M73 25 L76 15 L68 22 Z" fill="#F5E6D3" />

          {/* Head */}
          <ellipse cx="50" cy="48" rx="28" ry="26" fill="#E8843C" />

          {/* Face white area */}
          <path d="M50 42 Q35 50 32 62 Q40 70 50 68 Q60 70 68 62 Q65 50 50 42 Z" fill="#FFF5EB" />

          {/* Eyes */}
          <ellipse cx="38" cy="46" rx="3.5" ry="4" fill="#2D2D2D" />
          <ellipse cx="62" cy="46" rx="3.5" ry="4" fill="#2D2D2D" />
          <circle cx="39" cy="45" r="1.2" fill="white" />
          <circle cx="63" cy="45" r="1.2" fill="white" />

          {/* Nose */}
          <ellipse cx="50" cy="55" rx="2.5" ry="2" fill="#2D2D2D" />

          {/* Mouth */}
          <path d="M50 57 Q50 62 46 63" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M50 57 Q50 62 54 63" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />

          {/* Costume overlay */}
          {lang === 'ru' && <Ushanka />}
          {lang === 'en' && <TopHat />}
          {lang === 'ja' && <Hachimaki />}
          {lang === 'zh' && <ChineseHat />}
          {lang === 'ko' && <Hanbok />}
        </svg>

        {/* Noodle bowl for Korean */}
        {lang === 'ko' && (
          <div className="absolute -right-2 -bottom-1 text-xl select-none" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
            🍜
          </div>
        )}
      </div>
    </div>
  );
}

// Ushanka hat (Russian)
function Ushanka() {
  return (
    <g>
      {/* Side flaps */}
      <ellipse cx="22" cy="35" rx="8" ry="12" fill="#3A2A1A" />
      <ellipse cx="78" cy="35" rx="8" ry="12" fill="#3A2A1A" />
      {/* Top */}
      <path d="M28 28 Q50 12 72 28 L72 32 Q50 22 28 32 Z" fill="#4A3520" />
      <path d="M30 30 Q50 16 70 30 L70 33 Q50 25 30 33 Z" fill="#5A4530" />
      {/* Star */}
      <circle cx="50" cy="24" r="3" fill="#D4252E" />
    </g>
  );
}

// Top Hat (English gentleman)
function TopHat() {
  return (
    <g>
      {/* Hat brim */}
      <ellipse cx="50" cy="26" rx="24" ry="4" fill="#1A1A1A" />
      {/* Hat body */}
      <rect x="34" y="8" width="32" height="20" rx="2" fill="#1A1A1A" />
      {/* Band */}
      <rect x="34" y="22" width="32" height="4" fill="#8B0000" />
      {/* Shine */}
      <rect x="38" y="10" width="3" height="14" rx="1" fill="#3A3A3A" />
    </g>
  );
}

// Hachimaki headband (Japanese ninja)
function Hachimaki() {
  return (
    <g>
      <rect x="22" y="30" width="56" height="8" fill="#D4252E" />
      <rect x="22" y="30" width="56" height="2" fill="#F5E6D3" opacity="0.3" />
      {/* Rising sun circle */}
      <circle cx="50" cy="34" r="3.5" fill="white" />
      <circle cx="50" cy="34" r="2" fill="#D4252E" />
      {/* Knot tails */}
      <path d="M78 33 L86 30 L84 38 Z" fill="#D4252E" />
      <path d="M22 33 L14 30 L16 38 Z" fill="#D4252E" />
    </g>
  );
}

// Chinese traditional round hat
function ChineseHat() {
  return (
    <g>
      {/* Hat brim */}
      <ellipse cx="50" cy="28" rx="26" ry="5" fill="#2A4A3A" />
      {/* Dome */}
      <path d="M28 28 Q50 6 72 28 Z" fill="#3A6A4A" />
      <path d="M30 28 Q50 10 70 28 Z" fill="#4A7A5A" />
      {/* Red button on top */}
      <circle cx="50" cy="10" r="2.5" fill="#D4252E" />
      {/* Gold trim */}
      <ellipse cx="50" cy="28" rx="26" ry="2" fill="#D4A843" opacity="0.6" />
    </g>
  );
}

// Hanbok (Korean traditional)
function Hanbok() {
  return (
    <g>
      {/* Headband */}
      <rect x="24" y="30" width="52" height="5" fill="#C8332E" />
      <rect x="24" y="30" width="52" height="1.5" fill="#E8D5B8" opacity="0.4" />
      {/* Hanbok collar (visible at bottom of face) */}
      <path d="M35 68 Q50 72 65 68 L68 74 Q50 78 32 74 Z" fill="#2A5A8A" />
      <path d="M38 70 Q50 73 62 70 L64 75 Q50 77 36 75 Z" fill="#3A6A9A" />
      {/* Bow */}
      <circle cx="50" cy="73" r="2" fill="#F5D040" />
    </g>
  );
}
