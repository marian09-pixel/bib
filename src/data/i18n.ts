export type LearnLang = 'ru' | 'en' | 'ja' | 'zh' | 'ko' | 'fr' | 'es';
export type NativeLang = 'ar' | 'fr' | 'en' | 'ru';

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
  french: string;
  spanish: string;
  russianDesc: string;
  englishDesc: string;
  japaneseDesc: string;
  chineseDesc: string;
  koreanDesc: string;
  frenchDesc: string;
  spanishDesc: string;
  start: string;
  targetLangName: string;
  letters: string;
  lettersDesc: string;
  greetings: string;
  greetingsDesc: string;
  matchLetter: string;
  matchLetterDesc: string;
  listen: string;
  showMore: string;
  showLess: string;
  browse: string;
  game: string;
  practice: string;
  whatMeaning: string;
  practiceDone: string;
  correct: string;
  retry2: string;
  back: string;
  score: string;
  newRecord: string;
  bestTime: string;
  fontSize: string;
  small: string;
  medium: string;
  large: string;
  displaySettings: string;
  nativeLangTitle: string;
  nativeLangDesc: string;
  arabic: string;
  languagesCount: string;
}

function makeStrings(s: Partial<UIStrings> & {
  appTitle: string; matchDesc: (l: string) => string; footer: string; targetLangName: string;
  russianDesc: string; englishDesc: string; japaneseDesc: string; chineseDesc: string;
  koreanDesc: string; frenchDesc: string; spanishDesc: string;
}): UIStrings {
  return { ...s } as UIStrings;
}

// ===== Arabic UI (default) =====
const arStrings: UIStrings = {
  appTitle: '', appSubtitle: 'لعبة المطابقة', matchGame: 'لعبة المطابقة',
  matchDesc: () => '', levels: 'مستويات', bestStreak: 'أفضل تتابع',
  home: 'القائمة', restart: 'إعادة', matches: 'مطابقة', outOfTries: 'انتهت المحاولات!',
  retry: 'إعادة المحاولة', menu: 'القائمة', streak: 'تتابع', bonus: 'مكافأة',
  levelScore: 'نقاط المستوى', wellDone: 'أحسنت!',
  completedLevel: (name) => `أكملت مستوى ${name}`, points: 'النقاط', time: 'الوقت',
  bestStreakLabel: 'أفضل تتابع', mistakes: 'الأخطاء',
  nextLevel: (name) => `المستوى التالي: ${name}`, backToMenu: 'العودة للقائمة',
  footer: '', wordsCount: (n) => `${n} كلمات`, changeLang: 'تغيير اللغة',
  welcome: 'مرحباً بك', chooseLang: 'اختر لغتك المفضلة للتعلم',
  chooseLangDesc: 'ابدأ رحلتك في تعلم لغة جديدة',
  russian: 'اللغة الروسية', english: 'اللغة الإنجليزية', japanese: 'اللغة اليابانية',
  chinese: 'اللغة الصينية', korean: 'اللغة الكورية', french: 'اللغة الفرنسية',
  spanish: 'اللغة الإسبانية',
  russianDesc: 'تعلم الروسية بطريقة تفاعلية ممتعة', englishDesc: 'تعلم الإنجليزية بطريقة تفاعلية ممتعة',
  japaneseDesc: 'تعلم اليابانية بطريقة تفاعلية ممتعة', chineseDesc: 'تعلم الصينية بطريقة تفاعلية ممتعة',
  koreanDesc: 'تعلم الكورية بطريقة تفاعلية ممتعة', frenchDesc: 'تعلم الفرنسية بطريقة تفاعلية ممتعة',
  spanishDesc: 'تعلم الإسبانية بطريقة تفاعلية ممتعة',
  start: 'ابدأ التعلم', targetLangName: '',
  letters: 'الحروف الأساسية', lettersDesc: 'تعلّم الحروف بالنطق واللعب',
  greetings: 'التحية والجمل اليومية', greetingsDesc: 'كلمات شائعة مترجمة للعربية',
  matchLetter: 'لعبة مطابقة الحروف', matchLetterDesc: 'اربط الحرف بنطقه العربي',
  listen: 'استمع', showMore: 'عرض المزيد', showLess: 'عرض أقل',
  browse: 'تصفح', game: 'لعبة', practice: 'تمرين',
  whatMeaning: 'ما معنى هذه الكلمة؟', practiceDone: 'انتهى التمرين!',
  correct: 'صحيح', retry2: 'إعادة', back: 'رجوع', score: 'النقاط',
  newRecord: 'رقم قياسي جديد!', bestTime: 'أفضل وقت',
  fontSize: 'حجم الخط', small: 'صغير', medium: 'متوسط', large: 'كبير',
  displaySettings: 'إعدادات العرض',
  nativeLangTitle: 'اختر لغتك الأم', nativeLangDesc: 'اختر اللغة التي تريد عرض التطبيق بها',
  arabic: 'العربية', languagesCount: '7 لغات',
};

