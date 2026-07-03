import type { LearnLang } from './i18n';

export interface AsianPair {
  id: string;
  char: string;       // the character (Hiragana/Hangul/Hanzi)
  roman: string;      // romanization
  arabic: string;     // Arabic pronunciation/meaning
  category: string;
}

export interface GreetingPair {
  id: string;
  target: string;     // the phrase in target language
  roman: string;      // romanization
  arabic: string;     // Arabic translation
  category: string;
}

export interface AsianLanguageData {
  lang: LearnLang;
  lettersTitle: string;
  lettersSubtitle: string;
  letters: AsianPair[];
  greetingsTitle: string;
  greetingsSubtitle: string;
  greetings: GreetingPair[];
}

// ===================== JAPANESE =====================
export const japaneseData: AsianLanguageData = {
  lang: 'ja',
  lettersTitle: 'هيراغانا (Hiragana)',
  lettersSubtitle: 'الحروف الأساسية اليابانية',
  letters: [
    { id: 'h-a', char: 'あ', roman: 'a', arabic: 'آ', category: 'حروف متحركة' },
    { id: 'h-i', char: 'い', roman: 'i', arabic: 'إي', category: 'حروف متحركة' },
    { id: 'h-u', char: 'う', roman: 'u', arabic: 'أو', category: 'حروف متحركة' },
    { id: 'h-e', char: 'え', roman: 'e', arabic: 'إيْ', category: 'حروف متحركة' },
    { id: 'h-o', char: 'お', roman: 'o', arabic: 'أوْ', category: 'حروف متحركة' },
    { id: 'h-ka', char: 'か', roman: 'ka', arabic: 'كا', category: 'حروف ساكنة' },
    { id: 'h-ki', char: 'き', roman: 'ki', arabic: 'كي', category: 'حروف ساكنة' },
    { id: 'h-ku', char: 'く', roman: 'ku', arabic: 'كو', category: 'حروف ساكنة' },
    { id: 'h-ke', char: 'け', roman: 'ke', arabic: 'كيْ', category: 'حروف ساكنة' },
    { id: 'h-ko', char: 'こ', roman: 'ko', arabic: 'كوْ', category: 'حروف ساكنة' },
    { id: 'h-sa', char: 'さ', roman: 'sa', arabic: 'سا', category: 'حروف ساكنة' },
    { id: 'h-shi', char: 'し', roman: 'shi', arabic: 'شي', category: 'حروف ساكنة' },
    { id: 'h-su', char: 'す', roman: 'su', arabic: 'سو', category: 'حروف ساكنة' },
    { id: 'h-se', char: 'せ', roman: 'se', arabic: 'سيْ', category: 'حروف ساكنة' },
    { id: 'h-so', char: 'そ', roman: 'so', arabic: 'سوْ', category: 'حروف ساكنة' },
    { id: 'h-ta', char: 'た', roman: 'ta', arabic: 'تا', category: 'حروف ساكنة' },
    { id: 'h-chi', char: 'ち', roman: 'chi', arabic: 'تشي', category: 'حروف ساكنة' },
    { id: 'h-tsu', char: 'つ', roman: 'tsu', arabic: 'تسو', category: 'حروف ساكنة' },
    { id: 'h-te', char: 'て', roman: 'te', arabic: 'تيْ', category: 'حروف ساكنة' },
    { id: 'h-to', char: 'と', roman: 'to', arabic: 'توْ', category: 'حروف ساكنة' },
    { id: 'h-na', char: 'な', roman: 'na', arabic: 'نا', category: 'حروف ساكنة' },
    { id: 'h-ni', char: 'に', roman: 'ni', arabic: 'ني', category: 'حروف ساكنة' },
    { id: 'h-nu', char: 'ぬ', roman: 'nu', arabic: 'نو', category: 'حروف ساكنة' },
    { id: 'h-ne', char: 'ね', roman: 'ne', arabic: 'نيْ', category: 'حروف ساكنة' },
    { id: 'h-no', char: 'の', roman: 'no', arabic: 'نوْ', category: 'حروف ساكنة' },
    { id: 'h-ha', char: 'は', roman: 'ha', arabic: 'ها', category: 'حروف ساكنة' },
    { id: 'h-hi', char: 'ひ', roman: 'hi', arabic: 'هي', category: 'حروف ساكنة' },
    { id: 'h-fu', char: 'ふ', roman: 'fu', arabic: 'فو', category: 'حروف ساكنة' },
    { id: 'h-he', char: 'へ', roman: 'he', arabic: 'هيْ', category: 'حروف ساكنة' },
    { id: 'h-ho', char: 'ほ', roman: 'ho', arabic: 'هوْ', category: 'حروف ساكنة' },
    { id: 'h-ma', char: 'ま', roman: 'ma', arabic: 'ما', category: 'حروف ساكنة' },
    { id: 'h-mi', char: 'み', roman: 'mi', arabic: 'مي', category: 'حروف ساكنة' },
    { id: 'h-mu', char: 'む', roman: 'mu', arabic: 'مو', category: 'حروف ساكنة' },
    { id: 'h-me', char: 'め', roman: 'me', arabic: 'ميْ', category: 'حروف ساكنة' },
    { id: 'h-mo', char: 'も', roman: 'mo', arabic: 'موْ', category: 'حروف ساكنة' },
    { id: 'h-ya', char: 'や', roman: 'ya', arabic: 'يا', category: 'حروف ساكنة' },
    { id: 'h-yu', char: 'ゆ', roman: 'yu', arabic: 'يو', category: 'حروف ساكنة' },
    { id: 'h-yo', char: 'よ', roman: 'yo', arabic: 'يوْ', category: 'حروف ساكنة' },
    { id: 'h-ra', char: 'ら', roman: 'ra', arabic: 'را', category: 'حروف ساكنة' },
    { id: 'h-ri', char: 'り', roman: 'ri', arabic: 'ري', category: 'حروف ساكنة' },
    { id: 'h-ru', char: 'る', roman: 'ru', arabic: 'رو', category: 'حروف ساكنة' },
    { id: 'h-re', char: 'れ', roman: 're', arabic: 'ريْ', category: 'حروف ساكنة' },
    { id: 'h-ro', char: 'ろ', roman: 'ro', arabic: 'روْ', category: 'حروف ساكنة' },
    { id: 'h-wa', char: 'わ', roman: 'wa', arabic: 'وا', category: 'حروف ساكنة' },
    { id: 'h-wo', char: 'を', roman: 'wo', arabic: 'وو', category: 'حروف ساكنة' },
    { id: 'h-n', char: 'ん', roman: 'n', arabic: 'نْ', category: 'حروف ساكنة' },
  ],
  greetingsTitle: 'التحية والجمل اليومية',
  greetingsSubtitle: 'كلمات يابانية شائعة مترجمة للعربية',
  greetings: [
    { id: 'g-konnichiwa', target: 'こんにちは', roman: 'Konnichiwa', arabic: 'مرحباً / يوم سعيد', category: 'تحية' },
    { id: 'g-ohayou', target: 'おはよう', roman: 'Ohayou', arabic: 'صباح الخير', category: 'تحية' },
    { id: 'g-konbanwa', target: 'こんばんは', roman: 'Konbanwa', arabic: 'مساء الخير', category: 'تحية' },
    { id: 'g-sayounara', target: 'さようなら', roman: 'Sayounara', arabic: 'وداعاً', category: 'تحية' },
    { id: 'g-arigatou', target: 'ありがとう', roman: 'Arigatou', arabic: 'شكراً', category: 'تعبير' },
    { id: 'g-sumimasen', target: 'すみません', roman: 'Sumimasen', arabic: 'عذراً / المعذرة', category: 'تعبير' },
    { id: 'g-hai', target: 'はい', roman: 'Hai', arabic: 'نعم', category: 'إجابة' },
    { id: 'g-iie', target: 'いいえ', roman: 'Iie', arabic: 'لا', category: 'إجابة' },
    { id: 'g-genki', target: '元気ですか', roman: 'Genki desu ka', arabic: 'كيف حالك؟', category: 'سؤال' },
    { id: 'g-watashi', target: '私は学生です', roman: 'Watashi wa gakusei desu', arabic: 'أنا طالب', category: 'جملة' },
    { id: 'g-nihongo', target: '日本語を勉強しています', roman: 'Nihongo o benkyou shiteimasu', arabic: 'أنا أتعلم اليابانية', category: 'جملة' },
    { id: 'g-oishii', target: '美味しい', roman: 'Oishii', arabic: 'لذيذ', category: 'تعبير' },
    { id: 'g-kawaii', target: '可愛い', roman: 'Kawaii', arabic: 'لطيف / جميل', category: 'تعبير' },
    { id: 'g-ganbatte', target: '頑張って', roman: 'Ganbatte', arabic: 'بالتوفيق / اجتهد', category: 'تشجيع' },
    { id: 'g-doko', target: 'トイレはどこですか', roman: 'Toire wa doko desu ka', arabic: 'أين الحمام؟', category: 'سؤال' },
    { id: 'g-ikura', target: 'いくらですか', roman: 'Ikura desu ka', arabic: 'كم السعر؟', category: 'سؤال' },
  ],
};

