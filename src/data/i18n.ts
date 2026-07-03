export type LearnLang = 'ru' | 'en';

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
  russianDesc: string;
  englishDesc: string;
  start: string;
  targetLangName: string;
}

export const ui: Record<LearnLang, UIStrings> = {
  ru: {
    appTitle: 'تعلم الروسية',
    appSubtitle: 'لعبة المطابقة',
    matchGame: 'لعبة المطابقة',
    matchDesc: () => 'اربط الكلمات العربية بمعانيها الروسية',
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
    footer: 'تعلم اللغة الروسية - تمرّن واستمتع',
    wordsCount: (n) => `${n} كلمات`,
    changeLang: 'تغيير اللغة',
    welcome: 'مرحباً بك',
    chooseLang: 'اختر لغتك المفضلة للتعلم',
    chooseLangDesc: 'ابدأ رحلتك في تعلم لغة جديدة',
    russian: 'اللغة الروسية',
    english: 'اللغة الإنجليزية',
    russianDesc: 'تعلم الروسية بطريقة تفاعلية ممتعة',
    englishDesc: 'تعلم الإنجليزية بطريقة تفاعلية ممتعة',
    start: 'ابدأ التعلم',
    targetLangName: 'الروسية',
  },
  en: {
    appTitle: 'تعلم الإنجليزية',
    appSubtitle: 'لعبة المطابقة',
    matchGame: 'لعبة المطابقة',
    matchDesc: () => 'اربط الكلمات العربية بمعانيها الإنجليزية',
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
    footer: 'تعلم اللغة الإنجليزية - تمرّن واستمتع',
    wordsCount: (n) => `${n} كلمات`,
    changeLang: 'تغيير اللغة',
    welcome: 'مرحباً بك',
    chooseLang: 'اختر لغتك المفضلة للتعلم',
    chooseLangDesc: 'ابدأ رحلتك في تعلم لغة جديدة',
    russian: 'اللغة الروسية',
    english: 'اللغة الإنجليزية',
    russianDesc: 'تعلم الروسية بطريقة تفاعلية ممتعة',
    englishDesc: 'تعلم الإنجليزية بطريقة تفاعلية ممتعة',
    start: 'ابدأ التعلم',
    targetLangName: 'الإنجليزية',
  },
};
