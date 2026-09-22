import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PrayerTimes } from './components/PrayerTimes';
import { QuranReader } from './components/QuranReader';
import { HadithSection } from './components/HadithSection';
import { TasbeehCounter } from './components/TasbeehCounter';
import { AdhkarStepper } from './components/AdhkarStepper';
import { IslamicCalendar } from './components/IslamicCalendar';
import { QiblaCompass } from './components/QiblaCompass';
import { QuotesSlider } from './components/QuotesSlider';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'theme-dark' | 'theme-light'>(() => {
    const saved = localStorage.getItem('nur-islam-theme');
    return saved === 'theme-light' ? 'theme-light' : 'theme-dark';
  });

  const [nextPrayerInfo, setNextPrayerInfo] = useState<{ name: string; time: string }>({
    name: 'الفجر',
    time: '04:22 ص',
  });

  useEffect(() => {
    document.documentElement.classList.remove('theme-dark', 'theme-light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('nur-islam-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'theme-dark' ? 'theme-light' : 'theme-dark'));
  };

  const handleNextPrayerUpdate = (name: string, time: string) => {
    setNextPrayerInfo({ name, time });
  };

  return (
    <div className={`min-h-screen ${theme} text-slate-100 selection:bg-amber-400 selection:text-slate-950`}>
      {/* Sticky Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        nextPrayerName={nextPrayerInfo.name}
        nextPrayerTime={nextPrayerInfo.time}
      />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <PrayerTimes onNextPrayerChange={handleNextPrayerUpdate} />
        <QuranReader />
        <HadithSection />
        <TasbeehCounter />
        <AdhkarStepper />
        <IslamicCalendar />
        <QiblaCompass />
        <QuotesSlider />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
