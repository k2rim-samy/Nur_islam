import React, { useState, useEffect } from 'react';
import { Quote, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface QuoteItem {
  text: string;
  author: string;
  source: string;
}

const QUOTES: QuoteItem[] = [
  {
    text: "«لَوْ أَنَّكُمْ تَتَوَكَّلُونَ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ لَرَزَقَكُمْ كَمَا يَرْزُقُ الطَّيْرَ؛ تَغْدُو خِمَاصاً وَتَرُوحُ بِطَاناً»",
    author: "رسول الله ﷺ",
    source: "رواه الترمذي وصححه الألباني",
  },
  {
    text: "«إِنَّمَا الصَّبْرُ عِنْدَ الصَّدْمَةِ الأُولَى»",
    author: "رسول الله ﷺ",
    source: "صحيح البخاري",
  },
  {
    text: "«مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْداً بِعَفْوٍ إِلاَّ عِزّاً»",
    author: "رسول الله ﷺ",
    source: "صحيح مسلم",
  },
  {
    text: "«أَحْسِنْ إِلَى مَنْ أَسَاءَ إِلَيْكَ، وَاعْفُ عَمَّنْ ظَلَمَكَ، وَصِلْ مَنْ قَطَعَكَ»",
    author: "الحسن البصري رحمه الله",
    source: "موعظة إيمانية",
  },
  {
    text: "«مَنْ تَرَكَ شَيْئاً لِلَّهِ عَوَّضَهُ اللَّهُ خَيْراً مِنْهُ»",
    author: "ابن القيم رحمه الله",
    source: "مدارج السالكين",
  },
];

export const QuotesSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % QUOTES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
  };

  const currentQuote = QUOTES[activeIndex];

  return (
    <section id="quotes" className="py-20 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>نور البصيرة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-title text-gold-gradient mb-4">
            حكم ومواعظ إيمانية
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            درر مضيئة وكلمات تضيء القلوب من مشكاة النبوة وسير السلف الصالح.
          </p>
        </div>

        {/* Carousel Slide Card */}
        <div className="max-w-3xl mx-auto glass-card rounded-3xl p-8 sm:p-12 border-amber-400/20 shadow-2xl relative flex flex-col items-center text-center min-h-[300px] justify-between">
          <Quote className="w-12 h-12 text-amber-400/25 mb-4" />

          {/* Quote Text */}
          <div className="flex-1 flex flex-col justify-center my-2">
            <p className="font-quran text-xl sm:text-2xl md:text-3xl leading-loose font-bold text-slate-100 mb-4 transition-all duration-300">
              {currentQuote.text}
            </p>
            <div className="text-sm font-semibold text-emerald-400">
              {currentQuote.author} <span className="text-slate-400 text-xs font-normal">({currentQuote.source})</span>
            </div>
          </div>

          {/* Carousel Navigation Bar */}
          <div className="flex items-center justify-between w-full pt-6 border-t border-white/5 mt-6">
            <button
              onClick={handlePrev}
              title="السابق"
              className="p-2 rounded-xl glass-card hover:bg-white/10 text-slate-300 hover:text-amber-300 cursor-pointer transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {QUOTES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`الشريحة ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              title="التالي"
              className="p-2 rounded-xl glass-card hover:bg-white/10 text-slate-300 hover:text-amber-300 cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
