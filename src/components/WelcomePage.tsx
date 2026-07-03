import { useState } from 'react';
import { Languages, ArrowRight, Sparkles } from 'lucide-react';
import type { LearnLang } from '../data/i18n';
import { ui } from '../data/i18n';

interface WelcomePageProps {
  onSelect: (lang: LearnLang) => void;
}

export default function WelcomePage({ onSelect }: WelcomePageProps) {
  const [hovered, setHovered] = useState<LearnLang | null>(null);
  const t = ui.ru;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Logo + Title */}
        <div className="text-center mb-10 animate-[fadeIn_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-500 to-teal-700 mb-5 shadow-xl shadow-teal-200">
            <Languages className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            {t.welcome}
          </h1>
          <p className="text-lg text-slate-600 font-medium mb-1">
            {t.chooseLang}
          </p>
          <p className="text-sm text-slate-400">
            {t.chooseLangDesc}
          </p>
        </div>

        {/* Language Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {/* Russian */}
          <button
            onClick={() => onSelect('ru')}
            onMouseEnter={() => setHovered('ru')}
            onMouseLeave={() => setHovered(null)}
            className={`
              group relative overflow-hidden rounded-2xl border-2 p-6 md:p-8 text-right
              transition-all duration-300 cursor-pointer transform
              hover:scale-[1.03] hover:shadow-2xl
              ${hovered === 'ru'
                ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-white shadow-teal-200'
                : 'border-slate-200 bg-white hover:border-teal-300'
              }
            `}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
                ${hovered === 'ru' ? 'bg-teal-600 scale-110' : 'bg-teal-100'}
              `}>
                <span className={`text-3xl font-bold transition-colors ${hovered === 'ru' ? 'text-white' : 'text-teal-600'}`}>
                  RU
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{t.russian}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{t.russianDesc}</p>
              </div>
              <div className={`
                flex items-center gap-1.5 text-sm font-semibold transition-all duration-300
                ${hovered === 'ru' ? 'text-teal-600 translate-x-1' : 'text-slate-400'}
              `}>
                <span>{t.start}</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </div>
            </div>
          </button>

          {/* English */}
          <button
            onClick={() => onSelect('en')}
            onMouseEnter={() => setHovered('en')}
            onMouseLeave={() => setHovered(null)}
            className={`
              group relative overflow-hidden rounded-2xl border-2 p-6 md:p-8 text-right
              transition-all duration-300 cursor-pointer transform
              hover:scale-[1.03] hover:shadow-2xl
              ${hovered === 'en'
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-white shadow-blue-200'
                : 'border-slate-200 bg-white hover:border-blue-300'
              }
            `}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
                ${hovered === 'en' ? 'bg-blue-600 scale-110' : 'bg-blue-100'}
              `}>
                <span className={`text-3xl font-bold transition-colors ${hovered === 'en' ? 'text-white' : 'text-blue-600'}`}>
                  EN
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{t.english}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{t.englishDesc}</p>
              </div>
              <div className={`
                flex items-center gap-1.5 text-sm font-semibold transition-all duration-300
                ${hovered === 'en' ? 'text-blue-600 translate-x-1' : 'text-slate-400'}
              `}>
                <span>{t.start}</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </div>
            </div>
          </button>
        </div>

        {/* Feature badges */}
        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>8 مستويات</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>400 كلمة</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>نطق صوتي تفاعلي</span>
          </div>
        </div>
      </div>
    </div>
  );
}