// ===== French UI =====
const frStrings: UIStrings = {
  ...arStrings,
  appSubtitle: 'Jeu de correspondance', matchGame: 'Jeu de correspondance',
  levels: 'Niveaux', bestStreak: 'Meilleure série', home: 'Menu', restart: 'Recommencer',
  matches: 'correspondance', outOfTries: 'Tentatives épuisées!', retry: 'Réessayer',
  menu: 'Menu', streak: 'série', bonus: 'bonus', levelScore: 'Score du niveau',
  wellDone: 'Bravo!', completedLevel: (name) => `Niveau ${name} terminé`,
  points: 'Points', time: 'Temps', bestStreakLabel: 'Meilleure série', mistakes: 'Erreurs',
  nextLevel: (name) => `Niveau suivant: ${name}`, backToMenu: 'Retour au menu',
  wordsCount: (n) => `${n} mots`, changeLang: 'Changer de langue',
  welcome: 'Bienvenue', chooseLang: 'Choisissez la langue à apprendre',
  chooseLangDesc: 'Commencez votre voyage d\'apprentissage',
  russian: 'Russe', english: 'Anglais', japanese: 'Japonais', chinese: 'Chinois',
  korean: 'Coréen', french: 'Français', spanish: 'Espagnol',
  russianDesc: 'Apprenez le russe de manière interactive', englishDesc: 'Apprenez l\'anglais de manière interactive',
  japaneseDesc: 'Apprenez le japonais de manière interactive', chineseDesc: 'Apprenez le chinois de manière interactive',
  koreanDesc: 'Apprenez le coréen de manière interactive', frenchDesc: 'Apprenez le français de manière interactive',
  spanishDesc: 'Apprenez l\'espagnol de manière interactive',
  start: 'Commencer', targetLangName: '',
  letters: 'Lettres de base', lettersDesc: 'Apprenez les lettres avec le son',
  greetings: 'Salutations', greetingsDesc: 'Phrases courantes traduites',
  matchLetter: 'Jeu de correspondance', matchLetterDesc: 'Associez les lettres',
  listen: 'Écouter', showMore: 'Voir plus', showLess: 'Voir moins',
  browse: 'Parcourir', game: 'Jeu', practice: 'Exercice',
  whatMeaning: 'Que veut dire ce mot?', practiceDone: 'Exercice terminé!',
  correct: 'correct', retry2: 'Recommencer', back: 'Retour', score: 'Score',
  newRecord: 'Nouveau record!', bestTime: 'Meilleur temps',
  fontSize: 'Taille du texte', small: 'Petit', medium: 'Moyen', large: 'Grand',
  displaySettings: 'Paramètres d\'affichage',
  nativeLangTitle: 'Choisissez votre langue', nativeLangDesc: 'Choisissez la langue de l\'interface',
  arabic: 'Arabe', languagesCount: '7 langues',
};

