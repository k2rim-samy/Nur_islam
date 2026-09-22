import React from 'react';
import { Heart, ChevronUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-amber-400/15 bg-black/40 pt-12 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand Info */}
          <div className="text-center md:text-right flex items-center gap-3 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/40 bg-slate-900 flex-shrink-0 shadow-md shadow-amber-500/15">
              <img
                src="/falcon.jpg"
                alt="شعار الصقر"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <div className="text-2xl font-bold font-title text-gold-gradient mb-0.5">
                بوابة نور الإسلام الرقمية
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                البوابة الرقمية الشاملة للقرآن الكريم، مواقيت الصلاة، الأذكار اليومية والسبحة الإلكترونية.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
            <button onClick={() => scrollTo('prayer-times')} className="hover:text-amber-300 cursor-pointer">
              مواقيت الصلاة
            </button>
            <button onClick={() => scrollTo('quran')} className="hover:text-amber-300 cursor-pointer">
              القرآن الكريم
            </button>
            <button onClick={() => scrollTo('hadith')} className="hover:text-amber-300 cursor-pointer">
              الحديث الشريف
            </button>
            <button onClick={() => scrollTo('tasbeeh')} className="hover:text-amber-300 cursor-pointer">
              السبحة
            </button>
            <button onClick={() => scrollTo('adhkar')} className="hover:text-amber-300 cursor-pointer">
              الأذكار
            </button>
            <button onClick={() => scrollTo('calendar')} className="hover:text-amber-300 cursor-pointer">
              التقويم
            </button>
            <button onClick={() => scrollTo('qibla')} className="hover:text-amber-300 cursor-pointer">
              القبلة
            </button>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl glass-card hover:bg-white/10 border border-white/10 text-amber-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs"
          >
            <span>للأعلى</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        {/* Spiritual Blessing & Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div className="flex items-center gap-1 font-quran text-sm text-amber-300/90">
            <span>« اللَّهُمَّ اجْعَلْ هَذَا الْعَمَلَ خَالِصاً لِوَجْهِكَ الْكَرِيمِ »</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>تم التطوير والإعداد بواسطة</span>
            <span className="text-amber-300 font-bold">كريم سامي</span>
            <span>• جميع الحقوق محفوظة {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
