export type LearnLang = 'ru' | 'en' | 'ja' | 'zh' | 'ko';

export interface UIStrings {
  appTitle: string;
  appSubtitle: string;
  matchGame: string;
  matchDesc: (lang: string) => string;
  levels: string;
  bestStreak: string;
  home: string;
  restart: string;
  matches: string;
  outOfTries: string;
  retry: string;
  menu: string;
  streak: string;
  bonus: string;
  levelScore: string;
  wellDone: string;
  completedLevel: (name: string) => string;
  points: string;
  time: string;
  bestStreakLabel: string;
  mistakes: string;
  nextLevel: (name: string) => string;
  backToMenu: string;
  footer: string;
  wordsCount: (n: number) => string;
  changeLang: string;
  welcome: string;
  chooseLang: string;
  chooseLangDesc: string;
  russian: string;
  english: string;
  japanese: string;
  chinese: string;
  korean: string;
  russianDesc: string;
  englishDesc: string;
  japaneseDesc: string;
  chineseDesc: string;
  koreanDesc: string;
  start: string;
  targetLangName: string;
  // Asian panel strings
  letters: string;
  lettersDesc: string;
  greetings: string;
  greetingsDesc: string;
  matchLetter: string;
  matchLetterDesc: string;
  listen: string;
  showMore: string;
  showLess: string;
}

const baseStrings: Omit<UIStrings, 'appTitle' | 'matchDesc' | 'footer' | 'targetLangName' | 'russianDesc' | 'englishDesc' | 'japaneseDesc' | 'chineseDesc' | 'koreanDesc'> = {
  appSubtitle: 'لعبة المطابقة',
  matchGame: 'لعبة المطابقة',
  levels: 'مستويات',
  bestStreak: 'أفضل تتابع',
  home: 'القائمة',
  restart: 'إعادة',
  matches: 'مطابقة',
  outOfTries: 'انتهت المحاولات!',
  retry: 'إعادة المحاولة',
  menu: 'القائمة',
  streak: 'تتابع',
  bonus: 'مكافأة',
  levelScore: 'نقاط المستوى',
  wellDone: 'أحسنت!',
  completedLevel: (name) => `أكملت مستوى ${name}`,
  points: 'النقاط',
  time: 'الوقت',
  bestStreakLabel: 'أفضل تتابع',
  mistakes: 'الأخطاء',
  nextLevel: (name) => `المستوى التالي: ${name}`,
  backToMenu: 'العودة للقائمة',
  wordsCount: (n) => `${n} كلمات`,
  changeLang: 'تغيير اللغة',
  welcome: 'مرحباً بك',
  chooseLang: 'اختر لغتك المفضلة للتعلم',
  chooseLangDesc: 'ابدأ رحلتك في تعلم لغة جديدة',
  russian: 'اللغة الروسية',
  english: 'اللغة الإنجليزية',
  japanese: 'اللغة اليابانية',
  chinese: 'اللغة الصينية',
  korean: 'اللغة الكورية',
  start: 'ابدأ التعلم',
  letters: 'الحروف الأساسية',
  lettersDesc: 'تعلّم الحروف بالنطق واللعب',
  greetings: 'التحية والجمل اليومية',
  greetingsDesc: 'كلمات شائعة مترجمة للعربية',
  matchLetter: 'لعبة مطابقة الحروف',
  matchLetterDesc: 'اربط الحرف بنطقه العربي',
  listen: 'استمع',
  showMore: 'عرض المزيد',
  showLess: 'عرض أقل',
};

