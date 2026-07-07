import { useState, useCallback, useEffect } from 'react';
import { Star, Languages } from 'lucide-react';
import { ui, type LearnLang, langFlag } from './data/i18n';
import { getAsianData } from './data/asianLanguages';
import WelcomePage from './components/WelcomePage';
import AsianLanguagePanel from './components/AsianLanguagePanel';
import FoxMascot from './components/FoxMascot';
import { initVoices } from './hooks/useSpeech';

const ALL_LANGS: LearnLang[] = ['ru', 'en', 'ja', 'zh', 'ko', 'fr'];
const STORAGE_KEY = 'learnlang_choice';

export default function App() {
  const [learnLang, setLearnLang] = useState<LearnLang | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return ALL_LANGS.includes(saved as LearnLang) ? (saved as LearnLang) : null;
    } catch {
      return null;
    }
  });

  const t = learnLang ? ui[learnLang] : ui.ru;
  const asianData = learnLang ? getAsianData(learnLang) : null;

  useEffect(() => { initVoices(); }, []);

  const handleLangSelect = useCallback((lang: LearnLang) => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
    setLearnLang(lang);
  }, []);

  const handleBackToWelcome = useCallback(() => {
    setLearnLang(null);
  }, []);

  if (!learnLang) {
    return <WelcomePage onSelect={handleLangSelect} />;
  }

  if (!asianData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-slate-800">{t.appTitle}</h1>
            <span className="text-xl">{langFlag[learnLang]}</span>
          </div>
          <button
            onClick={handleBackToWelcome}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            title={t.changeLang}
          >
            <Languages className="w-4 h-4 text-slate-600" />
          </button>
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
        />
      </main>
      <footer className="max-w-4xl mx-auto px-4 py-4 text-center text-xs text-slate-400">
        <p>{t.footer}</p>
      </footer>
      <FoxMascot lang={learnLang} message={learnLang === 'fr' ? "Bonjour! Je suis votre renard intelligent. Apprenons ensemble!" : "مرحباً! أنا ثعلبك الذكي. تعال نتعلم معاً!"} />
    </div>
  );
}
