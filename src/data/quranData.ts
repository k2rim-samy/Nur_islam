import { Surah } from '../types';

export const QURAN_SURAHS: Surah[] = [
  {
    id: 1,
    nameAr: "الفاتحة",
    nameEn: "Al-Fatiha",
    translation: "فاتحة الكتاب - السبع المثاني",
    type: "Meccan",
    versesCount: 7,
    verses: [
      { num: 1, ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", en: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
      { num: 2, ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", en: "[All] praise is [due] to Allah, Lord of the worlds -" },
      { num: 3, ar: "الرَّحْمَٰنِ الرَّحِيمِ", en: "The Entirely Merciful, the Especially Merciful," },
      { num: 4, ar: "مَالِكِ يَوْمِ الدِّينِ", en: "Sovereign of the Day of Recompense." },
      { num: 5, ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", en: "It is You we worship and You we ask for help." },
      { num: 6, ar: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", en: "Guide us to the straight path -" },
      { num: 7, ar: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", en: "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray." }
    ],
    audioUrl: "https://server8.mp3quran.net/afs/001.mp3"
  },
  {
    id: 67,
    nameAr: "الملك",
    nameEn: "Al-Mulk",
    translation: "المانعة والمنجية من عذاب القبر",
    type: "Meccan",
    versesCount: 5,
    verses: [
      { num: 1, ar: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", en: "Blessed is He in whose hand is dominion, and He is over all things competent -" },
      { num: 2, ar: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ", en: "[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving -" },
      { num: 3, ar: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ", en: "[And] who created seven heavens in layers. You do not see in the creation of the Most Merciful any inconsistency." },
      { num: 4, ar: "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ", en: "Then return [your] vision twice again. [Your] vision will return to you humbled while it is fatigued." },
      { num: 5, ar: "وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ", en: "And We have certainly beautified the nearest heaven with lamps and have made from them particles to throw at the devils." }
    ],
    audioUrl: "https://server8.mp3quran.net/afs/067.mp3"
  },
  {
    id: 18,
    nameAr: "الكهف",
    nameEn: "Al-Kahf",
    translation: "نور ما بين الجمعتين",
    type: "Meccan",
    versesCount: 5,
    verses: [
      { num: 1, ar: "الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا ۜ", en: "[All] praise is [due] to Allah, who has sent down upon His Servant the Book and has not made therein any deviance." },
      { num: 2, ar: "قَيِّمًا لِّيُنذِرَ بَأْسًا شَدِيدًا مِّن لَّدُنْهُ وَيُبَشِّرَ الْمُؤْمِنِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا حَسَنًا", en: "[He has made it] straight, to warn of severe punishment from Him and to give good tidings to the believers." },
      { num: 3, ar: "مَّاكِثِينَ فِيهِ أَبَدًا", en: "In which they will remain forever" },
      { num: 4, ar: "وَيُنذِرَ الَّذِينَ قَالُوا اتَّخَذَ اللَّهُ وَلَدًا", en: "And to warn those who say, 'Allah has taken a son.'" },
      { num: 5, ar: "مَّا لَهُم بِهِ مِنْ عِلْمٍ وَلَا لِآبَائِهِمْ ۚ كَبُرَتْ كَلِمَةً تَخْرُجُ مِنْ أَفْوَاهِهِمْ ۚ إِن يَقُولُونَ إِلَّا كَذِبًا", en: "They have no knowledge of it, nor had their fathers. Grave is the word that comes out of their mouths." }
    ],
    audioUrl: "https://server8.mp3quran.net/afs/018.mp3"
  },
  {
    id: 36,
    nameAr: "يس",
    nameEn: "Yaseen",
    translation: "قلب القرآن",
    type: "Meccan",
    versesCount: 5,
    verses: [
      { num: 1, ar: "يس ۝", en: "Ya, Seen." },
      { num: 2, ar: "وَالْقُرْآنِ الْحَكِيمِ ۝", en: "By the wise Qur'an," },
      { num: 3, ar: "إِنَّكَ لَمِنَ الْمُرْسَلِينَ ۝", en: "Indeed, you, [O Muhammad], are from among the messengers," },
      { num: 4, ar: "عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ ۝", en: "On a straight path." },
      { num: 5, ar: "تَنزِيلَ الْعَزِيزِ الرَّحِيمِ ۝", en: "[This is] a revelation of the Exalted in Might, the Merciful." }
    ],
    audioUrl: "https://server8.mp3quran.net/afs/036.mp3"
  },
  {
    id: 55,
    nameAr: "الرحمن",
    nameEn: "Ar-Rahman",
    translation: "عروس القرآن",
    type: "Medinan",
    versesCount: 6,
    verses: [
      { num: 1, ar: "الرَّحْمَٰنُ ۝", en: "The Most Merciful" },
      { num: 2, ar: "عَلَّمَ الْقُرْآنَ ۝", en: "Taught the Qur'an," },
      { num: 3, ar: "خَلَقَ الْإِنسَانَ ۝", en: "Created man," },
      { num: 4, ar: "عَلَّمَهُ الْبَيَانَ ۝", en: "Taught him eloquent speech." },
      { num: 5, ar: "الشَّمْسُ وَالْقَمَرُ بِحُسْبَانٍ ۝", en: "The sun and the moon [move] by precise calculation," },
      { num: 6, ar: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ ۝", en: "So which of the favors of your Lord would you deny?" }
    ],
    audioUrl: "https://server8.mp3quran.net/afs/055.mp3"
  },
  {
    id: 112,
    nameAr: "الإخلاص",
    nameEn: "Al-Ikhlas",
    translation: "تعدل ثلث القرآن",
    type: "Meccan",
    versesCount: 4,
    verses: [
      { num: 1, ar: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝", en: "Say, 'He is Allah, [who is] One," },
      { num: 2, ar: "اللَّهُ الصَّمَدُ ۝", en: "Allah, the Eternal Refuge." },
      { num: 3, ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ ۝", en: "He neither begets nor is born," },
      { num: 4, ar: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ۝", en: "Nor is there to Him any equivalent.'" }
    ],
    audioUrl: "https://server8.mp3quran.net/afs/112.mp3"
  },
  {
    id: 113,
    nameAr: "الفلق",
    nameEn: "Al-Falaq",
    translation: "المعوّذة الأولى",
    type: "Meccan",
    versesCount: 5,
    verses: [
      { num: 1, ar: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝", en: "Say, 'I seek refuge in the Lord of daybreak," },
      { num: 2, ar: "مِن شَرِّ مَا خَلَقَ ۝", en: "From the evil of that which He created," },
      { num: 3, ar: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝", en: "And from the evil of darkness when it settles," },
      { num: 4, ar: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝", en: "And from the evil of the blowers in knots," },
      { num: 5, ar: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ۝", en: "And from the evil of an envier when he envies.'" }
    ],
    audioUrl: "https://server8.mp3quran.net/afs/113.mp3"
  },
  {
    id: 114,
    nameAr: "الناس",
    nameEn: "An-Nas",
    translation: "المعوّذة الثانية",
    type: "Meccan",
    versesCount: 6,
    verses: [
      { num: 1, ar: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝", en: "Say, 'I seek refuge in the Lord of mankind," },
      { num: 2, ar: "مَلِكِ النَّاسِ ۝", en: "The Sovereign of mankind," },
      { num: 3, ar: "إِلَٰهِ النَّاسِ ۝", en: "The God of mankind," },
      { num: 4, ar: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝", en: "From the evil of the retreating whisperer -" },
      { num: 5, ar: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝", en: "Who whispers into the breasts of mankind -" },
      { num: 6, ar: "مِنَ الْجِنَّةِ وَالنَّاسِ ۝", en: "From among the jinn and mankind.'" }
    ],
    audioUrl: "https://server8.mp3quran.net/afs/114.mp3"
  }
];