export const ui: Record<LearnLang, UIStrings> = {
  ru: {
    ...baseStrings,
    appTitle: 'تعلم الروسية',
    matchDesc: () => 'اربط الكلمات العربية بمعانيها الروسية',
    footer: 'تعلم اللغة الروسية - تمرّن واستمتع',
    targetLangName: 'الروسية',
    russianDesc: 'تعلم الروسية بطريقة تفاعلية ممتعة',
    englishDesc: 'تعلم الإنجليزية بطريقة تفاعلية ممتعة',
    japaneseDesc: 'تعلم اليابانية بطريقة تفاعلية ممتعة',
    chineseDesc: 'تعلم الصينية بطريقة تفاعلية ممتعة',
    koreanDesc: 'تعلم الكورية بطريقة تفاعلية ممتعة',
  },
  en: {
    ...baseStrings,
    appTitle: 'تعلم الإنجليزية',
    matchDesc: () => 'اربط الكلمات العربية بمعانيها الإنجليزية',
    footer: 'تعلم اللغة الإنجليزية - تمرّن واستمتع',
    targetLangName: 'الإنجليزية',
    russianDesc: 'تعلم الروسية بطريقة تفاعلية ممتعة',
    englishDesc: 'تعلم الإنجليزية بطريقة تفاعلية ممتعة',
    japaneseDesc: 'تعلم اليابانية بطريقة تفاعلية ممتعة',
    chineseDesc: 'تعلم الصينية بطريقة تفاعلية ممتعة',
    koreanDesc: 'تعلم الكورية بطريقة تفاعلية ممتعة',
  },
  ja: {
    ...baseStrings,
    appTitle: 'تعلم اليابانية',
    matchDesc: () => 'اربط الحروف اليابانية بنطقها العربي',
    footer: 'تعلم اللغة اليابانية - تمرّن واستمتع',
    targetLangName: 'اليابانية',
    russianDesc: 'تعلم الروسية بطريقة تفاعلية ممتعة',
    englishDesc: 'تعلم الإنجليزية بطريقة تفاعلية ممتعة',
    japaneseDesc: 'تعلم اليابانية بطريقة تفاعلية ممتعة',
    chineseDesc: 'تعلم الصينية بطريقة تفاعلية ممتعة',
    koreanDesc: 'تعلم الكورية بطريقة تفاعلية ممتعة',
  },
  zh: {
    ...baseStrings,
    appTitle: 'تعلم الصينية',
    matchDesc: () => 'اربط الحروف الصينية بنطقها العربي',
    footer: 'تعلم اللغة الصينية - تمرّن واستمتع',
    targetLangName: 'الصينية',
    russianDesc: 'تعلم الروسية بطريقة تفاعلية ممتعة',
    englishDesc: 'تعلم الإنجليزية بطريقة تفاعلية ممتعة',
    japaneseDesc: 'تعلم اليابانية بطريقة تفاعلية ممتعة',
    chineseDesc: 'تعلم الصينية بطريقة تفاعلية ممتعة',
    koreanDesc: 'تعلم الكورية بطريقة تفاعلية ممتعة',
  },
  ko: {
    ...baseStrings,
    appTitle: 'تعلم الكورية',
    matchDesc: () => 'اربط الحروف الكورية بنطقها العربي',
    footer: 'تعلم اللغة الكورية - تمرّن واستمتع',
    targetLangName: 'الكورية',
    russianDesc: 'تعلم الروسية بطريقة تفاعلية ممتعة',
    englishDesc: 'تعلم الإنجليزية بطريقة تفاعلية ممتعة',
    japaneseDesc: 'تعلم اليابانية بطريقة تفاعلية ممتعة',
    chineseDesc: 'تعلم الصينية بطريقة تفاعلية ممتعة',
    koreanDesc: 'تعلم الكورية بطريقة تفاعلية ممتعة',
  },
};

export const langFlag: Record<LearnLang, string> = {
  ru: '🇷🇺',
  en: '🇬🇧',
  ja: '🇯🇵',
  zh: '🇨🇳',
  ko: '🇰🇷',
};

export const langSpeechCode: Record<LearnLang, string> = {
  ru: 'ru-RU',
  en: 'en-US',
  ja: 'ja-JP',
  zh: 'zh-CN',
  ko: 'ko-KR',
};