// ===================== CHINESE =====================
export const chineseData: AsianLanguageData = {
  lang: 'zh',
  lettersTitle: 'بينيين وأحرف أساسية (Pinyin)',
  lettersSubtitle: 'أساسيات النطق الصيني',
  letters: [
    { id: 'c-a', char: '阿', roman: 'ā', arabic: 'آ', category: 'حروف متحركة' },
    { id: 'c-o', char: '哦', roman: 'ō', arabic: 'أو', category: 'حروف متحركة' },
    { id: 'c-e', char: '饿', roman: 'è', arabic: 'إيْ', category: 'حروف متحركة' },
    { id: 'c-i', char: '衣', roman: 'yī', arabic: 'إي', category: 'حروف متحركة' },
    { id: 'c-u', char: '五', roman: 'wǔ', arabic: 'أو', category: 'حروف متحركة' },
    { id: 'c-ba', char: '八', roman: 'bā', arabic: 'با', category: 'مقاطع' },
    { id: 'c-ma', char: '妈', roman: 'mā', arabic: 'ما', category: 'مقاطع' },
    { id: 'c-da', char: '大', roman: 'dà', arabic: 'دا', category: 'مقاطع' },
    { id: 'c-ni', char: '你', roman: 'nǐ', arabic: 'ني', category: 'مقاطع' },
    { id: 'c-hao', char: '好', roman: 'hǎo', arabic: 'هاو', category: 'مقاطع' },
    { id: 'c-shi', char: '是', roman: 'shì', arabic: 'شي', category: 'مقاطع' },
    { id: 'c-wo', char: '我', roman: 'wǒ', arabic: 'وو', category: 'ضمائر' },
    { id: 'c-ren', char: '人', roman: 'rén', arabic: 'رِن', category: 'كلمات' },
    { id: 'c-shui', char: '水', roman: 'shuǐ', arabic: 'شوي', category: 'كلمات' },
    { id: 'c-huo', char: '火', roman: 'huǒ', arabic: 'هوو', category: 'كلمات' },
    { id: 'c-tu', char: '土', roman: 'tǔ', arabic: 'تو', category: 'كلمات' },
    { id: 'c-mu', char: '木', roman: 'mù', arabic: 'مو', category: 'كلمات' },
    { id: 'c-jin', char: '金', roman: 'jīn', arabic: 'جين', category: 'كلمات' },
    { id: 'c-shan', char: '山', roman: 'shān', arabic: 'شان', category: 'كلمات' },
    { id: 'c-tian', char: '天', roman: 'tiān', arabic: 'تيان', category: 'كلمات' },
    { id: 'c-ri', char: '日', roman: 'rì', arabic: 'رِي', category: 'كلمات' },
    { id: 'c-yue', char: '月', roman: 'yuè', arabic: 'يوي', category: 'كلمات' },
    { id: 'c-zhong', char: '中', roman: 'zhōng', arabic: 'جونغ', category: 'كلمات' },
    { id: 'c-guo', char: '国', roman: 'guó', arabic: 'غوو', category: 'كلمات' },
    { id: 'c-xue', char: '学', roman: 'xué', arabic: 'شوي', category: 'كلمات' },
    { id: 'c-sheng', char: '生', roman: 'shēng', arabic: 'شينغ', category: 'كلمات' },
    { id: 'c-jia', char: '家', roman: 'jiā', arabic: 'جيا', category: 'كلمات' },
    { id: 'c-chi', char: '吃', roman: 'chī', arabic: 'تشي', category: 'أفعال' },
    { id: 'c-he', char: '喝', roman: 'hē', arabic: 'هي', category: 'أفعال' },
    { id: 'c-zou', char: '走', roman: 'zǒu', arabic: 'زو', category: 'أفعال' },
  ],
  greetingsTitle: 'التحية والجمل اليومية',
  greetingsSubtitle: 'كلمات صينية شائعة مترجمة للعربية',
  greetings: [
    { id: 'g-nihao', target: '你好', roman: 'Nǐ hǎo', arabic: 'مرحباً', category: 'تحية' },
    { id: 'g-zaoan', target: '早上好', roman: 'Zǎo shang hǎo', arabic: 'صباح الخير', category: 'تحية' },
    { id: 'g-wanan', target: '晚上好', roman: 'Wǎn shang hǎo', arabic: 'مساء الخير', category: 'تحية' },
    { id: 'g-zaijian', target: '再见', roman: 'Zài jiàn', arabic: 'وداعاً', category: 'تحية' },
    { id: 'g-xiexie', target: '谢谢', roman: 'Xiè xie', arabic: 'شكراً', category: 'تعبير' },
    { id: 'g-bukeyqi', target: '不客气', roman: 'Bú kè qi', arabic: 'العفو', category: 'تعبير' },
    { id: 'g-duibuqi', target: '对不起', roman: 'Duì bu qǐ', arabic: 'عذراً', category: 'تعبير' },
    { id: 'g-shide', target: '是的', roman: 'Shì de', arabic: 'نعم', category: 'إجابة' },
    { id: 'g-bu', target: '不是', roman: 'Bú shì', arabic: 'لا', category: 'إجابة' },
    { id: 'g-wojiao', target: '我叫艾哈迈德', roman: 'Wǒ jiào Àhāmòdé', arabic: 'اسمي أحمد', category: 'جملة' },
    { id: 'g-woxue', target: '我学中文', roman: 'Wǒ xué zhōng wén', arabic: 'أنا أتعلم الصينية', category: 'جملة' },
    { id: 'g-duoshao', target: '多少钱', roman: 'Duō shao qián', arabic: 'كم السعر؟', category: 'سؤال' },
    { id: 'g-cezuo', target: '厕所在哪里', roman: 'Cè suǒ zài nǎ lǐ', arabic: 'أين الحمام؟', category: 'سؤال' },
    { id: 'g-chifan', target: '吃饭了没有', roman: 'Chī fàn le méi yǒu', arabic: 'هل أكلت؟', category: 'تحية ودية' },
    { id: 'g-haochi', target: '好吃', roman: 'Hǎo chī', arabic: 'لذيذ', category: 'تعبير' },
    { id: 'g-jiayou', target: '加油', roman: 'Jiā yóu', arabic: 'بالتوفيق / استمر', category: 'تشجيع' },
  ],
};

