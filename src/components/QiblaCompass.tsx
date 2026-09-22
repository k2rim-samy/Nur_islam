import React, { useState } from 'react';
import { Compass, Navigation, MapPin } from 'lucide-react';

interface CityCoord {
  name: string;
  lat: number;
  lng: number;
}

const CITIES: CityCoord[] = [
  { name: 'القاهرة، مصر', lat: 30.0444, lng: 31.2357 },
  { name: 'الإسكندرية، مصر', lat: 31.2001, lng: 29.9187 },
  { name: 'الرياض، السعودية', lat: 24.7136, lng: 46.6753 },
  { name: 'القدس الشريف، فلسطين', lat: 31.7683, lng: 35.2137 },
  { name: 'دبي، الإمارات', lat: 25.2048, lng: 55.2708 },
  { name: 'عمان، الأردن', lat: 31.9454, lng: 35.9284 },
  { name: 'إسطنبول، تركيا', lat: 41.0082, lng: 28.9784 },
  { name: 'لندن، بريطانيا', lat: 51.5074, lng: -0.1278 },
];

// Kaaba Coordinates
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

// Calculate forward azimuth bearing from point A to Kaaba
function calculateQiblaBearing(lat: number, lng: number): number {
  const phiK = (KAABA_LAT * Math.PI) / 180.0;
  const lambdaK = (KAABA_LNG * Math.PI) / 180.0;
  const phi = (lat * Math.PI) / 180.0;
  const lambda = (lng * Math.PI) / 180.0;

  const psi =
    (180.0 / Math.PI) *
    Math.atan2(
      Math.sin(lambdaK - lambda),
      Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda)
    );

  return Math.round((psi + 360) % 360);
}

// Great circle distance in km
function calculateDistanceToKaaba(lat: number, lng: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((KAABA_LAT - lat) * Math.PI) / 180;
  const dLon = ((KAABA_LNG - lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat * Math.PI) / 180) * Math.cos((KAABA_LAT * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export const QiblaCompass: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityCoord>(CITIES[0]);

  const bearing = calculateQiblaBearing(selectedCity.lat, selectedCity.lng);
  const distance = calculateDistanceToKaaba(selectedCity.lat, selectedCity.lng);

  return (
    <section id="qibla" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>وجهة الصلاة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-title text-gold-gradient mb-4">
            اتجاه القبلة الشريفة
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            ﴿ فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ ﴾ — حدد اتجاه الكعبة المشرفة بدقة حسب موقعك الحالي.
          </p>
        </div>

        {/* Compass Card */}
        <div className="max-w-xl mx-auto glass-card rounded-3xl p-8 sm:p-10 border-amber-400/25 shadow-2xl flex flex-col items-center">
          {/* City Selection */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-amber-400/20 mb-8 w-full max-w-sm justify-center">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <select
              aria-label="اختر مدينتك لتحديد القبلة"
              value={selectedCity.name}
              onChange={(e) => {
                const found = CITIES.find((c) => c.name === e.target.value);
                if (found) setSelectedCity(found);
              }}
              className="bg-transparent text-amber-300 text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c.name} value={c.name} className="bg-slate-900 text-slate-100">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Compass Graphic Dial */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-2 flex items-center justify-center">
            {/* Outer Compass Bezel */}
            <div className="absolute inset-0 rounded-full border-4 border-amber-400/30 glass-card shadow-2xl flex items-center justify-center">
              {/* Compass Cardinal Points */}
              <span className="absolute top-2 text-xs font-bold text-amber-300 font-mono">N (شمال)</span>
              <span className="absolute bottom-2 text-xs font-bold text-slate-400 font-mono">S (جنوب)</span>
              <span className="absolute right-2 text-xs font-bold text-slate-400 font-mono">E (شرق)</span>
              <span className="absolute left-2 text-xs font-bold text-slate-400 font-mono">W (غرب)</span>

              {/* Angle Tick Marks */}
              <div className="w-48 h-48 rounded-full border border-dashed border-white/20" />
            </div>

            {/* Rotating Qibla Needle Pointer */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out pointer-events-none"
              style={{ transform: `rotate(${bearing}deg)` }}
            >
              {/* Pointer to Kaaba */}
              <div className="flex flex-col items-center -translate-y-16">
                <div className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] mb-1 shadow-md shadow-emerald-500/30 flex items-center gap-1">
                  <span>الكعبة</span>
                </div>
                <Navigation className="w-8 h-8 text-emerald-400 fill-emerald-400 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
            </div>

            {/* Center Pivot Emblem */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 border-2 border-slate-900 z-10 flex items-center justify-center shadow-lg">
              <Compass className="w-6 h-6 text-slate-950" />
            </div>
          </div>

          {/* Bearing & Distance Info Cards */}
          <div className="grid grid-cols-2 gap-4 w-full mt-8">
            <div className="glass-card rounded-2xl p-4 text-center border-amber-400/15">
              <div className="text-xs text-slate-400 mb-1">زاوية القبلة</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-gold-gradient">
                {bearing}°
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">من الشمال الجغرافي</div>
            </div>

            <div className="glass-card rounded-2xl p-4 text-center border-amber-400/15">
              <div className="text-xs text-slate-400 mb-1">المسافة إلى مكة</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                {distance.toLocaleString('ar-EG')} كم
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">خط مستقيم</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
