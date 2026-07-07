import { useState } from 'react';
import { Languages, ArrowRight, Sparkles, Globe } from 'lucide-react';
import type { LearnLang, NativeLang } from '../data/i18n';
import { getUi, langFlag, nativeLangFlag, nativeLangLabel } from '../data/i18n';

interface WelcomePageProps {
  nativeLang: NativeLang | null;
  onSelectNative: (lang: NativeLang) => void;
  onSelectLearn: (lang: LearnLang) => void;
}

interface LangOption {
  id: LearnLang;
  label: string;
  desc: string;
  flag: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  accentShadow: string;
}

const NATIVE_OPTIONS: { id: NativeLang; flag: string; label: string; accentBg: string; accentText: string; accentBorder: string }[] = [
  { id: 'ar', flag: nativeLangFlag.ar, label: nativeLangLabel.ar, accentBg: 'bg-teal-100', accentText: 'text-teal-600', accentBorder: 'border-teal-500' },
  { id: 'fr', flag: nativeLangFlag.fr, label: nativeLangLabel.fr, accentBg: 'bg-rose-100', accentText: 'text-rose-600', accentBorder: 'border-rose-500' },
  { id: 'en', flag: nativeLangFlag.en, label: nativeLangLabel.en, accentBg: 'bg-blue-100', accentText: 'text-blue-600', accentBorder: 'border-blue-500' },
  { id: 'ru', flag: nativeLangFlag.ru, label: nativeLangLabel.ru, accentBg: 'bg-violet-100', accentText: 'text-violet-600', accentBorder: 'border-violet-500' },
];

export default function WelcomePage({ nativeLang, onSelectNative, onSelectLearn }: WelcomePageProps) {
  const [hovered, setHovered] = useState<LearnLang | null>(null);
  const [hoveredNative, setHoveredNative] = useState<NativeLang | null>(null);

  // Native language selection screen
  if (!nativeLang) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8 animate-[fadeIn_0.6s_ease-out]">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-500 to-teal-700 mb-5 shadow-xl shadow-teal-200">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              Choose Your Language / Choisissez votre langue / اختر لغتك
            </h1>
            <p className="text-sm text-slate-400">
              Select your native language to continue
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
            {NATIVE_OPTIONS.map((opt) => {
              const isHovered = hoveredNative === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onSelectNative(opt.id)}
                  onMouseEnter={() => setHoveredNative(opt.id)}
                  onMouseLeave={() => setHoveredNative(null)}
                  className={`
                    group relative overflow-hidden rounded-2xl border-2 p-6 text-center
                    transition-all duration-300 cursor-pointer transform
                    hover:scale-[1.03] hover:shadow-2xl
                    ${isHovered
                      ? `${opt.accentBorder} bg-gradient-to-br from-white to-slate-50`
                      : 'border-slate-200 bg-white hover:border-slate-300'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${isHovered ? `${opt.accentBg} scale-110` : 'bg-slate-100'}`}>
                      <span className="text-4xl">{opt.flag}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">{opt.label}</h3>
                    <div className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 ${isHovered ? `${opt.accentText} translate-x-1` : 'text-slate-400'}`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Learn language selection screen
  const t = getUi('ru', nativeLang);

  const options: LangOption[] = [
    { id: 'ru', label: t.russian, desc: t.russianDesc, flag: langFlag.ru,
      accentBg: 'bg-teal-100', accentText: 'text-teal-600', accentBorder: 'border-teal-500', accentShadow: 'shadow-teal-200' },
    { id: 'en', label: t.english, desc: t.englishDesc, flag: langFlag.en,
      accentBg: 'bg-blue-100', accentText: 'text-blue-600', accentBorder: 'border-blue-500', accentShadow: 'shadow-blue-200' },
    { id: 'ja', label: t.japanese, desc: t.japaneseDesc, flag: langFlag.ja,
      accentBg: 'bg-rose-100', accentText: 'text-rose-600', accentBorder: 'border-rose-500', accentShadow: 'shadow-rose-200' },
    { id: 'zh', label: t.chinese, desc: t.chineseDesc, flag: langFlag.zh,
      accentBg: 'bg-amber-100', accentText: 'text-amber-600', accentBorder: 'border-amber-500', accentShadow: 'shadow-amber-200' },
    { id: 'ko', label: t.korean, desc: t.koreanDesc, flag: langFlag.ko,
      accentBg: 'bg-indigo-100', accentText: 'text-indigo-600', accentBorder: 'border-indigo-500', accentShadow: 'shadow-indigo-200' },
    { id: 'fr', label: t.french, desc: t.frenchDesc, flag: langFlag.fr,
      accentBg: 'bg-rose-100', accentText: 'text-rose-600', accentBorder: 'border-rose-500', accentShadow: 'shadow-rose-200' },
    { id: 'es', label: t.spanish, desc: t.spanishDesc, flag: langFlag.es,
      accentBg: 'bg-orange-100', accentText: 'text-orange-600', accentBorder: 'border-orange-500', accentShadow: 'shadow-orange-200' },
  ];

  const isRtl = nativeLang === 'ar';

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100 flex items-center justify-center px-4 py-8 ${isRtl ? '' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl w-full">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {options.map((opt) => {
            const isHovered = hovered === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onSelectLearn(opt.id)}
                onMouseEnter={() => setHovered(opt.id)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  group relative overflow-hidden rounded-2xl border-2 p-5 md:p-6 text-center
                  transition-all duration-300 cursor-pointer transform
                  hover:scale-[1.03] hover:shadow-2xl
                  ${isHovered
                    ? `${opt.accentBorder} bg-gradient-to-br from-white to-slate-50 ${opt.accentShadow}`
                    : 'border-slate-200 bg-white hover:border-slate-300'
                  }
                `}
              >
                <div className="flex flex-col items-center gap-2.5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${isHovered ? `${opt.accentBg} scale-110` : 'bg-slate-100'}`}>
                    <span className="text-3xl">{opt.flag}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-0.5">{opt.label}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{opt.desc}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 ${isHovered ? `${opt.accentText} translate-x-1` : 'text-slate-400'}`}>
                    <span>{t.start}</span>
                    {isRtl && <ArrowRight className="w-4 h-4 rotate-180" />}
                    {!isRtl && <ArrowRight className="w-4 h-4" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-center flex-wrap gap-4 md:gap-6 mt-8 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.languagesCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{nativeLang === 'fr' ? 'Jeux interactifs' : nativeLang === 'en' ? 'Interactive games' : 'ألعاب تفاعلية'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{nativeLang === 'fr' ? 'Grammaire' : nativeLang === 'en' ? 'Grammar' : 'دروس قواعد'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{nativeLang === 'fr' ? 'Prononciation' : nativeLang === 'en' ? 'Pronunciation' : 'نطق صوتي'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
