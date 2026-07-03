import { Home, RotateCcw, Volume2, BookOpen, Lightbulb, Table2, MessageSquare } from 'lucide-react';
import type { Lesson } from '../data/lessons';
import { useSpeech } from '../hooks/useSpeech';
import type { LearnLang } from '../data/i18n';

interface LessonViewProps {
  lesson: Lesson;
  levelName: string;
  levelSubtitle: string;
  onHome: () => void;
  lang: LearnLang;
}

export default function LessonView({ lesson, levelName, levelSubtitle, onHome, lang }: LessonViewProps) {
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
            <h3 className="text-base font-bold text-slate-800">{levelName}</h3>
            <p className="text-xs text-slate-400">{levelSubtitle}</p>
          </div>
          <div className="w-8 h-8 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-teal-600" />
          </div>
        </div>
      </div>

      {/* Lesson sections */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {lesson.sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm animate-[fadeIn_0.4s_ease-out]"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Section title */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-teal-700">{idx + 1}</span>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-800">{section.title}</h2>
            </div>

            {/* Intro */}
            {section.intro && (
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4 pr-9">
                {section.intro}
              </p>
            )}

            {/* Table */}
            {section.table && (
              <div className="overflow-x-auto mb-4">
                <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-slate-500">
                  <Table2 className="w-3.5 h-3.5" />
                  <span>جدول الشرح</span>
                </div>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-teal-50">
                      {section.table.headers.map((h, i) => (
                        <th
                          key={i}
                          className="text-right py-2.5 px-3 font-semibold text-teal-800 border border-teal-100 first:rounded-r-lg last:rounded-l-lg"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        {row.map((cell, ci) => {
                          const isTargetCol = ci === row.length - 1 || (section.table!.headers.length > 2 && ci >= 1 && ci <= 2);
                          const hasCyrillic = /[а-яА-ЯёЁ]/.test(cell);
                          const hasLatin = /[a-zA-Z]/.test(cell);
                          const isTargetLang = lang === 'ru' ? hasCyrillic : (hasLatin && !hasCyrillic);
                          return (
                            <td
                              key={ci}
                              className="py-2.5 px-3 border border-slate-100 text-slate-700 align-top"
                            >
                              <div className="flex items-center gap-1.5">
                                <span>{cell}</span>
                                {isTargetLang && isTargetCol && (
                                  <button
                                    onClick={() => {
                                      const cleanCell = cell.replace(/\s*—\s*.*/, '').trim();
                                      speak(cleanCell);
                                    }}
                                    className="flex-shrink-0 text-teal-500 hover:text-teal-700 transition-colors cursor-pointer"
                                    title="استمع للنطق"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Examples */}
            {section.examples && section.examples.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-slate-500">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>أمثلة</span>
                </div>
                <div className="space-y-2">
                  {section.examples.map((ex, ei) => (
                    <div
                      key={ei}
                      className="flex items-center justify-between gap-3 bg-slate-50 rounded-lg p-3 border border-slate-100"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800 mb-0.5">{ex.target}</p>
                        <p className="text-xs text-slate-500">{ex.arabic}</p>
                        {ex.note && <p className="text-xs text-amber-600 mt-1">{ex.note}</p>}
                      </div>
                      <button
                        onClick={() => speak(ex.target)}
                        className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-100 hover:bg-teal-200 flex items-center justify-center transition-colors cursor-pointer"
                        title="استمع للنطق"
                      >
                        <Volume2 className="w-4 h-4 text-teal-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {section.tips && section.tips.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 pr-9">
                <div className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-amber-700">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>نصائح</span>
                </div>
                <ul className="space-y-1">
                  {section.tips.map((tip, ti) => (
                    <li key={ti} className="text-xs md:text-sm text-amber-800 leading-relaxed flex items-start gap-1.5">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {/* Back button */}
        <div className="flex justify-center pt-2 pb-4">
          <button
            onClick={onHome}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>العودة للقائمة</span>
          </button>
        </div>
      </div>
    </div>
  );
}