// ===== English UI =====
const enStrings: UIStrings = {
  ...arStrings,
  appSubtitle: 'Matching Game', matchGame: 'Matching Game',
  levels: 'Levels', bestStreak: 'Best Streak', home: 'Menu', restart: 'Restart',
  matches: 'matches', outOfTries: 'Out of tries!', retry: 'Try again',
  menu: 'Menu', streak: 'streak', bonus: 'bonus', levelScore: 'Level Score',
  wellDone: 'Well done!', completedLevel: (name) => `Completed ${name}`,
  points: 'Points', time: 'Time', bestStreakLabel: 'Best Streak', mistakes: 'Mistakes',
  nextLevel: (name) => `Next: ${name}`, backToMenu: 'Back to menu',
  wordsCount: (n) => `${n} words`, changeLang: 'Change language',
  welcome: 'Welcome', chooseLang: 'Choose a language to learn',
  chooseLangDesc: 'Start your language learning journey',
  russian: 'Russian', english: 'English', japanese: 'Japanese', chinese: 'Chinese',
  korean: 'Korean', french: 'French', spanish: 'Spanish',
  russianDesc: 'Learn Russian interactively', englishDesc: 'Learn English interactively',
  japaneseDesc: 'Learn Japanese interactively', chineseDesc: 'Learn Chinese interactively',
  koreanDesc: 'Learn Korean interactively', frenchDesc: 'Learn French interactively',
  spanishDesc: 'Learn Spanish interactively',
  start: 'Start learning', targetLangName: '',
  letters: 'Basic Letters', lettersDesc: 'Learn letters with sound',
  greetings: 'Greetings', greetingsDesc: 'Common phrases translated',
  matchLetter: 'Letter Matching', matchLetterDesc: 'Match letters to sounds',
  listen: 'Listen', showMore: 'Show more', showLess: 'Show less',
  browse: 'Browse', game: 'Game', practice: 'Practice',
  whatMeaning: 'What does this word mean?', practiceDone: 'Practice complete!',
  correct: 'correct', retry2: 'Retry', back: 'Back', score: 'Score',
  newRecord: 'New record!', bestTime: 'Best time',
  fontSize: 'Font size', small: 'Small', medium: 'Medium', large: 'Large',
  displaySettings: 'Display settings',
  nativeLangTitle: 'Choose your native language', nativeLangDesc: 'Select the interface language',
  arabic: 'Arabic', languagesCount: '7 languages',
};

// ===== Russian UI =====
const ruStrings: UIStrings = {
  ...arStrings,
  appSubtitle: 'Игра на совпадение', matchGame: 'Игра на совпадение',
  levels: 'Уровни', bestStreak: 'Лучшая серия', home: 'Меню', restart: 'Заново',
  matches: 'совпадение', outOfTries: 'Попытки закончились!', retry: 'Попробовать снова',
  menu: 'Меню', streak: 'серия', bonus: 'бонус', levelScore: 'Очки уровня',
  wellDone: 'Молодец!', completedLevel: (name) => `Уровень ${name} завершён`,
  points: 'Очки', time: 'Время', bestStreakLabel: 'Лучшая серия', mistakes: 'Ошибки',
  nextLevel: (name) => `Следующий: ${name}`, backToMenu: 'В меню',
  wordsCount: (n) => `${n} слов`, changeLang: 'Сменить язык',
  welcome: 'Добро пожаловать', chooseLang: 'Выберите язык для изучения',
  chooseLangDesc: 'Начните своё путешествие в изучении языков',
  russian: 'Русский', english: 'Английский', japanese: 'Японский', chinese: 'Китайский',
  korean: 'Корейский', french: 'Французский', spanish: 'Испанский',
  russianDesc: 'Учите русский интерактивно', englishDesc: 'Учите английский интерактивно',
  japaneseDesc: 'Учите японский интерактивно', chineseDesc: 'Учите китайский интерактивно',
  koreanDesc: 'Учите корейский интерактивно', frenchDesc: 'Учите французский интерактивно',
  spanishDesc: 'Учите испанский интерактивно',
  start: 'Начать', targetLangName: '',
  letters: 'Базовые буквы', lettersDesc: 'Учите буквы со звуком',
  greetings: 'Приветствия', greetingsDesc: 'Общие фразы с переводом',
  matchLetter: 'Игра на совпадение', matchLetterDesc: 'Сопоставьте буквы со звуком',
  listen: 'Слушать', showMore: 'Показать больше', showLess: 'Показать меньше',
  browse: 'Обзор', game: 'Игра', practice: 'Упражнение',
  whatMeaning: 'Что значит это слово?', practiceDone: 'Упражнение завершено!',
  correct: 'правильно', retry2: 'Заново', back: 'Назад', score: 'Очки',
  newRecord: 'Новый рекорд!', bestTime: 'Лучшее время',
  fontSize: 'Размер шрифта', small: 'Малый', medium: 'Средний', large: 'Большой',
  displaySettings: 'Настройки экрана',
  nativeLangTitle: 'Выберите ваш язык', nativeLangDesc: 'Выберите язык интерфейса',
  arabic: 'Арабский', languagesCount: '7 языков',
};

