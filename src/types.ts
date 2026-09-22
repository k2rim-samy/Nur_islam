export interface PrayerTiming {
  name: string;
  nameAr: string;
  time: string;
  time12: string;
  id: string;
  iconName: string;
}

export interface CityOption {
  id: string;
  nameAr: string;
  nameEn: string;
  countryAr: string;
  countryEn: string;
  lat: number;
  lng: number;
  method: number;
}

export interface Verse {
  num: number;
  ar: string;
  en: string;
  audioNumber?: number; // Global ayah number for audio
}

export interface Surah {
  id: number;
  nameAr: string;
  nameEn: string;
  translation: string;
  type: 'Meccan' | 'Medinan';
  versesCount: number;
  verses: Verse[];
  audioUrl?: string;
}

export interface DhikrItem {
  id: number;
  text: string;
  total: number;
  source?: string;
  virtue?: string;
}

export interface Wisdom {
  ar: string;
  en: string;
  source: string;
  category?: string;
}

export interface IslamicEvent {
  titleAr: string;
  titleEn: string;
  hijriDate: string;
  dateStr: string; // YYYY-MM-DD
  description: string;
}
