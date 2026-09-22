import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, ChevronLeft, Check, RotateCcw, Copy, Sun, Moon, Shield, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MORNING_ADHKAR, EVENING_ADHKAR, PRAYER_AFTER_ADHKAR, SLEEP_ADHKAR } from '../data/adhkarData';
import { playClickSound, playCelebrationChime } from '../utils/audio';
import { DhikrItem } from '../types';

type CategoryType = 'morning' | 'evening' | 'afterPrayer' | 'sleep';

export const AdhkarStepper: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('morning');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [adhkarCounts, setAdhkarCounts] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nur-islam-adhkar-progress');
      if (saved) {
        setAdhkarCounts(JSON.parse(saved));
      }
    } catch {
      // no-op
    }
  }, []);

  // Save progress
  const saveProgress = (counts: Record<string, number>) => {
    setAdhkarCounts(counts);
    localStorage.setItem('nur-islam-adhkar-progress', JSON.stringify(counts));
  };

  const getCategoryList = (): DhikrItem[] => {
    switch (activeCategory) {
      case 'morning':
        return MORNING_ADHKAR;
      case 'evening':
        return EVENING_ADHKAR;
      case 'afterPrayer':
        return PRAYER_AFTER_ADHKAR;
      case 'sleep':
        return SLEEP_ADHKAR;
      default:
        return MORNING_ADHKAR;
    }
  };

  const currentList = getCategoryList();
  const currentItem = currentList[currentIndex] || currentList[0];

  const itemKey = `${activeCategory}-${currentItem.id}`;
  const currentCount = adhkarCounts[itemKey] || 0;
  const isItemCompleted = currentCount >= currentItem.total;

  // Handle increment
  const handleIncrement = () => {
    if (isItemCompleted) return;

    const nextCount = currentCount + 1;
    const newCounts = { ...adhkarCounts, [itemKey]: nextCount };
    saveProgress(newCounts);

    const completed = nextCount >= currentItem.total;
    playClickSound(completed);

    if (completed) {
      if ('vibrate' in navigator) navigator.vibrate(80);

      // Check if all items in this category are completed!
      const allCompleted = currentList.every((it) => {
        const key = `${activeCategory}-${it.id}`;
        const count = it.id === currentItem.id ? nextCount : adhkarCounts[key] || 0;
        return count >= it.total;
      });

      if (allCompleted) {
        playCelebrationChime();
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#fbbf24', '#fef08a'],
          });
        } catch {
          // no-op
        }
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < currentList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleResetCategory = () => {
    const updated = { ...adhkarCounts };
    currentList.forEach((it) => {
      delete updated[`${activeCategory}-${it.id}`];
    });
    saveProgress(updated);
    setCurrentIndex(0);
  };

  const copyDhikr = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Category progress calculation
  const completedItemsCount = currentList.filter((it) => {
    const key = `${activeCategory}-${it.id}`;
    return (adhkarCounts[key] || 0) >= it.total;
  }).length;

  const totalProgressPercentage = Math.round((completedItemsCount / currentList.length) * 100);

  return (
    <section id="adhkar" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>حصن المسلم اليومي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-title text-gold-gradient mb-4">
            أذكار اليوم والمناسبة
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            حصن نفسك بذكر الله في الصباح والمساء وأدبار الصلوات المكتوبة وعند النوم.
          </p>
        </div>

        {/* Category Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 max-w-3xl mx-auto">
          {[
            { id: 'morning', label: 'أذكار الصباح', icon: Sun },
            { id: 'evening', label: 'أذكار المساء', icon: Moon },
            { id: 'afterPrayer', label: 'أذكار بعد الصلاة', icon: Sparkles },
            { id: 'sleep', label: 'أذكار النوم', icon: Shield },
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id as CategoryType);
                  setCurrentIndex(0);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                    : 'glass-card border-white/5 text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Adhkar Focus Card */}
        <div className="max-w-3xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border-amber-400/25 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[420px]">
          {/* Top Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <Award className="w-3.5 h-3.5" />
                <span>إنجاز الورد: {totalProgressPercentage}%</span>
              </span>
              <span className="font-mono font-bold text-amber-300">
                {currentIndex + 1} / {currentList.length}
              </span>
            </div>

            {/* Smooth Progress Fill Bar */}
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${totalProgressPercentage}%` }}
              />
            </div>

            {/* Dhikr Arabic Text */}
            <div className="text-right my-4">
              <p className="font-quran text-xl sm:text-2xl md:text-3xl leading-loose font-bold text-slate-100 mb-4 select-text">
                {currentItem.text}
              </p>

              {currentItem.virtue && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 mb-2 leading-relaxed">
                  <span className="font-bold ml-1">فضل الذكر:</span>
                  {currentItem.virtue}
                </div>
              )}

              {currentItem.source && (
                <div className="text-[11px] text-slate-400 font-medium">
                  المصدر: {currentItem.source}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Actions & Stepper Controls */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 mt-6">
            {/* Prev Dhikr Button */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl glass-card border border-white/10 text-xs text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-all"
            >
              <ChevronRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            {/* Main Interactive Tap Count Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleIncrement}
                disabled={isItemCompleted}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-mono text-base sm:text-lg font-bold transition-all shadow-lg cursor-pointer transform active:scale-95 ${
                  isItemCompleted
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 cursor-default'
                    : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-amber-500/20 hover:scale-105'
                }`}
              >
                {isItemCompleted ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>تم الذكر ({currentItem.total})</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">{currentCount}</span>
                    <span className="opacity-70">/ {currentItem.total}</span>
                    <span className="font-sans text-xs ml-1 font-semibold">اضغط</span>
                  </>
                )}
              </button>

              <button
                onClick={() => copyDhikr(currentItem.text, currentItem.id)}
                title="نسخ الذكر"
                className="p-3 rounded-xl glass-card hover:bg-white/10 border border-white/10 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
              >
                {copiedId === currentItem.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Next Dhikr Button */}
            <button
              onClick={handleNext}
              disabled={currentIndex === currentList.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl glass-card border border-white/10 text-xs text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-all"
            >
              <span>التالي</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Reset progress button */}
          <div className="mt-4 text-center">
            <button
              onClick={handleResetCategory}
              className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>إعادة تعيين ورد هذا اليوم</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
