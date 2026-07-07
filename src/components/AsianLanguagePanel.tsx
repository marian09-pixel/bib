import { useState, useCallback, useEffect } from 'react';
import { Home, Volume2, BookOpen, RotateCcw, CheckCircle2, Zap, ChevronRight, Dumbbell, X, Timer, Trophy } from 'lucide-react';
import type { AsianLanguageData, AsianPair, AsianUnit } from '../data/asianLanguages';
import type { LearnLang } from '../data/i18n';
import { useSpeech } from '../hooks/useSpeech';
import { getFontClasses, getBestTime, saveBestTime, type FontSize } from '../hooks/useSettings';

interface AsianLanguagePanelProps {
  data: AsianLanguageData;
  lang: LearnLang;
  onHome: () => void;
  listenLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
  fontSize: FontSize;
}

type SubView = 'menu' | 'unit' | 'game' | 'practice';

interface GameCard {
  id: string;
  text: string;
  subtext: string;
  isChar: boolean;
  pairId: string;
  index: number;
}

export default function AsianLanguagePanel({
  data, lang, onHome, listenLabel, showMoreLabel, showLessLabel, fontSize,
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

  const openPractice = (unit: AsianUnit) => {
    setActiveUnit(unit);
    setSubView('practice');
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
        <MenuView data={data} onOpenUnit={openUnit} onOpenGame={openGame} onOpenPractice={openPractice} />
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
          fontSize={fontSize}
        />
      )}

      {subView === 'game' && activeUnit && (
        <LetterGame
          unit={activeUnit}
          lang={lang}
          onSpeak={speak}
          onBack={() => setSubView('menu')}
          fontSize={fontSize}
        />
      )}

      {subView === 'practice' && activeUnit && (
        <PracticeQuiz
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
function MenuView({ data, onOpenUnit, onOpenGame, onOpenPractice }: {
  data: AsianLanguageData;
  onOpenUnit: (u: AsianUnit) => void;
  onOpenGame: (u: AsianUnit) => void;
  onOpenPractice: (u: AsianUnit) => void;
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
              <button
                onClick={() => onOpenPractice(unit)}
                className="flex-1 px-3 py-2 bg-emerald-100 text-emerald-600 rounded-lg text-sm font-semibold transition-all hover:bg-emerald-200 cursor-pointer flex items-center justify-center gap-1"
              >
                <Dumbbell className="w-4 h-4" />
                <span>تمرين</span>
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
function UnitView({ unit, lang, onSpeak, listenLabel, onBack, showMoreLabel, showLessLabel, onPlayGame, fontSize }: {
  unit: AsianUnit;
  lang: LearnLang;
  onSpeak: (t: string) => void;
  listenLabel: string;
  onBack: () => void;
  showMoreLabel: string;
  showLessLabel: string;
  onPlayGame: () => void;
  fontSize: FontSize;
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
          <PairCard key={pair.id} pair={pair} onSpeak={onSpeak} delay={i * 30} fontSize={fontSize} />
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

function PairCard({ pair, onSpeak, delay, fontSize }: {
  pair: AsianPair;
  onSpeak: (t: string) => void;
  delay: number;
  fontSize: FontSize;
}) {
  const fc = getFontClasses(fontSize);
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 p-3 text-center hover:shadow-md transition-all cursor-pointer animate-[fadeIn_0.3s_ease-out] group`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onSpeak(pair.char)}
    >
      <div className={`${fc.char} font-bold text-slate-800 mb-1 group-hover:text-teal-600 transition-colors break-all`}>
        {pair.char}
      </div>
      <div className={`${fc.roman} text-slate-400 font-mono`}>{pair.roman}</div>
      <div className={`${fc.arabic} text-slate-600 font-medium mt-0.5`}>{pair.arabic}</div>
      <div className="flex items-center justify-center mt-1.5">
        <Volume2 className="w-3.5 h-3.5 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

// ===================== MATCHING GAME =====================
function LetterGame({ unit, lang, onSpeak, onBack, fontSize }: {
  unit: AsianUnit;
  lang: LearnLang;
  onSpeak: (t: string) => void;
  onBack: () => void;
  fontSize: FontSize;
}) {
  const gamePairs = unit.pairs.slice(0, 10);
  const [cards, setCards] = useState<GameCard[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(() => getBestTime(unit.id, lang));
  const [newRecord, setNewRecord] = useState(false);
  const fc = getFontClasses(fontSize);

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
    setElapsed(0);
    setRunning(false);
    setNewRecord(false);
  }, [unit.id]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const handleClick = useCallback((index: number) => {
    if (!running) setRunning(true);
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

  useEffect(() => {
    if (allDone && running) {
      setRunning(false);
      const isRecord = saveBestTime(unit.id, lang, elapsed);
      if (isRecord) {
        setNewRecord(true);
        setBestTime(elapsed);
      }
    }
  }, [allDone, running, elapsed, unit.id, lang]);

  const restart = () => {
    setCards(prev => [...prev].sort(() => Math.random() - 0.5).map((c, i) => { c.index = i; return c; }));
    setSelected([]); setMatched(new Set()); setWrong([]); setScore(0); setMistakes(0);
    setElapsed(0); setRunning(false); setNewRecord(false);
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
            <Timer className="w-4 h-4 text-teal-500" />
            <span className="font-semibold text-slate-700 tabular-nums">{elapsed}s</span>
          </div>
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
          <p className="text-sm text-emerald-600 mt-1">النقاط: {score} | الأخطاء: {mistakes} | الوقت: {elapsed} ثانية</p>
          {newRecord && (
            <p className="text-sm text-amber-600 font-bold mt-1 flex items-center justify-center gap-1">
              <Trophy className="w-4 h-4" /> رقم قياسي جديد!
            </p>
          )}
          {bestTime !== null && !newRecord && (
            <p className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1">
              <Trophy className="w-3 h-3" /> أفضل وقت: {bestTime} ثانية
            </p>
          )}
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
              <div className={`${fc.char} font-bold mb-0.5 ${card.isChar ? 'text-slate-800' : 'text-teal-700'} break-all`}>
                {card.text}
              </div>
              <div className={`${fc.roman} text-slate-400`}>{card.subtext}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== Practice Quiz (multiple-choice) =====
function PracticeQuiz({ unit, lang, onSpeak, onBack }: {
  unit: AsianUnit;
  lang: LearnLang;
  onSpeak: (text: string, lang: LearnLang) => void;
  onBack: () => void;
}) {
  const [questions, setQuestions] = useState(() => buildQuestions(unit));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  function buildQuestions(u: AsianUnit) {
    const shuffled = [...u.pairs].sort(() => Math.random() - 0.5).slice(0, Math.min(10, u.pairs.length));
    return shuffled.map((pair) => {
      const wrong = u.pairs
        .filter((p) => p.id !== pair.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((p) => p.arabic);
      const options = [...wrong, pair.arabic].sort(() => Math.random() - 0.5);
      return { pair, options };
    });
  }

  const q = questions[idx];

  const handlePick = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    if (opt === q.pair.arabic) setScore((s) => s + 1);
    setTimeout(() => {
      if (idx + 1 < questions.length) {
        setIdx((i) => i + 1);
        setPicked(null);
      } else {
        setShowResult(true);
      }
    }, 900);
  };

  const restart = () => {
    setQuestions(buildQuestions(unit));
    setIdx(0);
    setScore(0);
    setPicked(null);
    setShowResult(false);
  };

  if (showResult) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${pct >= 70 ? 'bg-emerald-100' : 'bg-amber-100'}`}>
            <span className="text-4xl">{pct >= 70 ? '🎉' : '💪'}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">انتهى التمرين!</h3>
          <p className="text-3xl font-bold text-emerald-600 mb-1">{score} / {questions.length}</p>
          <p className="text-slate-500 mb-6">{pct}% صحيح</p>
          <div className="flex gap-3">
            <button onClick={restart} className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors cursor-pointer flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> إعادة
            </button>
            <button onClick={onBack} className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 transition-colors cursor-pointer">
              رجوع
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center gap-1 text-slate-500 hover:text-slate-700 text-sm cursor-pointer">
          <ChevronRight className="w-4 h-4 rotate-180" /> رجوع
        </button>
        <div className="flex items-center gap-2 text-sm">
          <Dumbbell className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold text-slate-700">{unit.title}</span>
        </div>
        <div className="text-sm font-semibold text-emerald-600">
          {idx + 1} / {questions.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
        <div className="text-center mb-6">
          <p className="text-sm text-slate-400 mb-2">ما معنى هذه الكلمة؟</p>
          <button
            onClick={() => onSpeak(q.pair.char, lang)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <Volume2 className="w-5 h-5 text-emerald-500" />
            <span className="text-2xl font-bold text-slate-800">{q.pair.char}</span>
          </button>
          <p className="text-sm text-slate-400 mt-1">{q.pair.roman}</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {q.options.map((opt) => {
            const isCorrect = opt === q.pair.arabic;
            const isPicked = opt === picked;
            let cls = 'bg-slate-50 hover:bg-slate-100 border-slate-200';
            if (picked) {
              if (isCorrect) cls = 'bg-emerald-50 border-emerald-400';
              else if (isPicked) cls = 'bg-rose-50 border-rose-400';
              else cls = 'bg-slate-50 border-slate-200 opacity-50';
            }
            return (
              <button
                key={opt}
                onClick={() => handlePick(opt)}
                disabled={!!picked}
                className={`px-4 py-3 rounded-xl border-2 text-right font-semibold transition-all ${cls} ${!picked ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">{opt}</span>
                  {picked && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  {picked && isPicked && !isCorrect && <X className="w-5 h-5 text-rose-500" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
        <span className="font-semibold text-emerald-600">النقاط: {score}</span>
      </div>
    </div>
  );
}