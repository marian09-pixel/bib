import { useCallback, useRef } from 'react';
import type { LearnLang } from '../data/i18n';
import { langSpeechCode } from '../data/i18n';

let voicesCache: SpeechSynthesisVoice[] | null = null;

function loadVoices(): SpeechSynthesisVoice[] {
  if (voicesCache && voicesCache.length) return voicesCache;
  const voices = window.speechSynthesis?.getVoices();
  if (voices && voices.length) {
    voicesCache = voices;
    return voices;
  }
  return [];
}

// Known male voice name keywords per language — expanded for better detection
const MALE_VOICE_KEYWORDS: Record<string, string[]> = {
  'ru': ['Yuri', 'Pavel', 'Yuriy', 'Maxim', 'Dmitri', 'Google русский', 'male', 'Максим', 'Юрий'],
  'en': ['Daniel', 'Alex', 'David', 'Mark', 'Rishi', 'Google US English', 'male', 'Guy', 'Arthur'],
  'ja': ['Ichiro', 'Takumi', 'Google 日本語', 'male', '男', 'オトコ'],
  'zh': ['Kangkang', 'Yunxi', 'Google 普通话', 'male', '男', 'Yunfeng', 'Yunjian'],
  'ko': ['Heo', 'Minsoo', 'Google 한국의', 'male', '남', '현'],
  'fr': ['Thomas', 'Paul', 'Henri', 'Google français', 'male', 'homme'],
  'es': ['Jorge', 'Carlos', 'Mateo', 'Juan', 'Google español', 'male', 'hombre'],
  'tr': ['Tolga', 'Google Türkçe', 'male', 'erkek'],
};

// Languages that MUST use deep male voice (force low pitch even on female-only devices)
const FORCE_MALE_LANGS = new Set(['ru', 'ja', 'zh', 'ko', 'tr']);

// Female voice keywords to AVOID when looking for male
const FEMALE_KEYWORDS = /female|woman|女|femme|femmina|жен|kadın|zhen/i;

function getVoiceForLang(voices: SpeechSynthesisVoice[], lang: LearnLang): SpeechSynthesisVoice | null {
  const code = langSpeechCode[lang];
  const prefix = code.split('-')[0];
  const maleKeywords = MALE_VOICE_KEYWORDS[lang] || MALE_VOICE_KEYWORDS['en'] || [];

  // Filter voices matching the language
  const langVoices = voices.filter(v => v.lang === code || v.lang.startsWith(prefix));
  const nonFemaleVoices = langVoices.filter(v => !FEMALE_KEYWORDS.test(v.name));

  // 1. Try exact male voice keyword match (excluding known female voices)
  for (const keyword of maleKeywords) {
    const match = nonFemaleVoices.find(v => new RegExp(keyword, 'i').test(v.name));
    if (match) return match;
  }

  // 2. Try any voice with "male/man/男/homme/erkek" in the name
  const anyMale = langVoices.find(v => /male|man|男|homme|erkek/i.test(v.name));
  if (anyMale) return anyMale;

  // 3. For force-male languages: prefer non-female voices
  if (FORCE_MALE_LANGS.has(lang) && nonFemaleVoices.length) {
    return nonFemaleVoices[0];
  }

  // 4. Fall back to any voice for this language
  if (langVoices.length) return langVoices[0];

  // 5. Broader search by prefix
  const broader = voices.find(v => new RegExp(prefix, 'i').test(v.lang));
  if (broader) return broader;

  return null;
}

// ===== Google TTS Cloud Fallback =====
const GOOGLE_TTS_LANG: Record<LearnLang, string> = {
  ru: 'ru', en: 'en', ja: 'ja', zh: 'zh-CN', ko: 'ko', fr: 'fr', es: 'es', tr: 'tr',
};

let audioRef: HTMLAudioElement | null = null;

function playGoogleTTS(text: string, lang: LearnLang): boolean {
  try {
    const chunks = text.length > 190 ? splitText(text, 190) : [text];

    if (!audioRef) {
      audioRef = new Audio();
    }
    audioRef.pause();

    let chunkIndex = 0;
    const playNext = () => {
      if (chunkIndex >= chunks.length) return;
      const chunk = chunks[chunkIndex];
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=${GOOGLE_TTS_LANG[lang]}&total=1&idx=0&textlen=${chunk.length}&client=tw-ob`;
      if (audioRef) {
        audioRef.src = url;
        audioRef.onended = () => { chunkIndex++; playNext(); };
        audioRef.onerror = () => { /* silently fail */ };
        audioRef.play().catch(() => { /* autoplay blocked */ });
      }
    };
    playNext();
    return true;
  } catch {
    return false;
  }
}

function splitText(text: string, maxLen: number): string[] {
  const chunks: string[] = [];
  let current = '';
  for (const word of text.split(' ')) {
    if ((current + ' ' + word).length > maxLen) {
      if (current) chunks.push(current);
      current = word;
    } else {
      current = current ? current + ' ' + word : word;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

function hasVoiceForLang(lang: LearnLang): boolean {
  const voices = loadVoices();
  if (!voices.length) return false;
  const code = langSpeechCode[lang];
  const prefix = code.split('-')[0];
  return voices.some(v => v.lang === code || v.lang.startsWith(prefix));
}

// Per-language voice params — force-male langs get extra-low pitch
const VOICE_PARAMS: Record<LearnLang, { rate: number; pitch: number }> = {
  ru: { rate: 0.80, pitch: 0.60 },   // Deep bass for Russian
  en: { rate: 0.88, pitch: 0.85 },
  ja: { rate: 0.75, pitch: 0.60 },   // Deep bass for Japanese
  zh: { rate: 0.75, pitch: 0.60 },   // Deep bass for Chinese
  ko: { rate: 0.78, pitch: 0.60 },   // Deep bass for Korean
  fr: { rate: 0.85, pitch: 0.80 },
  es: { rate: 0.85, pitch: 0.82 },
  tr: { rate: 0.82, pitch: 0.65 },   // Deep male for Turkish
};

export function useSpeech(lang: LearnLang = 'ru') {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    if (audioRef) {
      audioRef.pause();
      audioRef = null;
    }

    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      if (synth.speaking) synth.cancel();

      const voices = loadVoices();
      const voice = getVoiceForLang(voices, lang);
      const params = VOICE_PARAMS[lang] || VOICE_PARAMS['en'];

      if (voice || hasVoiceForLang(lang)) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langSpeechCode[lang];
        if (voice) utterance.voice = voice;
        utterance.rate = params.rate;
        utterance.pitch = params.pitch;   // Forced low pitch for deep male voice
        utterance.volume = 1;

        utterance.onerror = () => {
          playGoogleTTS(text, lang);
        };

        utteranceRef.current = utterance;

        setTimeout(() => {
          try {
            synth.speak(utterance);
          } catch {
            playGoogleTTS(text, lang);
          }
        }, 50);
        return;
      }
    }

    playGoogleTTS(text, lang);
  }, [lang]);

  return { speak };
}

export function initVoices() {
  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;
    synth.onvoiceschanged = () => {
      voicesCache = synth.getVoices();
    };
    const voices = synth.getVoices();
    if (voices.length) {
      voicesCache = voices;
    }
    synth.getVoices();
  }
}
