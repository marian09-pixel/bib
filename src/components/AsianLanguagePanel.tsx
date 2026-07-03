import { useState, useCallback, useEffect } from 'react';
import { Home, Volume2, BookOpen, MessageSquare, RotateCcw, CheckCircle2, Zap } from 'lucide-react';
import type { AsianLanguageData, AsianPair, GreetingPair } from '../data/asianLanguages';
import type { LearnLang } from '../data/i18n';
import { useSpeech } from '../hooks/useSpeech';

interface AsianLanguagePanelProps {
  data: AsianLanguageData;
  lang: LearnLang;
  onHome: () => void;
  lettersLabel: string;
  greetingsLabel: string;
  matchLetterLabel: string;
  matchLetterDesc: string;
  listenLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
}

type SubView = 'menu' | 'letters' | 'greetings' | 'game';

interface GameCard {
  id: string;
  text: string;
  subtext: string;
  isChar: boolean;
  pairId: string;
  index: number;
}

export default function AsianLanguagePanel({
  data, lang, onHome,
  lettersLabel, greetingsLabel, matchLetterLabel, matchLetterDesc,
  listenLabel, showMoreLabel, showLessLabel,
}: AsianLanguagePanelProps) {
  const [subView, setSubView] = useState<SubView>('menu');
  const { speak } = useSpeech(lang);

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      {/* Header bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={onHome}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4 text-slate-600" />
          </button>
          <div className="text-center">
            <h3 className="text-base font-bold text-slate-800">{data.lettersTitle.split(' ')[0]}</h3>
            <p className="text-xs text-slate-400">{data.lettersSubtitle}</p>
          </div>
          <div className="w-8 h-8 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-teal-600" />
          </div>
        </div>
      </div>

      {subView === 'menu' && (
        <MenuView
          data={data}
          lettersLabel={lettersLabel}
          greetingsLabel={greetingsLabel}
          matchLetterLabel={matchLetterLabel}
          onSelect={setSubView}
        />
      )}

      {subView === 'letters' && (
        <LettersView
          data={data}
          lang={lang}
          onSpeak={speak}
          listenLabel={listenLabel}
          onBack={() => setSubView('menu')}
          showMoreLabel={showMoreLabel}
          showLessLabel={showLessLabel}
        />
      )}

      {subView === 'greetings' && (
        <GreetingsView
          data={data}
          lang={lang}
          onSpeak={speak}
          listenLabel={listenLabel}
          onBack={() => setSubView('menu')}
        />
      )}

      {subView === 'game' && (
        <LetterGame
          data={data}
          lang={lang}
          onSpeak={speak}
          matchLetterLabel={matchLetterLabel}
          matchLetterDesc={matchLetterDesc}
          onBack={() => setSubView('menu')}
        />
      )}
    </div>
  );
}

// ===================== MENU =====================
function MenuView({ data, lettersLabel, greetingsLabel, matchLetterLabel, onSelect }: {
  data: AsianLanguageData;
  lettersLabel: string;
  greetingsLabel: string;
  matchLetterLabel: string;
  onSelect: (v: SubView) => void;
}) {
  const cards = [
    { id: 'letters' as SubView, title: lettersLabel, desc: data.lettersSubtitle, icon: BookOpen, count: data.letters.length, color: 'teal' },
    { id: 'greetings' as SubView, title: greetingsLabel, desc: data.greetingsSubtitle, icon: MessageSquare, count: data.greetings.length, color: 'blue' },
    { id: 'game' as SubView, title: matchLetterLabel, desc: 'اربط الحرف بنطقه العربي', icon: Zap, count: data.letters.length, color: 'amber' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <button
            key={card.id}
            onClick={() => onSelect(card.id)}
            className={`
              rounded-xl border-2 p-5 text-right transition-all duration-300 cursor-pointer
              hover:shadow-md hover:scale-[1.02] active:scale-95
              border-slate-200 bg-white hover:border-teal-300
            `}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                card.color === 'teal' ? 'bg-teal-100 text-teal-600' :
                card.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                'bg-amber-100 text-amber-600'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">{card.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
              <span className="text-xs text-slate-400 mt-1">{card.count} عنصر</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ===================== LETTERS VIEW =====================
function LettersView({ data, lang, onSpeak, listenLabel, onBack, showMoreLabel, showLessLabel }: {
  data: AsianLanguageData;
  lang: LearnLang;
  onSpeak: (t: string) => void;
  listenLabel: string;
  onBack: () => void;
  showMoreLabel: string;
  showLessLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? data.letters : data.letters.slice(0, 15);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">{data.lettersTitle}</h2>
        <button onClick={onBack} className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer">
          ← {listenLabel.replace('استمع', 'رجوع')}
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {visible.map((letter, i) => (
          <LetterCard key={letter.id} letter={letter} lang={lang} onSpeak={onSpeak} delay={i * 30} />
        ))}
      </div>

      {data.letters.length > 15 && (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            {expanded ? showLessLabel : showMoreLabel}
          </button>
        </div>
      )}
    </div>
  );
}

function LetterCard({ letter, lang, onSpeak, delay }: {
  letter: AsianPair;
  lang: LearnLang;
  onSpeak: (t: string) => void;
  delay: number;
}) {
  return (
    <div
      className="bg-white rounded-xl border border-slate-200 p-3 text-center hover:shadow-md transition-all cursor-pointer animate-[fadeIn_0.3s_ease-out] group"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onSpeak(letter.char)}
    >
      <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-1 group-hover:text-teal-600 transition-colors">
        {letter.char}
      </div>
      <div className="text-xs text-slate-400 font-mono">{letter.roman}</div>
      <div className="text-sm text-slate-600 font-medium mt-0.5">{letter.arabic}</div>
      <div className="flex items-center justify-center mt-1.5">
        <Volume2 className="w-3.5 h-3.5 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

// ===================== GREETINGS VIEW =====================
function GreetingsView({ data, lang, onSpeak, listenLabel, onBack }: {
  data: AsianLanguageData;
  lang: LearnLang;
  onSpeak: (t: string) => void;
  listenLabel: string;
  onBack: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">{data.greetingsTitle}</h2>
        <button onClick={onBack} className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer">
          ← رجوع
        </button>
      </div>

      <div className="space-y-2.5">
        {data.greetings.map((g, i) => (
          <GreetingCard key={g.id} greeting={g} lang={lang} onSpeak={onSpeak} listenLabel={listenLabel} delay={i * 40} />
        ))}
      </div>
    </div>
  );
}

function GreetingCard({ greeting, lang, onSpeak, listenLabel, delay }: {
  greeting: GreetingPair;
  lang: LearnLang;
  onSpeak: (t: string) => void;
  listenLabel: string;
  delay: number;
}) {
  return (
    <div
      className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-3 hover:shadow-sm transition-all animate-[fadeIn_0.3s_ease-out]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex-1 text-right">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold text-slate-800">{greeting.target}</span>
          <span className="text-xs text-slate-400 font-mono">{greeting.roman}</span>
        </div>
        <p className="text-sm text-slate-600">{greeting.arabic}</p>
        <span className="inline-block text-xs text-teal-500 bg-teal-50 px-2 py-0.5 rounded-full mt-1">{greeting.category}</span>
      </div>
      <button
        onClick={() => onSpeak(greeting.target)}
        className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-100 hover:bg-teal-200 flex items-center justify-center transition-colors cursor-pointer group"
        title={listenLabel}
      >
        <Volume2 className="w-5 h-5 text-teal-600" />
      </button>
    </div>
  );
}

// ===================== LETTER MATCHING GAME =====================
function LetterGame({ data, lang, onSpeak, matchLetterLabel, matchLetterDesc, onBack }: {
  data: AsianLanguageData;
  lang: LearnLang;
  onSpeak: (t: string) => void;
  matchLetterLabel: string;
  matchLetterDesc: string;
  onBack: () => void;
}) {
  const gamePairs = data.letters.slice(0, 10);
  const [cards, setCards] = useState<GameCard[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    const charCards: GameCard[] = gamePairs.map((p, i) => ({
      id: `char-${p.id}`, text: p.char, subtext: p.roman, isChar: true, pairId: p.id, index: i * 2,
    }));
    const arCards: GameCard[] = gamePairs.map((p, i) => ({
      id: `ar-${p.id}`, text: p.arabic, subtext: p.category, isChar: false, pairId: p.id, index: i * 2 + 1,
    }));
    const all = [...charCards, ...arCards].sort(() => Math.random() - 0.5);
    all.forEach((c, i) => (c.index = i));
    setCards(all);
  }, []);

  const handleClick = useCallback((index: number) => {
    if (selected.length === 2) return;
    if (selected.includes(index)) {
      setSelected(prev => prev.filter(i => i !== index));
      return;
    }
    const newSel = [...selected, index];
    setSelected(newSel);

    if (newSel.length === 2) {
      const c1 = cards[newSel[0]];
      const c2 = cards[newSel[1]];
      if (c1.pairId === c2.pairId) {
        setMatched(prev => new Set(prev).add(c1.pairId));
        setSelected([]);
        setScore(s => s + 10);
        const charCard = c1.isChar ? c1 : c2;
        onSpeak(charCard.text);
      } else {
        setWrong(newSel);
        setMistakes(m => m + 1);
        setTimeout(() => { setWrong([]); setSelected([]); }, 600);
      }
    }
  }, [selected, cards, onSpeak]);

  const allDone = matched.size === gamePairs.length;
  const restart = () => {
    setCards(prev => [...prev].sort(() => Math.random() - 0.5).map((c, i) => { c.index = i; return c; }));
    setSelected([]); setMatched(new Set()); setWrong([]); setScore(0); setMistakes(0);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">{matchLetterLabel}</h2>
          <p className="text-xs text-slate-400">{matchLetterDesc}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-slate-700">{score}</span>
          </div>
          <button onClick={restart} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
            <RotateCcw className="w-4 h-4 text-slate-600" />
          </button>
          <button onClick={onBack} className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer">← رجوع</button>
        </div>
      </div>

      {allDone && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4 text-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1" />
          <p className="text-emerald-700 font-semibold">أحسنت! أكملت جميع المطابقات</p>
          <p className="text-sm text-emerald-600 mt-1">النقاط: {score} | الأخطاء: {mistakes}</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
        {cards.map((card, i) => {
          const isMatched = matched.has(card.pairId);
          const isSelected = selected.includes(i);
          const isWrong = wrong.includes(i);
          return (
            <div
              key={card.id}
              onClick={() => handleClick(i)}
              className={`
                rounded-xl border-2 p-3 text-center transition-all duration-300 cursor-pointer
                ${isMatched ? 'border-emerald-300 bg-emerald-50 opacity-60' : ''}
                ${!isMatched && isSelected && !isWrong ? 'border-teal-500 bg-teal-50 scale-105' : ''}
                ${isWrong ? 'border-rose-400 bg-rose-50 animate-pulse' : ''}
                ${!isMatched && !isSelected && !isWrong ? 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm' : ''}
              `}
            >
              <div className={`text-2xl md:text-3xl font-bold mb-0.5 ${card.isChar ? 'text-slate-800' : 'text-teal-700'}`}>
                {card.text}
              </div>
              <div className="text-xs text-slate-400">{card.subtext}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
