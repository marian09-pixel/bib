import { useState, useEffect, useCallback } from 'react';

export type FontSize = 'sm' | 'md' | 'lg';

const STORAGE_KEY = 'learnlang_fontsize';
const TIMER_KEY = 'learnlang_besttimes';

const FONT_CLASSES: Record<FontSize, { card: string; char: string; arabic: string; roman: string }> = {
  sm: { card: 'text-xs', char: 'text-base', arabic: 'text-xs', roman: 'text-[10px]' },
  md: { card: 'text-base', char: 'text-2xl', arabic: 'text-base', roman: 'text-sm' },
  lg: { card: 'text-lg', char: 'text-3xl', arabic: 'text-lg', roman: 'text-base' },
};

export function getFontClasses(size: FontSize) {
  return FONT_CLASSES[size];
}

export function useSettings() {
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as FontSize | null;
      return saved && ['sm', 'md', 'lg'].includes(saved) ? saved : 'md';
    } catch {
      return 'md';
    }
  });

  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, fontSize); } catch { /* ignore */ }
  }, [fontSize]);

  const changeFontSize = useCallback((size: FontSize) => {
    setFontSize(size);
  }, []);

  return { fontSize, changeFontSize, settingsOpen, setSettingsOpen };
}

export function getBestTime(unitId: string, lang: string): number | null {
  try {
    const data = JSON.parse(localStorage.getItem(TIMER_KEY) || '{}');
    return data[`${lang}_${unitId}`] ?? null;
  } catch {
    return null;
  }
}

export function saveBestTime(unitId: string, lang: string, time: number): boolean {
  try {
    const data = JSON.parse(localStorage.getItem(TIMER_KEY) || '{}');
    const key = `${lang}_${unitId}`;
    const current = data[key] ?? Infinity;
    if (time < current) {
      data[key] = time;
      localStorage.setItem(TIMER_KEY, JSON.stringify(data));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
