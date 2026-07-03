import { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';

interface GameCardProps {
  text: string;
  subtext?: string;
  isArabic: boolean;
  isSelected: boolean;
  isMatched: boolean;
  isWrong: boolean;
  isFlipped: boolean;
  onClick: () => void;
  onSpeak?: () => void;
  delay: number;
}

export default function GameCard({
  text,
  subtext,
  isArabic,
  isSelected,
  isMatched,
  isWrong,
  isFlipped,
  onClick,
  onSpeak,
  delay,
}: GameCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (isMatched) {
    return (
      <div className="min-h-[72px] rounded-xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center transition-all duration-500 animate-[fadeOut_0.5s_ease-in-out_0.5s_forwards] opacity-0 pointer-events-none">
        <span className="text-2xl text-emerald-400">✓</span>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={isMatched}
      className={`
        relative min-h-[72px] rounded-xl border-2 transition-all duration-300 cursor-pointer
        flex flex-col items-center justify-center gap-0.5 px-2 py-3
        transform hover:scale-[1.02] active:scale-95
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${isSelected ? 'border-teal-500 bg-teal-50 shadow-md shadow-teal-100 ring-2 ring-teal-200' : ''}
        ${isWrong ? 'border-rose-400 bg-rose-50 animate-[shake_0.4s_ease-in-out]' : ''}
        ${!isSelected && !isWrong ? 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md' : ''}
      `}
    >
      {!isArabic && onSpeak && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onSpeak();
          }}
          className="absolute top-1.5 left-1.5 w-6 h-6 rounded-md bg-slate-100 hover:bg-teal-100 flex items-center justify-center transition-colors cursor-pointer"
          title="استمع للنطق"
        >
          <Volume2 className="w-3.5 h-3.5 text-slate-500 hover:text-teal-600" />
        </span>
      )}
      <span className={`text-sm md:text-base font-semibold leading-snug text-center line-clamp-2 ${isArabic ? 'text-slate-800' : 'text-slate-700'}`}>
        {text}
      </span>
      {subtext && !isFlipped && (
        <span className="text-[10px] md:text-xs text-slate-400 font-medium leading-tight text-center line-clamp-1">
          {subtext}
        </span>
      )}
    </button>
  );
}
