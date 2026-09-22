import React, { useState, useEffect } from 'react';
import { Heart, RotateCcw, Volume2, VolumeX, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playCelebrationChime } from '../utils/audio';

interface DhikrPreset {
  id: string;
  nameAr: string;
  nameEn: string;
  goal: number;
}

const PRESETS: DhikrPreset[] = [
  { id: 'subhanallah', nameAr: 'سُبْحَانَ اللَّهِ', nameEn: "Subhan'Allah", goal: 33 },
  { id: 'alhamdulillah', nameAr: 'الْحَمْدُ لِلَّهِ', nameEn: 'Alhamdulillah', goal: 33 },
  { id: 'allahuakbar', nameAr: 'اللَّهُ أَكْبَرُ', nameEn: 'Allahu Akbar', goal: 33 },
  { id: 'lailahaillallah', nameAr: 'لَا إِلَهَ إِلَّا اللَّهُ', nameEn: 'La Ilaha Illa Allah', goal: 100 },
  { id: 'astaghfirullah', nameAr: 'أَسْتَغْفِرُ اللَّهَ', nameEn: 'Astaghfirullah', goal: 100 },
  { id: 'lahawla', nameAr: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', nameEn: 'La Hawla Wa La Quwwata', goal: 33 },
  { id: 'salawat', nameAr: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', nameEn: 'Salawat on Prophet (PBUH)', goal: 100 },
];

export const TasbeehCounter: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<DhikrPreset>(() => {
    const savedId = localStorage.getItem('nur-islam-tasbeeh-preset');
    return PRESETS.find((p) => p.id === savedId) || PRESETS[0];
  });

  const [count, setCount] = useState<number>(() => {
    return parseInt(localStorage.getItem('nur-islam-tasbeeh-count') || '0', 10);
  });

  const [totalLaps, setTotalLaps] = useState<number>(() => {
    return parseInt(localStorage.getItem('nur-islam-tasbeeh-laps') || '0', 10);
  });

  const [isMuted, setIsMuted] = useState<boolean>(() => {
    return localStorage.getItem('nur-islam-tasbeeh-muted') === 'true';
  });

  const [customGoal, setCustomGoal] = useState<number>(selectedPreset.goal);
  const [isRippleActive, setIsRippleActive] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('nur-islam-tasbeeh-count', count.toString());
    localStorage.setItem('nur-islam-tasbeeh-laps', totalLaps.toString());
    localStorage.setItem('nur-islam-tasbeeh-preset', selectedPreset.id);
    localStorage.setItem('nur-islam-tasbeeh-muted', isMuted.toString());
  }, [count, totalLaps, selectedPreset, isMuted]);

  // Handle preset change
  const handleSelectPreset = (preset: DhikrPreset) => {
    setSelectedPreset(preset);
    setCustomGoal(preset.goal);
    setCount(0);
    playClickSound(false, isMuted);
  };

  // Increment click
  const handleIncrement = () => {
    const nextCount = count + 1;
    const isGoalReached = nextCount % customGoal === 0;

    setIsRippleActive(true);
    setTimeout(() => setIsRippleActive(false), 200);

    if (isGoalReached) {
      setTotalLaps((prev) => prev + 1);
      playClickSound(true, isMuted);
      playCelebrationChime();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#fbbf24', '#10b981', '#34d399', '#fef08a'],
        });
      } catch {
        // no-op
      }
    } else {
      playClickSound(false, isMuted);
    }

    setCount(nextCount);

    if ('vibrate' in navigator) {
      navigator.vibrate(isGoalReached ? [50, 50, 50] : 30);
    }
  };

  // Reset counter
  const handleReset = () => {
    setCount(0);
    playClickSound(false, isMuted);
  };

  // Circular progress calculations (Radius = 110, circumference = 2 * PI * 110 ≈ 691.15)
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min((count % customGoal) / customGoal, 1);
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <section id="tasbeeh" className="py-20 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>ألا بذكر الله تطمئن القلوب</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-title text-gold-gradient mb-4">
            السبحة الإلكترونية التفاعلية
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            سبحة رقمية متطورة بمؤثرات لمسية وصوتية لتسبيح خاشع ومتابعة إنجاز الأذكار.
          </p>
        </div>

        {/* Main Tasbeeh Widget */}
        <div className="max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border-amber-400/25 shadow-2xl flex flex-col items-center">
          {/* Active Dhikr Display */}
          <div className="text-center mb-6">
            <h3 className="font-quran text-3xl sm:text-4xl font-bold text-amber-200 mb-2">
              {selectedPreset.nameAr}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light">{selectedPreset.nameEn}</p>
          </div>

          {/* Large Circular Interactive Dial */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-4 flex items-center justify-center">
            {/* SVG Circle Progress Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 260 260">
              {/* Background track circle */}
              <circle
                cx="130"
                cy="130"
                r={radius}
                className="stroke-white/10 fill-transparent"
                strokeWidth="12"
              />
              {/* Animated Progress circle */}
              <circle
                cx="130"
                cy="130"
                r={radius}
                className="stroke-amber-400 fill-transparent transition-all duration-300 ease-out"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Tap Button */}
            <button
              onClick={handleIncrement}
              aria-label="تسبيح"
              className={`absolute inset-4 rounded-full glass-card border border-amber-400/30 flex flex-col items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer shadow-inner shadow-amber-500/10 group ${
                isRippleActive ? 'bg-amber-400/20' : 'hover:bg-white/5'
              }`}
            >
              <span className="font-mono text-5xl sm:text-6xl font-black text-slate-100 group-hover:text-amber-300 transition-colors">
                {count}
              </span>
              <span className="text-xs font-semibold text-emerald-400 mt-2 flex items-center gap-1">
                <span>الهدف:</span>
                <span className="font-mono font-bold text-amber-300">{customGoal}</span>
              </span>
              <span className="text-[10px] text-slate-400 mt-1">اضغط للتسبيح</span>
            </button>
          </div>

          {/* Laps & Stats Bar */}
          <div className="flex items-center justify-center gap-6 my-4 w-full py-2 border-y border-white/5">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>الدورات المكتملة:</span>
              <span className="font-mono font-bold text-emerald-400">{totalLaps}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>المجموع الكلي:</span>
              <span className="font-mono font-bold text-amber-300">{count + totalLaps * customGoal}</span>
            </div>
          </div>

          {/* Control Buttons (Reset & Sound) */}
          <div className="flex items-center gap-3 mt-2 mb-6">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl glass-card hover:bg-white/10 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              <span>تصفير العداد</span>
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                !isMuted
                  ? 'bg-amber-400/15 text-amber-300 border-amber-400/30'
                  : 'glass-card border-slate-700 text-slate-400'
              }`}
            >
              {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isMuted ? 'الصوت: صامت' : 'الصوت: مفعّل'}</span>
            </button>
          </div>

          {/* Dhikr Presets Buttons */}
          <div className="w-full">
            <div className="text-xs text-slate-400 mb-2 font-medium text-right">اختر الذكر المفضل:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESETS.map((p) => {
                const isActive = selectedPreset.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p)}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                      isActive
                        ? 'bg-amber-400/25 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10'
                        : 'glass-card hover:bg-white/5 border-white/5 text-slate-300'
                    }`}
                  >
                    <div className="font-quran text-sm">{p.nameAr}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{p.goal} مرة</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