// ===================== KOREAN =====================
export const koreanData: AsianLanguageData = {
  lang: 'ko',
  lettersTitle: 'هانغول (Hangul)',
  lettersSubtitle: 'الحروف الكورية الأساسية',
  letters: [
    { id: 'k-a', char: '아', roman: 'a', arabic: 'آ', category: 'حروف متحركة' },
    { id: 'k-ya', char: '야', roman: 'ya', arabic: 'يا', category: 'حروف متحركة' },
    { id: 'k-eo', char: '어', roman: 'eo', arabic: 'أو', category: 'حروف متحركة' },
    { id: 'k-yeo', char: '여', roman: 'yeo', arabic: 'يو', category: 'حروف متحركة' },
    { id: 'k-o', char: '오', roman: 'o', arabic: 'أو', category: 'حروف متحركة' },
    { id: 'k-yo', char: '요', roman: 'yo', arabic: 'يو', category: 'حروف متحركة' },
    { id: 'k-u', char: '우', roman: 'u', arabic: 'أو', category: 'حروف متحركة' },
    { id: 'k-yu', char: '유', roman: 'yu', arabic: 'يو', category: 'حروف متحركة' },
    { id: 'k-eu', char: '으', roman: 'eu', arabic: 'أُ', category: 'حروف متحركة' },
    { id: 'k-i', char: '이', roman: 'i', arabic: 'إي', category: 'حروف متحركة' },
    { id: 'k-ga', char: '가', roman: 'ga', arabic: 'غا', category: 'مقاطع' },
    { id: 'k-na', char: '나', roman: 'na', arabic: 'نا', category: 'مقاطع' },
    { id: 'k-da', char: '다', roman: 'da', arabic: 'دا', category: 'مقاطع' },
    { id: 'k-ra', char: '라', roman: 'ra', arabic: 'را', category: 'مقاطع' },
    { id: 'k-ma', char: '마', roman: 'ma', arabic: 'ما', category: 'مقاطع' },
    { id: 'k-ba', char: '바', roman: 'ba', arabic: 'با', category: 'مقاطع' },
    { id: 'k-sa', char: '사', roman: 'sa', arabic: 'سا', category: 'مقاطع' },
    { id: 'k-ja', char: '자', roman: 'ja', arabic: 'جا', category: 'مقاطع' },
    { id: 'k-cha', char: '차', roman: 'cha', arabic: 'تشا', category: 'مقاطع' },
    { id: 'k-ka', char: '카', roman: 'ka', arabic: 'كا', category: 'مقاطع' },
    { id: 'k-ta', char: '타', roman: 'ta', arabic: 'تا', category: 'مقاطع' },
    { id: 'k-pa', char: '파', roman: 'pa', arabic: 'با', category: 'مقاطع' },
    { id: 'k-ha', char: '하', roman: 'ha', arabic: 'ها', category: 'مقاطع' },
    { id: 'k-ane', char: '안녕', roman: 'annyeong', arabic: 'أننيونغ', category: 'كلمات' },
    { id: 'k-saram', char: '사람', roman: 'saram', arabic: 'إنسان', category: 'كلمات' },
    { id: 'k-mul', char: '물', roman: 'mul', arabic: 'ماء', category: 'كلمات' },
    { id: 'k-bap', char: '밥', roman: 'bap', arabic: 'طعام/أرز', category: 'كلمات' },
    { id: 'k-jip', char: '집', roman: 'jip', arabic: 'بيت', category: 'كلمات' },
    { id: 'k-hak', char: '학교', roman: 'hakgyo', arabic: 'مدرسة', category: 'كلمات' },
    { id: 'k-chin', char: '친구', roman: 'chingu', arabic: 'صديق', category: 'كلمات' },
  ],
  greetingsTitle: 'التحية والجمل اليومية',
  greetingsSubtitle: 'كلمات كورية شائعة مترجمة للعربية',
  greetings: [
    { id: 'g-annyeong', target: '안녕하세요', roman: 'Annyeonghaseyo', arabic: 'مرحباً', category: 'تحية' },
    { id: 'g-annyeonghi', target: '안녕히 가세요', roman: 'Annyeonghi gaseyo', arabic: 'وداعاً', category: 'تحية' },
    { id: 'g-gamsa', target: '감사합니다', roman: 'Gamsahamnida', arabic: 'شكراً', category: 'تعبير' },
    { id: 'g-joesong', target: '죄송합니다', roman: 'Joesonghamnida', arabic: 'عذراً', category: 'تعبير' },
    { id: 'g-ye', target: '네', roman: 'Ne', arabic: 'نعم', category: 'إجابة' },
    { id: 'g-anio', target: '아니요', roman: 'Aniyo', arabic: 'لا', category: 'إجابة' },
    { id: 'g-annyeonghaseyo', target: '잘 지내세요', roman: 'Jal jinaeseyo', arabic: 'كيف حالك؟', category: 'سؤال' },
    { id: 'g-ireum', target: '제 이름은 아흐마드입니다', roman: 'Je ireumeun Aheumadeuimnida', arabic: 'اسمي أحمد', category: 'جملة' },
    { id: 'g-hangugeo', target: '저는 한국어를 배워요', roman: 'Jeoneun hangugeoreul baewoyo', arabic: 'أنا أتعلم الكورية', category: 'جملة' },
    { id: 'g-masio', target: '맛있어요', roman: 'Masisseoyo', arabic: 'لذيذ', category: 'تعبير' },
    { id: 'g-hwighting', target: '파이팅', roman: 'Paiting', arabic: 'بالتوفيق / ابدأ', category: 'تشجيع' },
    { id: 'g-eodi', target: '화장실이 어디예요', roman: 'Hwajangsiri eodiyaeyo', arabic: 'أين الحمام؟', category: 'سؤال' },
    { id: 'g-eolma', target: '얼마예요', roman: 'Eolmayeyo', arabic: 'كم السعر؟', category: 'سؤال' },
    { id: 'g-bapmeok', target: '밥 먹었어요', roman: 'Bap meogeosseoyo', arabic: 'هل أكلت؟', category: 'تحية ودية' },
    { id: 'g-sarang', target: '사랑해요', roman: 'Saranghaeyo', arabic: 'أحبك', category: 'تعبير' },
    { id: 'g-jal', target: '잘했어요', roman: 'Jalhaesseoyo', arabic: 'أحسنت', category: 'تشجيع' },
  ],
};

export function getAsianData(lang: LearnLang): AsianLanguageData | null {
  if (lang === 'ja') return japaneseData;
  if (lang === 'zh') return chineseData;
  if (lang === 'ko') return koreanData;
  return null;
}

export function isAsianLang(lang: LearnLang): boolean {
  return lang === 'ja' || lang === 'zh' || lang === 'ko';
}
