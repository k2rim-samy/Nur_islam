import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Compass, BookOpen, Clock, Heart, Sparkles, MessageCircle, Calendar } from 'lucide-react';

interface NavbarProps {
  theme: 'theme-dark' | 'theme-light';
  toggleTheme: () => void;
  nextPrayerName?: string;
  nextPrayerTime?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, nextPrayerName, nextPrayerTime }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sectionIds = ['hero', 'prayer-times', 'quran', 'hadith', 'tasbeeh', 'adhkar', 'calendar', 'qibla', 'quotes', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'الرئيسة' },
    { id: 'prayer-times', label: 'مواقيت الصلاة', icon: Clock },
    { id: 'quran', label: 'القرآن الكريم', icon: BookOpen },
    { id: 'hadith', label: 'الحديث الشريف', icon: Sparkles },
    { id: 'tasbeeh', label: 'السبحة الإلكترونية', icon: Heart },
    { id: 'adhkar', label: 'أذكار اليوم' },
    { id: 'calendar', label: 'التقويم الهجري', icon: Calendar },
    { id: 'qibla', label: 'القبلة', icon: Compass },
    { id: 'quotes', label: 'حكم وعظات' },
    { id: 'contact', label: 'تواصل معنا', icon: MessageCircle },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-card border-b py-3 shadow-lg shadow-black/30'
          : 'bg-black/30 backdrop-blur-md py-4 border-b border-amber-500/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 group text-right cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center border border-amber-400/40 bg-amber-400/10 group-hover:scale-105 transition-transform shadow-inner shadow-amber-400/20">
            <svg className="w-6 h-6" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="navGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              </defs>
              <path d="M40,15 A35,35 0 1,0 85,60 A30,30 0 1,1 40,15 Z" fill="url(#navGold)" />
              <polygon points="65,30 70,40 80,40 72,46 75,56 65,49 55,56 58,46 50,40 60,40" fill="#fbbf24" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold font-title text-gold-gradient tracking-wide">
              نور الإسلام
            </div>
            <div className="text-[10px] text-emerald-400 font-medium tracking-wider">
              البوابة الرقمية الشاملة
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeSection === item.id
                  ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30 shadow-sm'
                  : 'text-slate-300 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Quick Prayer Preview + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {nextPrayerName && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>الأذان القادم: {nextPrayerName}</span>
              {nextPrayerTime && <span className="font-semibold text-amber-300">{nextPrayerTime}</span>}
            </div>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="تبديل المظهر"
            className="p-2.5 rounded-xl border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            title={theme === 'theme-dark' ? 'التحويل إلى الوضع النهاري' : 'التحويل إلى الوضع الليلي'}
          >
            {theme === 'theme-dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="القائمة"
            className="xl:hidden p-2.5 rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden glass-card border-b border-amber-500/20 px-4 pt-3 pb-6 mt-2 max-h-[80vh] overflow-y-auto shadow-2xl animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-right ${
                  activeSection === item.id
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {nextPrayerName && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-center text-emerald-300">
              الأذان القادم: <span className="font-bold text-amber-300">{nextPrayerName}</span> في تمام{' '}
              <span className="font-bold text-amber-300">{nextPrayerTime}</span>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
