import React from 'react';
import { Clock, BookOpen, Heart, Sparkles, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background with Mosque silhouette and dark gradient overlay */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src="/mosque_hero_bg.png"
          alt="Mosque Silhouette"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transform filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a05]/80 via-[#050a05]/90 to-[#050a05]" />
        {/* Soft radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Bismillah Calligraphy Banner */}
        <div className="mb-6 inline-flex flex-col items-center animate-pulse-slow">
          <div className="px-6 py-2.5 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-md shadow-lg shadow-amber-500/5">
            <span className="font-quran text-2xl sm:text-3xl text-gold-gradient font-bold tracking-wider">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
          </div>
        </div>

        {/* Hero Badge with Falcon Emblem */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium mb-4 shadow-lg shadow-amber-500/10">
          <img
            src="/falcon.jpg"
            alt="شعار الصقر"
            className="w-5 h-5 rounded-full object-cover border border-amber-400/50"
          />
          <span>مرحباً بكم في بوابة نور الإسلام الرقمية الشاملة</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-title tracking-tight mb-6 leading-tight">
          <span className="text-gold-gradient">نور الإسلام</span>{' '}
          <span className="text-emerald-400">الرقمي</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
          تابع مواقيت الصلاة الدقيقة، وتصفح القرآن الكريم بتلاوات مرتلة تفاعلية، واقرأ الأحاديث الشريفة وأذكار الصباح والمساء مع السبحة الإلكترونية والتقويم الهجري المنسق.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => scrollTo('prayer-times')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Clock className="w-5 h-5 text-slate-950" />
            <span>مواقيت الصلاة المباشرة</span>
          </button>

          <button
            onClick={() => scrollTo('quran')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-amber-200 glass-card hover:bg-amber-400/10 border border-amber-400/30 hover:border-amber-400/60 shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>تصفح القرآن الكريم</span>
          </button>

          <button
            onClick={() => scrollTo('tasbeeh')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-emerald-300 glass-card hover:bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400/60 transition-all cursor-pointer"
          >
            <Heart className="w-4 h-4 text-emerald-400" />
            <span>السبحة الإلكترونية</span>
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
          {[
            { title: 'مواقيت الصلاة', desc: 'تحديث حي وعدّ تنازلي دقيق', icon: Clock, target: 'prayer-times' },
            { title: 'المصحف المرتل', desc: 'تلاوات صوتية عطرة ونصوص عثمانية', icon: BookOpen, target: 'quran' },
            { title: 'أذكار وحصن المسلم', desc: 'أذكار الصباح والمساء والصلوات', icon: Sparkles, target: 'adhkar' },
            { title: 'السبحة الذكية', desc: 'عداد تفاعلي وأهداف مخصصة', icon: Heart, target: 'tasbeeh' },
          ].map((feat, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(feat.target)}
              className="glass-card glass-card-hover p-4 rounded-2xl text-right flex flex-col justify-between cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <feat.icon className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <div className="font-bold text-slate-100 text-sm mb-1">{feat.title}</div>
                <div className="text-xs text-slate-400 font-light leading-relaxed">{feat.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <button
          onClick={() => scrollTo('prayer-times')}
          aria-label="الانتقال إلى مواقيت الصلاة"
          className="mt-12 text-slate-400 hover:text-amber-400 transition-colors animate-bounce cursor-pointer"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};
