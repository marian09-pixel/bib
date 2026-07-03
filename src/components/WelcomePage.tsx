import { useState } from 'react';
import { Languages, ArrowRight, Sparkles } from 'lucide-react';
import type { LearnLang } from '../data/i18n';
import { ui, langFlag } from '../data/i18n';

interface WelcomePageProps {
  onSelect: (lang: LearnLang) => void;
}

interface LangOption {
  id: LearnLang;
  label: string;
  desc: string;
  flag: string;
  accent: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  accentShadow: string;
}

export default function WelcomePage({ onSelect }: WelcomePageProps) {
  const [hovered, setHovered] = useState<LearnLang | null>(null);
  const t = ui.ru;

  const options: LangOption[] = [
    { id: 'ru', label: t.russian, desc: t.russianDesc, flag: langFlag.ru,
      accent: 'teal', accentBg: 'bg-teal-100', accentText: 'text-teal-600', accentBorder: 'border-teal-500', accentShadow: 'shadow-teal-200' },
    { id: 'en', label: t.english, desc: t.englishDesc, flag: langFlag.en,
      accent: 'blue', accentBg: 'bg-blue-100', accentText: 'text-blue-600', accentBorder: 'border-blue-500', accentShadow: 'shadow-blue-200' },
    { id: 'ja', label: t.japanese, desc: t.japaneseDesc, flag: langFlag.ja,
      accent: 'rose', accentBg: 'bg-rose-100', accentText: 'text-rose-600', accentBorder: 'border-rose-500', accentShadow: 'shadow-rose-200' },
    { id: 'zh', label: t.chinese, desc: t.chineseDesc, flag: langFlag.zh,
      accent: 'amber', accentBg: 'bg-amber-100', accentText: 'text-amber-600', accentBorder: 'border-amber-500', accentShadow: 'shadow-amber-200' },
    { id: 'ko', label: t.korean, desc: t.koreanDesc, flag: langFlag.ko,
      accent: 'indigo', accentBg: 'bg-indigo-100', accentText: 'text-indigo-600', accentBorder: 'border-indigo-500', accentShadow: 'shadow-indigo-200' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-3xl w-full">
        {/* Logo + Title */}
        <div className="text-center mb-8 animate-[fadeIn_0.6s_ease-out]">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {options.map((opt) => {
            const isHovered = hovered === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onSelect(opt.id)}
                onMouseEnter={() => setHovered(opt.id)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  group relative overflow-hidden rounded-2xl border-2 p-5 md:p-6 text-right
                  transition-all duration-300 cursor-pointer transform
                  hover:scale-[1.03] hover:shadow-2xl
                  ${isHovered
                    ? `${opt.accentBorder} bg-gradient-to-br from-white to-slate-50 ${opt.accentShadow}`
                    : 'border-slate-200 bg-white hover:border-slate-300'
                  }
                `}
              >
                <div className="flex flex-col items-center text-center gap-2.5">
                  <div className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300
                    ${isHovered ? `${opt.accentBg} scale-110` : 'bg-slate-100'}
                  `}>
                    <span className="text-3xl">{opt.flag}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-0.5">{opt.label}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{opt.desc}</p>
                  </div>
                  <div className={`
                    flex items-center gap-1.5 text-sm font-semibold transition-all duration-300
                    ${isHovered ? `${opt.accentText} translate-x-1` : 'text-slate-400'}
                  `}>
                    <span>{t.start}</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feature badges */}
        <div className="flex items-center justify-center flex-wrap gap-4 md:gap-6 mt-8 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>5 لغات</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ألعاب تفاعلية</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>دروس قواعد</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>نطق صوتي</span>
          </div>
        </div>
      </div>
    </div>
  );
}
