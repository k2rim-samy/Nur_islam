import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronRight, ChevronLeft, Sparkles, Moon, Sun } from 'lucide-react';
import { GREGORIAN_MONTHS_AR, ARABIC_DAYS, getHijriDetails, ISLAMIC_EVENTS_MAP } from '../utils/hijriCalendar';

export const IslamicCalendar: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-indexed
  const [selectedDayEvent, setSelectedDayEvent] = useState<{ titleAr: string; titleEn: string; desc: string } | null>(null);

  const today = new Date();

  // Days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayWeekday = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDayEvent(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDayEvent(null);
  };

  // Preceding empty slots
  const emptySlots = Array.from({ length: firstDayWeekday });

  // Current month's Hijri overview
  const middleOfMonthDate = new Date(currentYear, currentMonth, 15);
  const midHijri = getHijriDetails(middleOfMonthDate);

  return (
    <section id="calendar" className="py-20 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-semibold mb-3">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>التقويم والتاريخ الإسلامي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-title text-gold-gradient mb-4">
            التقويم الهجري والميلادي
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            استعرض الأيام بالتقويمين الهجري والميلادي مع تسليط الضوء على المناسبات الدينية والأعياد الإسلامية المباركة.
          </p>
        </div>

        {/* Calendar Card */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border-amber-400/25 shadow-2xl">
          {/* Calendar Navigation & Month Title */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-3">
                <span>{GREGORIAN_MONTHS_AR[currentMonth]} {currentYear}</span>
                <span className="text-amber-400 text-lg font-quran font-bold">
                  ({midHijri.monthName} {midHijri.year} هـ)
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                اليوم: {today.getDate()} {GREGORIAN_MONTHS_AR[today.getMonth()]} {today.getFullYear()} م الموافق {getHijriDetails(today).formatted}
              </div>
            </div>

            {/* Prev / Next Month Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                title="الشهر السابق"
                className="p-2.5 rounded-xl glass-card hover:bg-white/10 border border-white/10 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setCurrentYear(today.getFullYear());
                  setCurrentMonth(today.getMonth());
                }}
                className="px-3 py-2 rounded-xl text-xs font-semibold glass-card hover:bg-white/10 border border-white/10 text-amber-300 cursor-pointer"
              >
                اليوم
              </button>

              <button
                onClick={handleNextMonth}
                title="الشهر التالي"
                className="p-2.5 rounded-xl glass-card hover:bg-white/10 border border-white/10 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-3 text-center">
            {ARABIC_DAYS.map((day, idx) => (
              <div
                key={idx}
                className="text-xs sm:text-sm font-bold text-amber-300/80 py-2 border-b border-white/5"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty Slots */}
            {emptySlots.map((_, idx) => (
              <div key={`empty-${idx}`} className="h-16 sm:h-20 rounded-xl bg-white/[0.01]" />
            ))}

            {/* Days of Month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateObj = new Date(currentYear, currentMonth, dayNum);
              const hijri = getHijriDetails(dateObj);
              const eventKey = `${hijri.month}-${hijri.day}`;
              const event = ISLAMIC_EVENTS_MAP[eventKey];

              const isToday =
                today.getFullYear() === currentYear &&
                today.getMonth() === currentMonth &&
                today.getDate() === dayNum;

              return (
                <div
                  key={dayNum}
                  onClick={() => event && setSelectedDayEvent(event)}
                  className={`h-16 sm:h-20 rounded-xl p-1.5 sm:p-2 flex flex-col justify-between transition-all duration-200 cursor-pointer relative overflow-hidden border ${
                    isToday
                      ? 'border-amber-400 bg-amber-400/20 shadow-md shadow-amber-500/10'
                      : event
                      ? 'border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20'
                      : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs sm:text-sm font-mono font-bold ${
                        isToday ? 'text-amber-300' : 'text-slate-200'
                      }`}
                    >
                      {dayNum}
                    </span>

                    {/* Hijri Day */}
                    <span className="text-[10px] sm:text-xs font-quran text-slate-400 font-semibold">
                      {hijri.day}
                    </span>
                  </div>

                  {/* Event Indicator */}
                  {event && (
                    <div className="truncate text-[9px] sm:text-[10px] text-emerald-300 font-semibold flex items-center gap-0.5 mt-auto">
                      <Sparkles className="w-2.5 h-2.5 flex-shrink-0 text-amber-400" />
                      <span className="truncate">{event.titleAr}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Event Detail Popup / Banner */}
          {selectedDayEvent && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 flex items-start justify-between gap-3 animate-fade-in">
              <div>
                <div className="flex items-center gap-2 font-bold text-amber-300 text-sm mb-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{selectedDayEvent.titleAr} ({selectedDayEvent.titleEn})</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {selectedDayEvent.desc}
                </p>
              </div>
              <button
                onClick={() => setSelectedDayEvent(null)}
                className="text-xs text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
