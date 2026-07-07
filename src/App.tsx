import { useState, useCallback, useEffect } from 'react';
import { Star, Languages, Settings, Type, Check } from 'lucide-react';
import { getUi, type LearnLang, type NativeLang, langFlag } from './data/i18n';
import { getAsianData } from './data/asianLanguages';
import WelcomePage from './components/WelcomePage';
import AsianLanguagePanel from './components/AsianLanguagePanel';
import FoxMascot from './components/FoxMascot';
import { initVoices } from './hooks/useSpeech';
import { useSettings, type FontSize } from './hooks/useSettings';

const ALL_LANGS: LearnLang[] = ['ru', 'en', 'ja', 'zh', 'ko', 'fr', 'es'];
const NATIVE_KEY = 'learnlang_native';
const LEARN_KEY = 'learnlang_choice';

const FONT_LABELS: Record<FontSize, { ar: string; fr: string; en: string }> = {
  sm: { ar: 'صغير', fr: 'Petit', en: 'Small' },
  md: { ar: 'متوسط', fr: 'Moyen', en: 'Medium' },
  lg: { ar: 'كبير', fr: 'Grand', en: 'Large' },
};

export default function App() {
  const [nativeLang, setNativeLang] = useState<NativeLang | null>(() => {
    try {
      const saved = localStorage.getItem(NATIVE_KEY) as NativeLang | null;
      return saved && ['ar', 'fr', 'en'].includes(saved) ? saved : null;
    } catch { return null; }
  });

  const [learnLang, setLearnLang] = useState<LearnLang | null>(() => {
    try {
      const saved = localStorage.getItem(LEARN_KEY);
      return ALL_LANGS.includes(saved as LearnLang) ? (saved as LearnLang) : null;
    } catch { return null; }
  });

  const { fontSize, changeFontSize, settingsOpen, setSettingsOpen } = useSettings();

  const t = learnLang && nativeLang ? getUi(learnLang, nativeLang) : getUi('ru', nativeLang || 'ar');
  const asianData = learnLang ? getAsianData(learnLang) : null;
  const isRtl = (nativeLang || 'ar') === 'ar';

  useEffect(() => { initVoices(); }, []);

  const handleNativeSelect = useCallback((lang: NativeLang) => {
    try { localStorage.setItem(NATIVE_KEY, lang); } catch { /* ignore */ }
    setNativeLang(lang);
  }, []);

  const handleLearnSelect = useCallback((lang: LearnLang) => {
    try { localStorage.setItem(LEARN_KEY, lang); } catch { /* ignore */ }
    setLearnLang(lang);
  }, []);

  const handleBackToWelcome = useCallback(() => {
    setLearnLang(null);
  }, []);

  const handleBackToNative = useCallback(() => {
    setLearnLang(null);
    setNativeLang(null);
    try { localStorage.removeItem(NATIVE_KEY); } catch { /* ignore */ }
  }, []);

  if (!nativeLang) {
    return <WelcomePage nativeLang={null} onSelectNative={handleNativeSelect} onSelectLearn={handleLearnSelect} />;
  }

  if (!learnLang) {
    return <WelcomePage nativeLang={nativeLang} onSelectNative={handleNativeSelect} onSelectLearn={handleLearnSelect} />;
  }

  if (!asianData) {
    return null;
  }

  const fl = FONT_LABELS[fontSize];
  const fontLabel = nativeLang === 'fr' ? fl.fr : nativeLang === 'en' ? fl.en : fl.ar;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-slate-800">{t.appTitle}</h1>
            <span className="text-xl">{langFlag[learnLang]}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                title={t.displaySettings}
              >
                <Settings className="w-4 h-4 text-slate-600" />
              </button>
              {settingsOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setSettingsOpen(false)} />
                  <div className={`absolute ${isRtl ? 'left-0' : 'right-0'} mt-2 bg-white rounded-xl shadow-lg border border-slate-200 p-4 z-40 min-w-[200px]`}>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                      <Type className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-semibold text-slate-700">{t.fontSize}</span>
                    </div>
                    <div className="flex gap-2">
                      {(['sm', 'md', 'lg'] as FontSize[]).map((size) => {
                        const sfl = FONT_LABELS[size];
                        const sLabel = nativeLang === 'fr' ? sfl.fr : nativeLang === 'en' ? sfl.en : sfl.ar;
                        return (
                          <button
                            key={size}
                            onClick={() => changeFontSize(size)}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-1 ${
                              fontSize === size
                                ? 'bg-teal-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {fontSize === size && <Check className="w-3 h-3" />}
                            {sLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={handleBackToWelcome}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              title={t.changeLang}
            >
              <Languages className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <AsianLanguagePanel
          data={asianData}
          lang={learnLang}
          onHome={handleBackToWelcome}
          listenLabel={t.listen}
          showMoreLabel={t.showMore}
          showLessLabel={t.showLess}
          fontSize={fontSize}
          uiStrings={t}
        />
      </main>
      <footer className="max-w-4xl mx-auto px-4 py-4 text-center text-xs text-slate-400">
        <p>{t.footer}</p>
      </footer>
      <FoxMascot lang={learnLang} message={
        learnLang === 'fr' ? "Bonjour! Je suis votre renard intelligent. Apprenons ensemble!" :
        learnLang === 'es' ? "¡Hola! Soy tu zorro inteligente. ¡Aprendamos juntos!" :
        "مرحباً! أنا ثعلبك الذكي. تعال نتعلم معاً!"
      } />
    </div>
  );
}
