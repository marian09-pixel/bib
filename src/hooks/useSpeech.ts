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

// Known male voice name keywords per language
const MALE_VOICE_KEYWORDS: Record<string, string[]> = {
  'ru': ['Yuri', 'Pavel', 'male', 'Yuriy', 'Maxim', 'Google русский'],
  'en': ['Daniel', 'Alex', 'David', 'Mark', 'Male', 'Rishi', 'Google US English'],
  'ja': ['Ichiro', 'male', 'Google 日本語', 'Takumi'],
  'zh': ['Kangkang', 'male', '男', 'Google 普通话', 'Yunxi'],
  'ko': ['male', 'Google 한국의', 'Heo', 'Minsoo'],
  'fr': ['Thomas', 'Paul', 'male', 'Google français', 'Henri'],
  'es': ['Jorge', 'Carlos', 'male', 'Google español', 'Mateo', 'Juan'],
};

function getVoiceForLang(voices: SpeechSynthesisVoice[], lang: LearnLang): SpeechSynthesisVoice | null {
  const code = langSpeechCode[lang];
  const prefix = code.split('-')[0];
  const maleKeywords = MALE_VOICE_KEYWORDS[lang] || MALE_VOICE_KEYWORDS['en'] || [];

  // Filter voices matching the language
  const langVoices = voices.filter(v => v.lang === code || v.lang.startsWith(prefix));

  // 1. Try to find a male voice for the language
  for (const keyword of maleKeywords) {
    const match = langVoices.find(v => new RegExp(keyword, 'i').test(v.name));
    if (match) return match;
  }

  // 2. Try any voice with "male" in the name for this language
  const anyMale = langVoices.find(v => /male|man|男|homme/i.test(v.name));
  if (anyMale) return anyMale;

  // 3. Fall back to any voice for this language
  if (langVoices.length) return langVoices[0];

  // 4. Broader search by prefix
  const broader = voices.find(v => new RegExp(prefix, 'i').test(v.lang));
  if (broader) return broader;

  return null;
}

// ===== Google TTS Cloud Fallback =====
const GOOGLE_TTS_LANG: Record<LearnLang, string> = {
  ru: 'ru', en: 'en', ja: 'ja', zh: 'zh-CN', ko: 'ko', fr: 'fr', es: 'es',
};

let audioRef: HTMLAudioElement | null = null;

function playGoogleTTS(text: string, lang: LearnLang): boolean {
  try {
    // Google TTS has a ~200 char limit, split if needed
    const chunks = text.length > 190 ? splitText(text, 190) : [text];

    if (!audioRef) {
      audioRef = new Audio();
    }
    audioRef.pause();

    // Play chunks sequentially
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

// Check if speech synthesis is likely to work (has voices for the language)
function hasVoiceForLang(lang: LearnLang): boolean {
  const voices = loadVoices();
  if (!voices.length) return false;
  const code = langSpeechCode[lang];
  const prefix = code.split('-')[0];
  return voices.some(v => v.lang === code || v.lang.startsWith(prefix));
}

// Per-language rate/pitch for premium male feel
const VOICE_PARAMS: Record<LearnLang, { rate: number; pitch: number }> = {
  ru: { rate: 0.82, pitch: 0.80 },
  en: { rate: 0.88, pitch: 0.85 },
  ja: { rate: 0.78, pitch: 0.80 },
  zh: { rate: 0.78, pitch: 0.80 },
  ko: { rate: 0.82, pitch: 0.82 },
  fr: { rate: 0.85, pitch: 0.80 },
  es: { rate: 0.85, pitch: 0.82 },
};

export function useSpeech(lang: LearnLang = 'ru') {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    // Stop any ongoing audio
    if (audioRef) {
      audioRef.pause();
      audioRef = null;
    }

    // Try Web Speech API first
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      if (synth.speaking) synth.cancel();

      const voices = loadVoices();
      const voice = getVoiceForLang(voices, lang);
      const params = VOICE_PARAMS[lang] || VOICE_PARAMS['en'];

      // If we have a voice for this language, use Web Speech API
      if (voice || hasVoiceForLang(lang)) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langSpeechCode[lang];
        if (voice) utterance.voice = voice;
        utterance.rate = params.rate;
        utterance.pitch = params.pitch;  // Lower pitch for deep male voice
        utterance.volume = 1;

        // Fallback to Google TTS if speech synthesis fails
        utterance.onerror = () => {
          playGoogleTTS(text, lang);
        };

        utteranceRef.current = utterance;

        // Small timeout helps with mobile Safari
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

    // No voice available — use Google TTS cloud fallback
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
    // Try to load voices immediately
    const voices = synth.getVoices();
    if (voices.length) {
      voicesCache = voices;
    }
    // Some browsers need a trigger
    synth.getVoices();
  }
}
