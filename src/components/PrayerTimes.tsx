import React, { useState, useEffect, useCallback } from 'react';
import { Clock, MapPin, Bell, BellOff, RefreshCw, Sun, Sunrise, Sunset, Moon, Sparkles } from 'lucide-react';
import { getHijriDetails, formatGregorianAr } from '../utils/hijriCalendar';
import { CityOption, PrayerTiming } from '../types';

const POPULAR_CITIES: CityOption[] = [
  { id: 'cairo', nameAr: 'القاهرة', nameEn: 'Cairo', countryAr: 'مصر', countryEn: 'Egypt', lat: 30.0444, lng: 31.2357, method: 5 },
  { id: 'alexandria', nameAr: 'الإسكندرية', nameEn: 'Alexandria', countryAr: 'مصر', countryEn: 'Egypt', lat: 31.2001, lng: 29.9187, method: 5 },
  { id: 'makkah', nameAr: 'مكة المكرمة', nameEn: 'Makkah', countryAr: 'المملكة العربية السعودية', countryEn: 'Saudi Arabia', lat: 21.4225, lng: 39.8262, method: 4 },
  { id: 'madinah', nameAr: 'المدينة المنورة', nameEn: 'Madinah', countryAr: 'المملكة العربية السعودية', countryEn: 'Saudi Arabia', lat: 24.5247, lng: 39.5692, method: 4 },
  { id: 'riyadh', nameAr: 'الرياض', nameEn: 'Riyadh', countryAr: 'المملكة العربية السعودية', countryEn: 'Saudi Arabia', lat: 24.7136, lng: 46.6753, method: 4 },
  { id: 'jerusalem', nameAr: 'القدس الشريف', nameEn: 'Jerusalem', countryAr: 'فلسطين', countryEn: 'Palestine', lat: 31.7683, lng: 35.2137, method: 3 },
  { id: 'dubai', nameAr: 'دبي', nameEn: 'Dubai', countryAr: 'الإمارات العربية المتحدة', countryEn: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, method: 4 },
  { id: 'amman', nameAr: 'عمان', nameEn: 'Amman', countryAr: 'الأردن', countryEn: 'Jordan', lat: 31.9454, lng: 35.9284, method: 3 },
];

interface PrayerTimesProps {
  onNextPrayerChange?: (name: string, time: string) => void;
}

