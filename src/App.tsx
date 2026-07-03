import { useState, useCallback, useEffect } from 'react';
import { Trophy, Star, RotateCcw, Home, ChevronRight, Zap, Heart, Clock, Languages } from 'lucide-react';
import { levels as levelsRu } from './data/vocabulary';
import { levelsEn } from './data/vocabularyEn';
import { ui, type LearnLang } from './data/i18n';
import { getLesson } from './data/lessons';
import GameBoard from './components/GameBoard';
import LevelSelect from './components/LevelSelect';
import WelcomePage from './components/WelcomePage';
import LessonView from './components/LessonView';
import { useSpeech, initVoices } from './hooks/useSpeech';

type View = 'menu' | 'playing' | 'levelComplete' | 'lesson';

interface GameState {
  score: number;
  streak: number;
  bestStreak: number;
  mistakes: number;
  completedLevels: Set<string>;
  totalTime: number;
  currentLevel: string | null;
  levelProgress: number;
  levelTotal: number;
  levelStartTime: number;
  levelScore: number;
  health: number;
}

const MAX_HEALTH = 5;
const STORAGE_KEY = 'learnlang_choice';

export default function App() {
  const [learnLang, setLearnLang] = useState<LearnLang | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'ru' || saved === 'en' ? saved : null;
    } catch {
      return null;
    }
  });
  const [view, setView] = useState<View>('menu');
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    streak: 0,
    bestStreak: 0,
    mistakes: 0,
    completedLevels: new Set(),
    totalTime: 0,
    currentLevel: null,
    levelProgress: 0,
    levelTotal: 0,
    levelStartTime: 0,
    levelScore: 0,
    health: MAX_HEALTH,
  });
  const [elapsedTime, setElapsedTime] = useState(0);

  const t = learnLang ? ui[learnLang] : ui.ru;
  const levels = learnLang === 'en' ? levelsEn : levelsRu;
  const currentLevelData = levels.find(l => l.id === gameState.currentLevel);

  useEffect(() => {
    if (view !== 'playing') return;
    const timer = setInterval(() => {
      setElapsedTime(Date.now() - gameState.levelStartTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [view, gameState.levelStartTime]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startLevel = useCallback((levelId: string) => {
    const isLesson = levelId === 'grammar' || levelId === 'sentence-building';
    setGameState(prev => ({
      ...prev,
      currentLevel: levelId,
      levelStartTime: Date.now(),
      levelScore: 0,
      health: MAX_HEALTH,
      streak: 0,
      mistakes: 0,
      levelProgress: 0,
      levelTotal: levels.find(l => l.id === levelId)?.pairs.length || 0,
    }));
    setElapsedTime(0);
    setView(isLesson ? 'lesson' : 'playing');
  }, [levels]);

  const handleScore = useCallback((points: number) => {
    setGameState(prev => {
      const newStreak = prev.streak + 1;
      const streakBonus = newStreak >= 3 ? newStreak * 2 : 0;
      const totalPoints = points + streakBonus;
      return {
        ...prev,
        score: prev.score + totalPoints,
        levelScore: prev.levelScore + totalPoints,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
      };
    });
  }, []);

  const handleMistake = useCallback(() => {
    setGameState(prev => {
      const newHealth = prev.health - 1;
      const newMistakes = prev.mistakes + 1;
      if (newHealth <= 0) {
        return { ...prev, health: 0, mistakes: newMistakes, streak: 0 };
      }
      return { ...prev, health: newHealth, mistakes: newMistakes, streak: 0 };
    });
  }, []);

  const handleProgress = useCallback((completed: number, total: number) => {
    setGameState(prev => ({ ...prev, levelProgress: completed, levelTotal: total }));
  }, []);

  const handleComplete = useCallback(() => {
    setGameState(prev => {
      const newCompleted = new Set(prev.completedLevels);
      if (prev.currentLevel) newCompleted.add(prev.currentLevel);
      const levelTime = Date.now() - prev.levelStartTime;
      return { ...prev, completedLevels: newCompleted, totalTime: prev.totalTime + levelTime };
    });
    setTimeout(() => setView('levelComplete'), 800);
  }, []);

  const goToMenu = useCallback(() => setView('menu'), []);

  const restartLevel = useCallback(() => {
    if (gameState.currentLevel) startLevel(gameState.currentLevel);
  }, [gameState.currentLevel, startLevel]);

  const handleLangSelect = useCallback((lang: LearnLang) => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
    setLearnLang(lang);
    setView('menu');
    setGameState(prev => ({ ...prev, completedLevels: new Set(), currentLevel: null }));
  }, []);

  const handleBackToWelcome = useCallback(() => {
    setLearnLang(null);
    setView('menu');
    setGameState(prev => ({ ...prev, completedLevels: new Set(), currentLevel: null, score: 0, bestStreak: 0 }));
  }, []);

  const { speak } = useSpeech(learnLang ?? 'ru');

  const handleSpeak = useCallback((text: string) => { speak(text); }, [speak]);

  useEffect(() => { initVoices(); }, []);

  useEffect(() => {
    if (view === 'lesson' && gameState.currentLevel) {
      setGameState(prev => {
        const newCompleted = new Set(prev.completedLevels);
        newCompleted.add(prev.currentLevel!);
        return { ...prev, completedLevels: newCompleted };
      });
    }
  }, [view, gameState.currentLevel]);

  if (!learnLang) {
    return <WelcomePage onSelect={handleLangSelect} />;
  }

  const totalStars = gameState.completedLevels.size;
  const progressPercent = gameState.levelTotal > 0
    ? (gameState.levelProgress / gameState.levelTotal) * 100
    : 0;

  const nextLevel = currentLevelData
    ? levels[levels.findIndex(l => l.id === currentLevelData.id) + 1]
    : null;

  const isGameOver = gameState.health <= 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-slate-800">{t.appTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-slate-700">{gameState.score}</span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: MAX_HEALTH }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 ${i < gameState.health ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`}
                />
              ))}
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
        {/* Menu View */}
        {view === 'menu' && (
          <div className="animate-[fadeIn_0.4s_ease-out]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-600 mb-4 shadow-lg shadow-teal-200">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{t.matchGame}</h2>
              <p className="text-slate-500 text-sm md:text-base">{t.matchDesc(t.targetLangName)}</p>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{totalStars} / {levels.length} {t.levels}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>{t.bestStreak}: {gameState.bestStreak}</span>
                </div>
              </div>
            </div>
            <LevelSelect
              levels={levels}
              completedLevels={gameState.completedLevels}
              currentLevel={gameState.currentLevel}
              onSelect={startLevel}
              wordsCountLabel={t.wordsCount}
            />
          </div>
        )}

        {/* Playing View */}
        {view === 'playing' && currentLevelData && (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            {/* Level Info Bar */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={goToMenu}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Home className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={restartLevel}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="text-base font-bold text-slate-800">{currentLevelData.name}</h3>
                  <p className="text-xs text-slate-400">{currentLevelData.nameRu}</p>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{formatTime(elapsedTime)}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-xs text-slate-400">
                  {gameState.levelProgress} / {gameState.levelTotal} {t.matches}
                </span>
                <span className="text-xs font-semibold text-teal-600">{Math.round(progressPercent)}%</span>
              </div>
            </div>

            {/* Game Over */}
            {isGameOver && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6 text-center">
                <p className="text-rose-700 font-semibold mb-2">{t.outOfTries}</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={restartLevel}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 inline-block mr-1" />
                    {t.retry}
                  </button>
                  <button
                    onClick={goToMenu}
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  >
                    {t.menu}
                  </button>
                </div>
              </div>
            )}

            {/* Game Board */}
            {!isGameOver && (
              <GameBoard
                pairs={currentLevelData.pairs}
                onScore={handleScore}
                onMistake={handleMistake}
                onComplete={handleComplete}
                onProgress={handleProgress}
                onSpeak={handleSpeak}
              />
            )}

            {/* Score Info */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>{t.streak}: {gameState.streak}</span>
                {gameState.streak >= 3 && (
                  <span className="text-xs text-amber-600 font-semibold">(+{gameState.streak * 2} {t.bonus})</span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>{t.levelScore}: {gameState.levelScore}</span>
              </div>
            </div>
          </div>
        )}

        {/* Lesson View (Grammar / Sentence Building) */}
        {view === 'lesson' && currentLevelData && learnLang && (
          <LessonView
            lesson={getLesson(currentLevelData.id, learnLang)!}
            levelName={currentLevelData.name}
            levelSubtitle={currentLevelData.nameRu}
            onHome={goToMenu}
            lang={learnLang}
          />
        )}

        {/* Level Complete View */}
        {view === 'levelComplete' && currentLevelData && (
          <div className="animate-[fadeIn_0.4s_ease-out] max-w-md mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-lg">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-emerald-500 fill-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">{t.wellDone}</h2>
              <p className="text-slate-500 mb-6">{t.completedLevel(currentLevelData.name)}</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-1">{t.points}</p>
                  <p className="text-xl font-bold text-teal-600">{gameState.levelScore}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-1">{t.time}</p>
                  <p className="text-xl font-bold text-slate-700">{formatTime(Date.now() - gameState.levelStartTime)}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-1">{t.bestStreakLabel}</p>
                  <p className="text-xl font-bold text-amber-500">{gameState.streak}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-1">{t.mistakes}</p>
                  <p className="text-xl font-bold text-rose-500">{gameState.mistakes}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {nextLevel && (
                  <button
                    onClick={() => startLevel(nextLevel.id)}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t.nextLevel(nextLevel.name)}</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={goToMenu}
                  className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  {t.backToMenu}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-4 text-center text-xs text-slate-400">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}
