import { useState, useCallback, useEffect } from 'react';
import { Home, Volume2, BookOpen, RotateCcw, CheckCircle2, Zap, ChevronRight } from 'lucide-react';
import type { AsianLanguageData, AsianPair, AsianUnit } from '../data/asianLanguages';
import type { LearnLang } from '../data/i18n';
import { useSpeech } from '../hooks/useSpeech';

interface AsianLanguagePanelProps {
  data: AsianLanguageData;
  lang: LearnLang;
  onHome: () => void;
  listenLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
}

type SubView = 'menu' | 'unit' | 'game';

interface GameCard {
  id: string;
  text: string;
  subtext: string;
  isChar: boolean;
  pairId: string;
  index: number;
}

export default function AsianLanguagePanel({
  data, lang, onHome, listenLabel, showMoreLabel, showLessLabel,
}: AsianLanguagePanelProps) {
  const [subView, setSubView] = useState<SubView>('menu');
  const [activeUnit, setActiveUnit] = useState<AsianUnit | null>(null);
  const { speak } = useSpeech(lang);

  const openUnit = (unit: AsianUnit) => {
    setActiveUnit(unit);
    setSubView('unit');
  };

  const openGame = (unit: AsianUnit) => {
    setActiveUnit(unit);
    setSubView('game');
  };

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
            <h3 className="text-base font-bold text-slate-800">{data.units[0].title.split(' ')[0]}</h3>
            <p className="text-xs text-slate-400">{data.units.length} وحدات تعليمية</p>
          </div>
          <div className="w-8 h-8 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-teal-600" />
          </div>
        </div>
      </div>

      {subView === 'menu' && (
        <MenuView data={data} onOpenUnit={openUnit} onOpenGame={openGame} />
      )}

      {subView === 'unit' && activeUnit && (
        <UnitView
          unit={activeUnit}
          lang={lang}
          onSpeak={speak}
          listenLabel={listenLabel}
          onBack={() => setSubView('menu')}
          showMoreLabel={showMoreLabel}
          showLessLabel={showLessLabel}
          onPlayGame={() => openGame(activeUnit)}
        />
      )}

      {subView === 'game' && activeUnit && (
        <LetterGame
          unit={activeUnit}
          lang={lang}
          onSpeak={speak}
          onBack={() => setSubView('menu')}
        />
      )}
    </div>
  );
}

// ===================== MENU =====================
function MenuView({ data, onOpenUnit, onOpenGame }: {
  data: AsianLanguageData;
  onOpenUnit: (u: AsianUnit) => void;
  onOpenGame: (u: AsianUnit) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {data.units.map((unit, i) => {
        const colors = [
          { bg: 'bg-teal-100', text: 'text-teal-600', border: 'hover:border-teal-300' },
          { bg: 'bg-blue-100', text: 'text-blue-600', border: 'hover:border-blue-300' },
          { bg: 'bg-amber-100', text: 'text-amber-600', border: 'hover:border-amber-300' },
          { bg: 'bg-rose-100', text: 'text-rose-600', border: 'hover:border-rose-300' },
          { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'hover:border-indigo-300' },
        ];
        const c = colors[i % colors.length];
        return (
          <div
            key={unit.id}
            className={`rounded-2xl border-2 border-slate-200 bg-white p-5 ${c.border} transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center text-2xl`}>
                {unit.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-800">{unit.title}</h3>
                <p className="text-xs text-slate-500">{unit.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => onOpenUnit(unit)}
                className={`flex-1 px-3 py-2 ${c.bg} ${c.text} rounded-lg text-sm font-semibold transition-all hover:opacity-80 cursor-pointer flex items-center justify-center gap-1`}
              >
                <BookOpen className="w-4 h-4" />
                <span>تصفح</span>
              </button>
              <button
                onClick={() => onOpenGame(unit)}
                className="flex-1 px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold transition-all hover:bg-slate-200 cursor-pointer flex items-center justify-center gap-1"
              >
                <Zap className="w-4 h-4" />
                <span>لعبة</span>
              </button>
            </div>
            <p className="text-xs text-slate-400 text-center mt-2">{unit.pairs.length} عنصر</p>
          </div>
        );
      })}
    </div>
  );
}

// ===================== UNIT VIEW =====================
function UnitView({ unit, lang, onSpeak, listenLabel, onBack, showMoreLabel, showLessLabel, onPlayGame }: {
  unit: AsianUnit;
  lang: LearnLang;
  onSpeak: (t: string) => void;
  listenLabel: string;
  onBack: () => void;
  showMoreLabel: string;
  showLessLabel: string;
  onPlayGame: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? unit.pairs : unit.pairs.slice(0, 15);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{unit.icon}</span>
          <div>
            <h2 className="text-lg font-bold text-slate-800">{unit.title}</h2>
            <p className="text-xs text-slate-400">{unit.subtitle}</p>
          </div>
        </div>
        <button onClick={onBack} className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer">
          ← رجوع
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {visible.map((pair, i) => (
          <PairCard key={pair.id} pair={pair} onSpeak={onSpeak} delay={i * 30} />
        ))}
      </div>

      {unit.pairs.length > 15 && (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            {expanded ? showLessLabel : showMoreLabel} ({unit.pairs.length})
          </button>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={onPlayGame}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Zap className="w-4 h-4" />
          <span>العب لعبة المطابقة</span>
        </button>
      </div>
    </div>
  );
}

function PairCard({ pair, onSpeak, delay }: {
  pair: AsianPair;
  onSpeak: (t: string) => void;
  delay: number;
}) {
  return (
    <div
      className="bg-white rounded-xl border border-slate-200 p-3 text-center hover:shadow-md transition-all cursor-pointer animate-[fadeIn_0.3s_ease-out] group"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onSpeak(pair.char)}
    >
      <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-1 group-hover:text-teal-600 transition-colors break-all">
        {pair.char}
      </div>
      <div className="text-xs text-slate-400 font-mono">{pair.roman}</div>
      <div className="text-sm text-slate-600 font-medium mt-0.5">{pair.arabic}</div>
      <div className="flex items-center justify-center mt-1.5">
        <Volume2 className="w-3.5 h-3.5 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

// ===================== MATCHING GAME =====================
function LetterGame({ unit, lang, onSpeak, onBack }: {
  unit: AsianUnit;
  lang: LearnLang;
  onSpeak: (t: string) => void;
  onBack: () => void;
}) {
  const gamePairs = unit.pairs.slice(0, 10);
  const [cards, setCards] = useState<GameCard[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    const charCards: GameCard[] = gamePairs.map((p) => ({
      id: `char-${p.id}`, text: p.char, subtext: p.roman, isChar: true, pairId: p.id, index: 0,
    }));
    const arCards: GameCard[] = gamePairs.map((p) => ({
      id: `ar-${p.id}`, text: p.arabic, subtext: p.category, isChar: false, pairId: p.id, index: 0,
    }));
    const all = [...charCards, ...arCards].sort(() => Math.random() - 0.5);
    all.forEach((c, i) => (c.index = i));
    setCards(all);
  }, [unit.id]);

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
          <h2 className="text-lg font-bold text-slate-800">لعبة مطابقة: {unit.title}</h2>
          <p className="text-xs text-slate-400">اربط الحرف/الكلمة بمعناه العربي</p>
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
              <div className={`text-xl md:text-2xl font-bold mb-0.5 ${card.isChar ? 'text-slate-800' : 'text-teal-700'} break-all`}>
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