export const PrayerTimes: React.FC<PrayerTimesProps> = ({ onNextPrayerChange }) => {
  const [selectedCity, setSelectedCity] = useState<CityOption>(POPULAR_CITIES[0]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [hijriDate, setHijriDate] = useState<string>('');
  const [gregorianDate, setGregorianDate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  // Default initial timings (approx for Cairo)
  const [timings, setTimings] = useState<PrayerTiming[]>([
    { id: 'fajr', name: 'Fajr', nameAr: 'الفجر', time: '04:22', time12: '04:22 ص', iconName: 'fajr' },
    { id: 'sunrise', name: 'Sunrise', nameAr: 'الشروق', time: '05:49', time12: '05:49 ص', iconName: 'sunrise' },
    { id: 'dhuhr', name: 'Dhuhr', nameAr: 'الظهر', time: '12:01', time12: '12:01 م', iconName: 'dhuhr' },
    { id: 'asr', name: 'Asr', nameAr: 'العصر', time: '15:28', time12: '03:28 م', iconName: 'asr' },
    { id: 'maghrib', name: 'Maghrib', nameAr: 'المغرب', time: '18:13', time12: '06:13 م', iconName: 'maghrib' },
    { id: 'isha', name: 'Isha', nameAr: 'العشاء', time: '19:31', time12: '07:31 م', iconName: 'isha' },
  ]);

  const [nextPrayer, setNextPrayer] = useState<{ nameAr: string; time12: string; time: string; diffSeconds: number } | null>(null);
  const [activePrayerId, setActivePrayerId] = useState<string>('fajr');

  // Format 24h to 12h Arabic
  const format12Hr = (time24: string) => {
    const parts = time24.split(':');
    let h = parseInt(parts[0], 10);
    const m = parts[1];
    const isPm = h >= 12;
    h = h % 12;
    h = h ? h : 12;
    return `${String(h).padStart(2, '0')}:${m} ${isPm ? 'م' : 'ص'}`;
  };

  // Fetch Prayer Times from Aladhan API with fallback
  const fetchPrayerTimes = useCallback(async (city: CityOption) => {
    setLoading(true);
    try {
      const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city.nameEn)}&country=${encodeURIComponent(city.countryEn)}&method=${city.method}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        const t = json.data?.timings;
        const hData = json.data?.date?.hijri;
        if (hData) {
          setHijriDate(`${hData.day} ${hData.month.ar} ${hData.year} هـ`);
        }

        if (t) {
          const list: PrayerTiming[] = [
            { id: 'fajr', name: 'Fajr', nameAr: 'الفجر', time: t.Fajr, time12: format12Hr(t.Fajr), iconName: 'fajr' },
            { id: 'sunrise', name: 'Sunrise', nameAr: 'الشروق', time: t.Sunrise, time12: format12Hr(t.Sunrise), iconName: 'sunrise' },
            { id: 'dhuhr', name: 'Dhuhr', nameAr: 'الظهر', time: t.Dhuhr, time12: format12Hr(t.Dhuhr), iconName: 'dhuhr' },
            { id: 'asr', name: 'Asr', nameAr: 'العصر', time: t.Asr, time12: format12Hr(t.Asr), iconName: 'asr' },
            { id: 'maghrib', name: 'Maghrib', nameAr: 'المغرب', time: t.Maghrib, time12: format12Hr(t.Maghrib), iconName: 'maghrib' },
            { id: 'isha', name: 'Isha', nameAr: 'العشاء', time: t.Isha, time12: format12Hr(t.Isha), iconName: 'isha' },
          ];
          setTimings(list);
        }
      }
    } catch (err) {
      console.warn('Prayer times API fallback in effect', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrayerTimes(selectedCity);
  }, [selectedCity, fetchPrayerTimes]);

  // Live Clock Tick
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setGregorianDate(formatGregorianAr(now));
      if (!hijriDate) {
        setHijriDate(getHijriDetails(now).formatted);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hijriDate]);

  // Calculate Next Prayer & Countdown
  useEffect(() => {
    if (!timings.length) return;

    const now = currentTime;
    const nowSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    const timingsSec = timings.map((t) => {
      const [h, m] = t.time.split(':').map(Number);
      return { ...t, totalSec: h * 3600 + m * 60 };
    });

    let foundNext = null;
    let foundActive = timingsSec[timingsSec.length - 1];

    for (let i = 0; i < timingsSec.length; i++) {
      if (nowSec < timingsSec[i].totalSec) {
        foundNext = timingsSec[i];
        foundActive = i > 0 ? timingsSec[i - 1] : timingsSec[timingsSec.length - 1];
        break;
      }
    }

    if (!foundNext) {
      // After Isha -> Next is tomorrow Fajr
      foundNext = timingsSec[0];
      foundActive = timingsSec[timingsSec.length - 1];
    }

    let diff = foundNext.totalSec - nowSec;
    if (diff < 0) {
      diff += 24 * 3600;
    }

    setNextPrayer({
      nameAr: foundNext.nameAr,
      time12: foundNext.time12,
      time: foundNext.time,
      diffSeconds: diff,
    });
    setActivePrayerId(foundActive.id);

    if (onNextPrayerChange) {
      onNextPrayerChange(foundNext.nameAr, foundNext.time12);
    }
  }, [currentTime, timings, onNextPrayerChange]);

  const formatCountdown = (diffSeconds: number) => {
    const h = Math.floor(diffSeconds / 3600);
    const m = Math.floor((diffSeconds % 3600) / 60);
    const s = diffSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const getPrayerIcon = (id: string) => {
    switch (id) {
      case 'fajr':
        return <Moon className="w-6 h-6 text-indigo-400" />;
      case 'sunrise':
        return <Sunrise className="w-6 h-6 text-amber-400" />;
      case 'dhuhr':
        return <Sun className="w-6 h-6 text-amber-300" />;
      case 'asr':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'maghrib':
        return <Sunset className="w-6 h-6 text-orange-400" />;
      case 'isha':
        return <Moon className="w-6 h-6 text-blue-400" />;
      default:
        return <Clock className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="prayer-times" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>مواقيت الأذان والصلوات الخمس</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-title text-gold-gradient mb-4">
            مواقيت الصلاة اليومية
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            حافظ على صلواتك في أوقاتها المحددة. يتم احتساب الأوقات بدقة فلكية حسب مدينتك المختارة.
          </p>

          {/* City Selector */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card border border-amber-400/20">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-400">المدينة:</span>
              <select
                aria-label="اختر المدينة"
                value={selectedCity.id}
                onChange={(e) => {
                  const c = POPULAR_CITIES.find((x) => x.id === e.target.value);
                  if (c) setSelectedCity(c);
                }}
                className="bg-transparent text-amber-300 text-sm font-semibold focus:outline-none cursor-pointer"
              >
                {POPULAR_CITIES.map((c) => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-slate-100">
                    {c.nameAr} - {c.countryAr}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => fetchPrayerTimes(selectedCity)}
              disabled={loading}
              title="تحديث المواقيت"
              className="p-2.5 rounded-xl glass-card border border-amber-400/20 text-amber-300 hover:bg-amber-400/10 cursor-pointer transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => setNotificationEnabled(!notificationEnabled)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                notificationEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                  : 'glass-card border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {notificationEnabled ? <Bell className="w-3.5 h-3.5 text-emerald-400" /> : <BellOff className="w-3.5 h-3.5" />}
              <span>{notificationEnabled ? 'تنبيه الأذان: مفعّل' : 'تنبيه الأذان: مغلق'}</span>
            </button>
          </div>
        </div>

        {/* Live Clock & Next Prayer Glass Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 mb-10 max-w-4xl mx-auto border-amber-400/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Live Clock & Dates */}
            <div className="text-center md:text-right border-b md:border-b-0 md:border-l border-amber-400/10 pb-6 md:pb-0 md:pl-8">
              <div className="text-4xl sm:text-5xl font-black font-title tracking-wider text-slate-100 mb-2 font-mono">
                {currentTime.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
              </div>
              <div className="flex flex-col gap-1 text-sm text-slate-400">
                <span className="font-medium text-slate-200">{gregorianDate || 'التاريخ الميلادي'}</span>
                <span className="font-quran text-base text-amber-300 font-semibold">{hijriDate || 'التاريخ الهجري'}</span>
              </div>
            </div>

            {/* Next Prayer Countdown */}
            <div className="text-center md:text-right flex flex-col items-center md:items-start justify-center">
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>الصلاة القادمة خلال</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-gold-gradient tracking-widest mb-2">
                {nextPrayer ? formatCountdown(nextPrayer.diffSeconds) : '--:--:--'}
              </div>
              <div className="text-sm font-medium text-slate-300">
                الأذان القادم: <span className="font-bold text-amber-300">{nextPrayer?.nameAr}</span> في تمام{' '}
                <span className="font-bold text-amber-300">{nextPrayer?.time12}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Prayer Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {timings.map((prayer) => {
            const isActive = activePrayerId === prayer.id;
            const isNext = nextPrayer?.nameAr === prayer.nameAr;

            return (
              <div
                key={prayer.id}
                className={`glass-card rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group ${
                  isNext
                    ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-500/10 scale-105'
                    : isActive
                    ? 'border-emerald-500/50 bg-emerald-500/10'
                    : 'glass-card-hover'
                }`}
              >
                {/* Active / Next Badge */}
                {isNext && (
                  <span className="absolute top-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                    القادمة
                  </span>
                )}
                {isActive && !isNext && (
                  <span className="absolute top-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    الحالية
                  </span>
                )}

                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mt-3 mb-3 group-hover:scale-110 transition-transform">
                  {getPrayerIcon(prayer.id)}
                </div>

                <h3 className="font-title font-bold text-base sm:text-lg text-slate-100 mb-1">{prayer.nameAr}</h3>
                <span className="text-xs text-slate-400 mb-2 font-light">{prayer.name}</span>

                <div className="font-mono text-sm sm:text-base font-bold text-amber-300 tracking-wide mt-auto">
                  {prayer.time12}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
