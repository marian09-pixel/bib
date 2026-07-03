import { BookOpen, CheckCircle2, GraduationCap } from 'lucide-react';
import { Level } from '../data/vocabulary';

interface LevelSelectProps {
  levels: Level[];
  completedLevels: Set<string>;
  currentLevel: string | null;
  onSelect: (levelId: string) => void;
  wordsCountLabel: (n: number) => string;
}

const LESSON_IDS = new Set(['grammar', 'sentence-building']);

export default function LevelSelect({ levels, completedLevels, currentLevel, onSelect, wordsCountLabel }: LevelSelectProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {levels.map((level, i) => {
        const isCompleted = completedLevels.has(level.id);
        const isCurrent = currentLevel === level.id;
        const isLesson = LESSON_IDS.has(level.id);
        return (
          <button
            key={level.id}
            onClick={() => onSelect(level.id)}
            className={`
              relative rounded-xl border-2 p-5 text-right transition-all duration-300 cursor-pointer
              hover:shadow-md hover:scale-[1.02] active:scale-95
              ${isCompleted ? 'border-emerald-300 bg-emerald-50' : ''}
              ${isCurrent ? 'border-teal-500 bg-teal-50 shadow-md' : ''}
              ${!isCompleted && !isCurrent ? 'border-slate-200 bg-white hover:border-slate-300' : ''}
              ${isLesson ? 'border-amber-200 bg-amber-50/30 hover:border-amber-300' : ''}
            `}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-slate-800">{level.name}</span>
                  {isCompleted && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  )}
                  {isLesson && (
                    <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">درس</span>
                  )}
                </div>
                <p className="text-sm text-slate-500 font-medium">{level.nameRu}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {isLesson ? 'شرح وأمثلة' : wordsCountLabel(level.pairs.length)}
                </p>
              </div>
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                ${isCompleted ? 'bg-emerald-100 text-emerald-600' : isLesson ? 'bg-amber-100 text-amber-600' : 'bg-teal-100 text-teal-600'}
              `}>
                {isLesson ? <GraduationCap className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
