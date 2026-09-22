import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Search, Play, Pause, Volume2, VolumeX, Copy, Check, ZoomIn, ZoomOut, Globe, Sparkles } from 'lucide-react';
import { QURAN_SURAHS } from '../data/quranData';
import { Surah } from '../types';

export const QuranReader: React.FC = () => {
  const [selectedSurah, setSelectedSurah] = useState<Surah>(QURAN_SURAHS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [fontSize, setFontSize] = useState(26); // Default Arabic font size
  const [showTranslation, setShowTranslation] = useState(true);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop audio when changing surahs
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlayingAudio(false);
    }
  }, [selectedSurah]);

  const filteredSurahs = QURAN_SURAHS.filter(
    (s) =>
      s.nameAr.includes(searchQuery) ||
      s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.translation.includes(searchQuery)
  );

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch((err) => {
          console.warn('Audio playback error', err);
          setIsPlayingAudio(false);
        });
    }
  };

  const copyAyahText = (ayahNum: number, text: string) => {
    const fullText = `﴿ ${text} ﴾ [سورة ${selectedSurah.nameAr} - الآية ${ayahNum}]`;
    navigator.clipboard.writeText(fullText);
    setCopiedAyah(ayahNum);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  return (
    <section id="quran" className="py-20 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>كتاب الله العزيز</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-title text-gold-gradient mb-4">
            القرآن الكريم المرتل
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            اقرأ الآيات المباركة بالرسم العثماني واستمع إلى تلاوة خاشعة بصوت الشيخ مشاري راشد العفاسي.
          </p>
        </div>

        {/* Quran Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Surah Sidebar (Cols 1-4) */}
          <div className="lg:col-span-4 glass-card rounded-3xl p-5 border-amber-400/20 flex flex-col h-[650px]">
            {/* Search Box */}
            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن اسم السورة باللغة العربية أو الإنجليزية..."
                className="w-full bg-white/5 border border-amber-400/20 rounded-xl px-4 py-2.5 pr-10 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400/60"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            </div>

            {/* Surah List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {filteredSurahs.length > 0 ? (
                filteredSurahs.map((surah) => {
                  const isSelected = selectedSurah.id === surah.id;
                  return (
                    <button
                      key={surah.id}
                      onClick={() => setSelectedSurah(surah)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-right cursor-pointer group ${
                        isSelected
                          ? 'bg-amber-400/20 border border-amber-400/50 shadow-md shadow-amber-500/10'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                            isSelected ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-slate-400'
                          }`}
                        >
                          {surah.id}
                        </span>
                        <div>
                          <div className={`font-bold text-sm ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                            {surah.nameEn}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {surah.type === 'Meccan' ? 'مكية' : 'مدنية'} • {surah.versesCount} آيات
                          </div>
                        </div>
                      </div>

                      <div className="font-quran text-lg font-bold text-amber-200">
                        سورة {surah.nameAr}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-12 text-slate-400 text-sm">
                  لم يتم العثور على سور مطابقة للبحث
                </div>
              )}
            </div>
          </div>

          {/* Surah Content & Reader View (Cols 5-12) */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-8 border-amber-400/20 flex flex-col h-[650px] relative overflow-hidden">
            {/* Reader Header & Audio Controls */}
            <div className="border-b border-amber-400/15 pb-5 mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-quran text-2xl sm:text-3xl font-bold text-gold-gradient">
                    سورة {selectedSurah.nameAr}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    {selectedSurah.type === 'Meccan' ? 'مكية' : 'مدنية'}
                  </span>
                  <span className="text-xs text-slate-400">
                    {selectedSurah.versesCount} آيات
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-light">{selectedSurah.translation}</p>
              </div>

              {/* Toolbar Controls */}
              <div className="flex items-center gap-2">
                {/* Font Size Adjusters */}
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
                  <button
                    onClick={() => setFontSize((f) => Math.max(18, f - 2))}
                    title="تصغير الخط"
                    className="p-1.5 hover:text-amber-300 text-slate-400 cursor-pointer"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs px-2 font-mono text-slate-300">{fontSize}px</span>
                  <button
                    onClick={() => setFontSize((f) => Math.min(38, f + 2))}
                    title="تكبير الخط"
                    className="p-1.5 hover:text-amber-300 text-slate-400 cursor-pointer"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                {/* Translation Toggle */}
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  title={showTranslation ? 'إخفاء الترجمة الإنجليزية' : 'إظهار الترجمة الإنجليزية'}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    showTranslation
                      ? 'bg-amber-400/20 border-amber-400/40 text-amber-300'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                </button>

                {/* Audio Recitation Player Button */}
                {selectedSurah.audioUrl && (
                  <button
                    onClick={toggleAudio}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isPlayingAudio
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25 animate-pulse'
                        : 'bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>إيقاف التلاوة</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>استمع للتلاوة</span>
                      </>
                    )}
                  </button>
                )}

                {/* Hidden Audio Element */}
                {selectedSurah.audioUrl && (
                  <audio
                    ref={audioRef}
                    src={selectedSurah.audioUrl}
                    onEnded={() => setIsPlayingAudio(false)}
                    onError={() => setIsPlayingAudio(false)}
                  />
                )}
              </div>
            </div>

            {/* Bismillah Banner for non-Tawbah Surahs */}
            {selectedSurah.id !== 9 && (
              <div className="text-center py-2 mb-4">
                <span className="font-quran text-xl text-amber-300/80 font-bold">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </span>
              </div>
            )}

            {/* Verses Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
              {selectedSurah.verses.map((verse) => (
                <div
                  key={verse.num}
                  className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-all text-right group relative"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    {/* Verse Ayah Number Badge */}
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>الآية {verse.num}</span>
                    </div>

                    {/* Copy Button */}
                    <button
                      onClick={() => copyAyahText(verse.num, verse.ar)}
                      title="نسخ الآية الكريمة"
                      className="text-slate-400 hover:text-amber-300 p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      {copiedAyah === verse.num ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Arabic Text with Uthmani Font */}
                  <p
                    className="font-quran leading-loose text-slate-100 mb-2 font-medium tracking-wide text-justify"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {verse.ar}{' '}
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-mono text-amber-400 border border-amber-400/40 mx-1 align-middle">
                      {verse.num}
                    </span>
                  </p>

                  {/* English Translation */}
                  {showTranslation && (
                    <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mt-2 text-left pl-1">
                      {verse.en}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
