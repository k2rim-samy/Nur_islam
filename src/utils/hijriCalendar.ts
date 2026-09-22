export const HIJRI_MONTHS_AR = [
  'محرّم',
  'صفر',
  'ربيع الأول',
  'ربيع الثاني',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوّال',
  'ذو القعدة',
  'ذو الحجة'
];

export const GREGORIAN_MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

export const ARABIC_DAYS = [
  'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
];

// Calculation algorithm converting Gregorian to Hijri
export function getHijriDetails(date: Date = new Date()): {
  day: number;
  month: number;
  monthName: string;
  year: number;
  formatted: string;
} {
  // Using Intl format if available with islamic-umalqura
  try {
    const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    const parts = formatter.formatToParts(date);
    let day = 1;
    let month = 1;
    let year = 1448;

    for (const part of parts) {
      if (part.type === 'day') day = parseInt(part.value) || 1;
      if (part.type === 'month') month = parseInt(part.value) || 1;
      if (part.type === 'year') {
        const cleaned = part.value.replace(/[^0-9]/g, '');
        year = parseInt(cleaned) || 1448;
      }
    }
    const monthName = HIJRI_MONTHS_AR[(month - 1 + 12) % 12];
    return {
      day,
      month,
      monthName,
      year,
      formatted: `${day} ${monthName} ${year} هـ`
    };
  } catch {
    // Robust algorithmic approximation based on Islamic epoch
    const jd = Math.floor((date.getTime() / 86400000) + 2440587.5);
    const l = Math.floor(jd - 1948440 + 10632);
    const n = Math.floor((l - 1) / 10631);
    const rem = l - 10631 * n + 354;
    const j = (Math.floor((10985 - rem) / 5316)) * (Math.floor((50 * rem) / 17719)) + (Math.floor(rem / 5670)) * (Math.floor((43 * rem) / 15238));
    const rem2 = rem - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    const m = Math.floor((24 * rem2) / 709);
    const d = rem2 - Math.floor((709 * m) / 24);
    const y = 30 * n + j - 30;

    const safeM = Math.max(1, Math.min(12, m));
    return {
      day: d,
      month: safeM,
      monthName: HIJRI_MONTHS_AR[safeM - 1],
      year: y,
      formatted: `${d} ${HIJRI_MONTHS_AR[safeM - 1]} ${y} هـ`
    };
  }
}

export function formatGregorianAr(date: Date = new Date()): string {
  const dayName = ARABIC_DAYS[date.getDay()];
  const dayNum = date.getDate();
  const monthName = GREGORIAN_MONTHS_AR[date.getMonth()];
  const year = date.getFullYear();
  return `${dayName}، ${dayNum} ${monthName} ${year} م`;
}

// Major Islamic occasions
export const ISLAMIC_EVENTS_MAP: Record<string, { titleAr: string; titleEn: string; desc: string }> = {
  '1-1': {
    titleAr: 'رأس السنة الهجرية',
    titleEn: 'Islamic New Year',
    desc: 'اليوم الأول من شهر محرّم المبارك وذكرى الهجرة النبوية الشريفة.'
  },
  '1-10': {
    titleAr: 'يوم عاشوراء',
    titleEn: 'Day of Ashura',
    desc: 'اليوم العاشر من محرم، صامه النبي ﷺ شكراً لله على نجاة موسى عليه السلام.'
  },
  '3-12': {
    titleAr: 'المولد النبوي الشريف',
    titleEn: 'Prophet Muhammad\'s Birthday',
    desc: 'ذكرى مولد خير البرية نبينا محمد صلى الله عليه وسلم.'
  },
  '7-27': {
    titleAr: 'ذكرى الإسراء والمعراج',
    titleEn: 'Isra and Mi\'raj',
    desc: 'معجزة إسرائه ﷺ من المسجد الحرام إلى المسجد الأقصى وعروجه إلى السماوات العلى.'
  },
  '8-15': {
    titleAr: 'ليلة النصف من شعبان',
    titleEn: 'Mid-Sha\'ban Night',
    desc: 'ليلة مباركة تُرفع فيها الأعمال إلى الله تعالى.'
  },
  '9-1': {
    titleAr: 'أول أيام شهر رمضان المبارك',
    titleEn: 'First Day of Ramadan',
    desc: 'شهر الرحمة والغفران ونزول القرآن الكريم وفريضة الصيام.'
  },
  '9-27': {
    titleAr: 'ليلة القدر (أرجى الليالي)',
    titleEn: 'Laylat al-Qadr',
    desc: 'ليلة القدر خير من ألف شهر، تتنزل فيها الملائكة والروح.'
  },
  '10-1': {
    titleAr: 'عيد الفطر المبارك',
    titleEn: 'Eid al-Fitr',
    desc: 'يوم الفرح والجائزة للصائمين بعد تمام شهر رمضان المبارك.'
  },
  '12-9': {
    titleAr: 'يوم عرفة المبارك',
    titleEn: 'Day of Arafah',
    desc: 'أعظم أيام الحج وصيامه يكفر السنة الماضية والآتية لغير الحاج.'
  },
  '12-10': {
    titleAr: 'عيد الأضحى المبارك',
    titleEn: 'Eid al-Adha',
    desc: 'يوم النحر وأعظم أيام الحج وإحياء سنة الخليل إبراهيم عليه السلام.'
  }
};
