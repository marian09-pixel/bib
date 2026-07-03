import { useCallback, useRef } from 'react';
import type { LearnLang } from '../data/i18n';
import { langSpeechCode } from '../data/i18n';

let voicesCache: SpeechSynthesisVoice[] | null = null;

function loadVoices(): SpeechSynthesisVoice[] {
  if (voicesCache) return voicesCache;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) {
    voicesCache = voices;
    return voices;
  }
  return [];
}

function getVoiceForLang(voices: SpeechSynthesisVoice[], lang: LearnLang): SpeechSynthesisVoice | null {
  const code = langSpeechCode[lang];
  const prefix = code.split('-')[0];
  return (
    voices.find((v) => v.lang === code) ||
    voices.find((v) => v.lang.startsWith(prefix)) ||
    voices.find((v) => new RegExp(prefix, 'i').test(v.lang)) ||
    null
  );
}

export function useSpeech(lang: LearnLang = 'ru') {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;

    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
    }

    const voices = loadVoices();
    const voice = getVoiceForLang(voices, lang);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langSpeechCode[lang];
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = lang === 'ja' || lang === 'zh' ? 0.75 : 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;

    utteranceRef.current = utterance;
    synth.speak(utterance);
  }, [lang]);

  return { speak };
}

export function initVoices() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      voicesCache = window.speechSynthesis.getVoices();
    };
    if (window.speechSynthesis.getVoices().length) {
      voicesCache = window.speechSynthesis.getVoices();
    }
  }
}