export const nativeUi: Record<NativeLang, UIStrings> = {
  ar: arStrings,
  fr: frStrings,
  en: enStrings,
  ru: ruStrings,
};

export const nativeLangFlag: Record<NativeLang, string> = {
  ar: '🇩🇿',
  fr: '🇫🇷',
  en: '🇬🇧',
  ru: '🇷🇺',
};

export const nativeLangLabel: Record<NativeLang, string> = {
  ar: 'العربية',
  fr: 'Français',
  en: 'English',
  ru: 'Русский',
};

// Per-learn-lang overrides for appTitle, matchDesc, footer, targetLangName
function learnLangOverrides(lang: LearnLang, native: NativeLang): Pick<UIStrings, 'appTitle' | 'matchDesc' | 'footer' | 'targetLangName'> {
  const names: Record<LearnLang, { ar: string; fr: string; en: string }> = {
    ru: { ar: 'تعلم الروسية', fr: 'Apprendre le russe', en: 'Learn Russian' },
    en: { ar: 'تعلم الإنجليزية', fr: 'Apprendre l\'anglais', en: 'Learn English' },
    ja: { ar: 'تعلم اليابانية', fr: 'Apprendre le japonais', en: 'Learn Japanese' },
    zh: { ar: 'تعلم الصينية', fr: 'Apprendre le chinois', en: 'Learn Chinese' },
    ko: { ar: 'تعلم الكورية', fr: 'Apprendre le coréen', en: 'Learn Korean' },
    fr: { ar: 'تعلم الفرنسية', fr: 'Apprendre le français', en: 'Learn French' },
    es: { ar: 'تعلم الإسبانية', fr: 'Apprendre l\'espagnol', en: 'Learn Spanish' },
  };
  const n = names[lang][native];
  const descAr = `اربط الكلمات بمعانيها`;
  const descFr = `Associez les mots à leurs significations`;
  const descEn = `Match words to their meanings`;
  const footerAr = `تعلم اللغة - تمرّن واستمتع`;
  const footerFr = `Apprenez la langue - entraînez-vous et amusez-vous`;
  const footerEn = `Learn the language - practice and enjoy`;
  return {
    appTitle: n,
    matchDesc: () => native === 'fr' ? descFr : native === 'en' ? descEn : descAr,
    footer: native === 'fr' ? footerFr : native === 'en' ? footerEn : footerAr,
    targetLangName: n,
  };
}

export function getUi(lang: LearnLang, native: NativeLang): UIStrings {
  const base = nativeUi[native];
  return { ...base, ...learnLangOverrides(lang, native) };
}

// Legacy export for backward compat (uses Arabic)
export const ui: Record<LearnLang, UIStrings> = {
  ru: { ...arStrings, ...learnLangOverrides('ru', 'ar') },
  en: { ...arStrings, ...learnLangOverrides('en', 'ar') },
  ja: { ...arStrings, ...learnLangOverrides('ja', 'ar') },
  zh: { ...arStrings, ...learnLangOverrides('zh', 'ar') },
  ko: { ...arStrings, ...learnLangOverrides('ko', 'ar') },
  fr: { ...arStrings, ...learnLangOverrides('fr', 'ar') },
  es: { ...arStrings, ...learnLangOverrides('es', 'ar') },
};

export const langFlag: Record<LearnLang, string> = {
  ru: '🇷🇺', en: '🇬🇧', ja: '🇯🇵', zh: '🇨🇳', ko: '🇰🇷', fr: '🇫🇷', es: '🇲🇽',
};

export const langSpeechCode: Record<LearnLang, string> = {
  ru: 'ru-RU', en: 'en-US', ja: 'ja-JP', zh: 'zh-CN', ko: 'ko-KR', fr: 'fr-FR', es: 'es-MX',
};
