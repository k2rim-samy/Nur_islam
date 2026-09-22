import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Copy, Check, Quote, Bookmark } from 'lucide-react';
import { INITIAL_WISDOMS } from '../data/wisdomData';
import { Wisdom } from '../types';

export const HadithSection: React.FC = () => {
  const [wisdoms, setWisdoms] = useState<Wisdom[]>(INITIAL_WISDOMS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Try to load any additional wisdoms from wisdom.json if available
  useEffect(() => {
    fetch('/wisdom.json')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.wisdoms) && data.wisdoms.length > 0) {
          setWisdoms(data.wisdoms);
        }
      })
      .catch(() => {
        // Fallback to embedded wisdoms
      });
  }, []);

  const currentHadith = wisdoms[currentIndex] || INITIAL_WISDOMS[0];

  const handleNextHadith = () => {
    setCurrentIndex((prev) => (prev + 1) % wisdoms.length);
  };

  const handleRandomHadith = () => {
    const nextIdx = Math.floor(Math.random() * wisdoms.length);
    setCurrentIndex(nextIdx);
  };

  const copyHadith = () => {
    const textToCopy = `${currentHadith.ar}\n"${currentHadith.en}"\n- ${currentHadith.source}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hadith" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>السنة النبوية المطهرة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-title text-gold-gradient mb-4">
            الحديث الشريف والحكم النبوية
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            تأمل في جوامع كلم الحبيب المصطفى ﷺ وهديه المبارك في تزكية النفوس ومكارم الأخلاق.
          </p>
        </div>

        {/* Featured Hadith Plaque */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 sm:p-12 border-amber-400/25 shadow-2xl relative overflow-hidden mb-12">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 right-4 text-amber-400/20">
            <Quote className="w-16 h-16 rotate-180" />
          </div>
          <div className="absolute bottom-4 left-4 text-emerald-400/20">
            <Quote className="w-16 h-16" />
          </div>

          <div className="relative z-10 text-center flex flex-col items-center">
            {/* Category / Source Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-6">
              <Bookmark className="w-3.5 h-3.5" />
              <span>حديث اليوم الشريف</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-300 font-bold">{currentHadith.source}</span>
            </div>

            {/* Arabic Hadith Text */}
            <p className="font-quran text-2xl sm:text-3xl md:text-4xl leading-loose font-bold text-slate-100 mb-6 max-w-3xl">
              {currentHadith.ar}
            </p>

            {/* English Translation */}
            {currentHadith.en && (
              <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed max-w-2xl italic mb-8 border-t border-white/10 pt-4">
                "{currentHadith.en}"
              </p>
            )}

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-amber-400/10 w-full">
              <button
                onClick={handleRandomHadith}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <RefreshCw className="w-4 h-4" />
                <span>حديث آخر</span>
              </button>

              <button
                onClick={copyHadith}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card hover:bg-white/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم النسخ بنجاح' : 'نسخ الحديث'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Selected Wisdoms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {wisdoms.slice(0, 3).map((w, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-2xl p-5 border-amber-400/15 flex flex-col justify-between"
            >
              <p className="font-quran text-lg font-bold text-amber-200 leading-relaxed mb-4">
                {w.ar}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-3">
                <span className="text-emerald-400 font-semibold">{w.source}</span>
                {w.category && <span className="bg-white/5 px-2 py-0.5 rounded-md">{w.category}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
