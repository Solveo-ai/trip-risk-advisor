export interface CostRange {
  min: number;
  max: number;
}

export interface MedicalDestination {
  id: string;
  name: string;
  region: 'Balkan' | 'Evropa' | 'Svet';
  costs: {
    gp_consultation: CostRange;
    er_visit: CostRange;
    hospital_per_day: CostRange;
    ambulance: CostRange;
    xray_imaging: CostRange;
    prescription_meds: CostRange;
    specialist_visit: CostRange;
    dental_emergency: CostRange;
  };
  incidents: string[];
  avg: number;
  rank: number;
}

export const costLabels: Record<keyof MedicalDestination['costs'], string> = {
  gp_consultation: 'Pregled kod lekara opšte prakse',
  er_visit: 'Hitna pomoć / prijem',
  hospital_per_day: 'Bolnički dan',
  ambulance: 'Prevoz hitne pomoći',
  xray_imaging: 'Rendgen / osnovna dijagnostika',
  prescription_meds: 'Lekovi na recept',
  specialist_visit: 'Pregled kod specijaliste',
  dental_emergency: 'Hitna stomatološka intervencija',
};

export const MAX_AVG = 281; // UAE's average — used for bar normalization

export const medicalDestinations: MedicalDestination[] = [
  {
    id: 'greece', name: 'Grčka', region: 'Evropa',
    costs: {
      gp_consultation: { min: 40, max: 180 },
      er_visit: { min: 150, max: 800 },
      hospital_per_day: { min: 150, max: 500 },
      ambulance: { min: 65, max: 110 },
      xray_imaging: { min: 30, max: 160 },
      prescription_meds: { min: 3, max: 20 },
      specialist_visit: { min: 50, max: 250 },
      dental_emergency: { min: 80, max: 120 },
    },
    incidents: [
      'Povrede (najčešća prijava osiguranja)',
      'Prelomi',
      'Respiratorne bolesti',
      'Opekotine od sunca / toplotna iscrpljenost',
      'Ujedi meduza / morski organizmi',
    ],
    avg: 169, rank: 16,
  },
  {
    id: 'turkey', name: 'Turska', region: 'Evropa',
    costs: {
      gp_consultation: { min: 15, max: 80 },
      er_visit: { min: 50, max: 300 },
      hospital_per_day: { min: 100, max: 400 },
      ambulance: { min: 0, max: 100 },
      xray_imaging: { min: 20, max: 80 },
      prescription_meds: { min: 1, max: 5 },
      specialist_visit: { min: 30, max: 100 },
      dental_emergency: { min: 30, max: 150 },
    },
    incidents: [
      'Prelomi (najčešća prijava osiguranja)',
      'Proliv / gastroenteritis',
      'Povrede (3. najčešća prijava)',
      'Trovanje hranom',
      'Opekotine od sunca / dehidratacija',
    ],
    avg: 91, rank: 10,
  },
  {
    id: 'montenegro', name: 'Crna Gora', region: 'Balkan',
    costs: {
      gp_consultation: { min: 30, max: 60 },
      er_visit: { min: 50, max: 200 },
      hospital_per_day: { min: 80, max: 250 },
      ambulance: { min: 0, max: 50 },
      xray_imaging: { min: 20, max: 60 },
      prescription_meds: { min: 3, max: 15 },
      specialist_visit: { min: 40, max: 80 },
      dental_emergency: { min: 30, max: 80 },
    },
    incidents: [
      'Ujedi insekata / krpelja (rizik od krpeljskog encefalitisa)',
      'Opekotine od sunca / toplotna iscrpljenost',
      'Bolesti iz vode / stomačni problemi',
      'Povrede na plaži / u moru',
      'Respiratorne infekcije',
    ],
    avg: 66, rank: 7,
  },
  {
    id: 'egypt', name: 'Egipat', region: 'Svet',
    costs: {
      gp_consultation: { min: 10, max: 50 },
      er_visit: { min: 30, max: 200 },
      hospital_per_day: { min: 50, max: 200 },
      ambulance: { min: 0, max: 50 },
      xray_imaging: { min: 10, max: 40 },
      prescription_meds: { min: 1, max: 10 },
      specialist_visit: { min: 15, max: 80 },
      dental_emergency: { min: 15, max: 60 },
    },
    incidents: [
      'Proliv putnika / gastroenteritis (veoma čest)',
      'Toplotna iscrpljenost / sunčanica',
      'Denga groznica (prenose komarci)',
      'Hepatitis A (kontaminirana hrana/voda)',
      'Ujedi škorpiona / zmija',
    ],
    avg: 52, rank: 4,
  },
  {
    id: 'spain', name: 'Španija', region: 'Evropa',
    costs: {
      gp_consultation: { min: 20, max: 100 },
      er_visit: { min: 150, max: 300 },
      hospital_per_day: { min: 400, max: 1000 },
      ambulance: { min: 0, max: 200 },
      xray_imaging: { min: 30, max: 100 },
      prescription_meds: { min: 5, max: 50 },
      specialist_visit: { min: 80, max: 150 },
      dental_emergency: { min: 50, max: 150 },
    },
    incidents: [
      'Respiratorni problemi (najčešća prijava osiguranja)',
      'Prelomi',
      'Povrede',
      'Opekotine od sunca / toplotna iscrpljenost',
      'Trovanje hranom / gastroenteritis',
    ],
    avg: 174, rank: 17,
  },
  {
    id: 'italy', name: 'Italija', region: 'Evropa',
    costs: {
      gp_consultation: { min: 20, max: 250 },
      er_visit: { min: 100, max: 300 },
      hospital_per_day: { min: 200, max: 600 },
      ambulance: { min: 0, max: 200 },
      xray_imaging: { min: 30, max: 100 },
      prescription_meds: { min: 5, max: 30 },
      specialist_visit: { min: 80, max: 200 },
      dental_emergency: { min: 60, max: 200 },
    },
    incidents: [
      'Proliv putnika / stomačni problemi',
      'Respiratorne infekcije / prehlada',
      'Opekotine od sunca / toplotna iscrpljenost',
      'Ujedi komaraca',
      'Povrede na putu / saobraćajne nezgode',
    ],
    avg: 149, rank: 14,
  },
  {
    id: 'hungary', name: 'Mađarska', region: 'Evropa',
    costs: {
      gp_consultation: { min: 30, max: 80 },
      er_visit: { min: 80, max: 250 },
      hospital_per_day: { min: 100, max: 350 },
      ambulance: { min: 0, max: 100 },
      xray_imaging: { min: 20, max: 60 },
      prescription_meds: { min: 3, max: 20 },
      specialist_visit: { min: 40, max: 120 },
      dental_emergency: { min: 30, max: 100 },
    },
    incidents: [
      'Bolesti od krpelja (krpelji česti u ruralnim predelima)',
      'Respiratorne infekcije',
      'Trovanje hranom / gastroenteritis',
      'Alergijske reakcije (polen)',
      'Povrede u termalnim bazenima',
    ],
    avg: 87, rank: 9,
  },
  {
    id: 'croatia', name: 'Hrvatska', region: 'Balkan',
    costs: {
      gp_consultation: { min: 40, max: 100 },
      er_visit: { min: 100, max: 530 },
      hospital_per_day: { min: 150, max: 500 },
      ambulance: { min: 0, max: 100 },
      xray_imaging: { min: 25, max: 80 },
      prescription_meds: { min: 5, max: 25 },
      specialist_visit: { min: 60, max: 150 },
      dental_emergency: { min: 40, max: 120 },
    },
    incidents: [
      'Denga (specifično upozorenje gov.uk)',
      'Bolesti od krpelja',
      'Opekotine od sunca / toplotna iscrpljenost',
      'Ujedi morskih ježeva / meduza',
      'Povrede pri vodenim sportovima',
    ],
    avg: 127, rank: 13,
  },
  {
    id: 'albania', name: 'Albanija', region: 'Balkan',
    costs: {
      gp_consultation: { min: 15, max: 40 },
      er_visit: { min: 20, max: 100 },
      hospital_per_day: { min: 40, max: 150 },
      ambulance: { min: 0, max: 30 },
      xray_imaging: { min: 10, max: 30 },
      prescription_meds: { min: 2, max: 10 },
      specialist_visit: { min: 20, max: 60 },
      dental_emergency: { min: 15, max: 50 },
    },
    incidents: [
      'Bolesti iz hrane i vode',
      'Bolesti od krpelja (KKGH, lajmska bolest)',
      'Bolesti izazvane vrućinom',
      'Ujedi pasa lutalica',
      'Respiratorne infekcije',
    ],
    avg: 37, rank: 2,
  },
  {
    id: 'bulgaria', name: 'Bugarska', region: 'Balkan',
    costs: {
      gp_consultation: { min: 20, max: 50 },
      er_visit: { min: 50, max: 200 },
      hospital_per_day: { min: 60, max: 200 },
      ambulance: { min: 0, max: 50 },
      xray_imaging: { min: 15, max: 50 },
      prescription_meds: { min: 3, max: 15 },
      specialist_visit: { min: 25, max: 80 },
      dental_emergency: { min: 20, max: 60 },
    },
    incidents: [
      'Bolesti od krpelja (krpelji veoma česti)',
      'Ujedi pasa lutalica / rizik od besnila',
      'Visinska bolest (planinski predeli)',
      'Trovanje hranom',
      'Respiratorne infekcije (zimska sezona)',
    ],
    avg: 56, rank: 6,
  },
  {
    id: 'austria', name: 'Austrija', region: 'Evropa',
    costs: {
      gp_consultation: { min: 60, max: 150 },
      er_visit: { min: 150, max: 500 },
      hospital_per_day: { min: 300, max: 800 },
      ambulance: { min: 0, max: 300 },
      xray_imaging: { min: 40, max: 120 },
      prescription_meds: { min: 5, max: 30 },
      specialist_visit: { min: 80, max: 250 },
      dental_emergency: { min: 60, max: 200 },
    },
    incidents: [
      'Povrede od skijanja / zimskih sportova i prelomi',
      'Visinska bolest (alpski predeli)',
      'Bolesti od krpelja (krpeljski encefalitis)',
      'Respiratorne infekcije',
      'Alergijske reakcije (polen u proleće)',
    ],
    avg: 190, rank: 18,
  },
  {
    id: 'germany', name: 'Nemačka', region: 'Evropa',
    costs: {
      gp_consultation: { min: 20, max: 120 },
      er_visit: { min: 150, max: 500 },
      hospital_per_day: { min: 300, max: 800 },
      ambulance: { min: 0, max: 500 },
      xray_imaging: { min: 40, max: 120 },
      prescription_meds: { min: 5, max: 20 },
      specialist_visit: { min: 80, max: 250 },
      dental_emergency: { min: 60, max: 250 },
    },
    incidents: [
      'Ujedi krpelja / insekata',
      'Respiratorne infekcije / prehlada / grip',
      'Trovanje hranom / gastroenteritis',
      'Alergijske reakcije',
      'Povrede pri biciklizmu',
    ],
    avg: 201, rank: 19,
  },
  {
    id: 'tunisia', name: 'Tunis', region: 'Svet',
    costs: {
      gp_consultation: { min: 10, max: 30 },
      er_visit: { min: 20, max: 100 },
      hospital_per_day: { min: 40, max: 150 },
      ambulance: { min: 0, max: 30 },
      xray_imaging: { min: 10, max: 30 },
      prescription_meds: { min: 1, max: 8 },
      specialist_visit: { min: 15, max: 50 },
      dental_emergency: { min: 10, max: 40 },
    },
    incidents: [
      'Proliv putnika / gastroenteritis',
      'Toplotna iscrpljenost / sunčanica',
      'Opekotine od sunca',
      'Hepatitis A (kontaminirana hrana/voda)',
      'Ujedi škorpiona',
    ],
    avg: 34, rank: 1,
  },
  {
    id: 'france', name: 'Francuska', region: 'Evropa',
    costs: {
      gp_consultation: { min: 20, max: 60 },
      er_visit: { min: 100, max: 400 },
      hospital_per_day: { min: 250, max: 700 },
      ambulance: { min: 0, max: 300 },
      xray_imaging: { min: 30, max: 100 },
      prescription_meds: { min: 5, max: 40 },
      specialist_visit: { min: 50, max: 150 },
      dental_emergency: { min: 50, max: 200 },
    },
    incidents: [
      'Respiratorne infekcije',
      'Gastrointestinalne infekcije / trovanje hranom',
      'Urinarne infekcije i manje infekcije',
      'Opekotine od sunca (južna Francuska)',
      'Ujedi krpelja (ruralni predeli)',
    ],
    avg: 154, rank: 15,
  },
  {
    id: 'czech', name: 'Češka', region: 'Evropa',
    costs: {
      gp_consultation: { min: 30, max: 60 },
      er_visit: { min: 80, max: 250 },
      hospital_per_day: { min: 100, max: 350 },
      ambulance: { min: 0, max: 100 },
      xray_imaging: { min: 20, max: 60 },
      prescription_meds: { min: 5, max: 15 },
      specialist_visit: { min: 40, max: 120 },
      dental_emergency: { min: 30, max: 100 },
    },
    incidents: [
      'Krpeljski encefalitis (značajan rizik)',
      'Respiratorne infekcije (zimska sezona)',
      'Trovanje hranom / gastroenteritis',
      'Alergijske reakcije (polen)',
      'Povrede pri pešačenju / planinarenju',
    ],
    avg: 85, rank: 8,
  },
  {
    id: 'romania', name: 'Rumunija', region: 'Evropa',
    costs: {
      gp_consultation: { min: 20, max: 50 },
      er_visit: { min: 40, max: 150 },
      hospital_per_day: { min: 60, max: 200 },
      ambulance: { min: 0, max: 50 },
      xray_imaging: { min: 15, max: 50 },
      prescription_meds: { min: 3, max: 15 },
      specialist_visit: { min: 30, max: 80 },
      dental_emergency: { min: 20, max: 60 },
    },
    incidents: [
      'Bolesti od krpelja',
      'Rizik od besnila (psi lutalice prisutni)',
      'Bolesti iz hrane i vode',
      'Respiratorne infekcije',
      'Visinska bolest (Karpati)',
    ],
    avg: 53, rank: 5,
  },
  {
    id: 'cyprus', name: 'Kipar', region: 'Evropa',
    costs: {
      gp_consultation: { min: 40, max: 80 },
      er_visit: { min: 100, max: 300 },
      hospital_per_day: { min: 150, max: 450 },
      ambulance: { min: 0, max: 100 },
      xray_imaging: { min: 25, max: 80 },
      prescription_meds: { min: 5, max: 25 },
      specialist_visit: { min: 50, max: 150 },
      dental_emergency: { min: 40, max: 120 },
    },
    incidents: [
      'Respiratorne bolesti (najčešća prijava osiguranja)',
      'Povrede',
      'Problemi uha, grla i nosa',
      'Opekotine od sunca / toplotna iscrpljenost',
      'Ujedi meduza',
    ],
    avg: 107, rank: 12,
  },
  {
    id: 'thailand', name: 'Tajland', region: 'Svet',
    costs: {
      gp_consultation: { min: 14, max: 55 },
      er_visit: { min: 50, max: 500 },
      hospital_per_day: { min: 80, max: 500 },
      ambulance: { min: 0, max: 100 },
      xray_imaging: { min: 15, max: 60 },
      prescription_meds: { min: 2, max: 15 },
      specialist_visit: { min: 41, max: 110 },
      dental_emergency: { min: 20, max: 80 },
    },
    incidents: [
      'Proliv putnika / gastroenteritis (45% rizik)',
      'Opekotine od motocikla / skutera',
      'Denga groznica / bolesti koje prenose komarci',
      'Trovanje hranom (ulična hrana)',
      'Opekotine od sunca / dehidratacija',
    ],
    avg: 103, rank: 11,
  },
  {
    id: 'uae', name: 'UAE (Dubai)', region: 'Svet',
    costs: {
      gp_consultation: { min: 50, max: 150 },
      er_visit: { min: 200, max: 800 },
      hospital_per_day: { min: 500, max: 1500 },
      ambulance: { min: 0, max: 200 },
      xray_imaging: { min: 50, max: 200 },
      prescription_meds: { min: 10, max: 50 },
      specialist_visit: { min: 100, max: 300 },
      dental_emergency: { min: 80, max: 300 },
    },
    incidents: [
      'Toplotna iscrpljenost / sunčanica (temperature 40–50°C)',
      'Dehidratacija',
      'Respiratorni problemi (klima uređaji / prašina)',
      'Opekotine od sunca',
      'Trovanje hranom',
    ],
    avg: 281, rank: 20,
  },
  {
    id: 'bosnia', name: 'Bosna i Hercegovina', region: 'Balkan',
    costs: {
      gp_consultation: { min: 20, max: 40 },
      er_visit: { min: 30, max: 120 },
      hospital_per_day: { min: 50, max: 150 },
      ambulance: { min: 0, max: 30 },
      xray_imaging: { min: 10, max: 35 },
      prescription_meds: { min: 3, max: 10 },
      specialist_visit: { min: 25, max: 60 },
      dental_emergency: { min: 15, max: 50 },
    },
    incidents: [
      'Bolesti od krpelja',
      'KKGH (Krimsko-kongoška hemoragična groznica)',
      'Bolesti iz hrane i vode',
      'Ujedi pasa lutalica',
      'Respiratorne infekcije',
    ],
    avg: 41, rank: 3,
  },
];

export function getIncidentIcon(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('prelom') || t.includes('povre') || t.includes('ski')) return '🦴';
  if (t.includes('proliv') || t.includes('gastro') || t.includes('trovanje') || t.includes('hran') || t.includes('stomačn')) return '🤢';
  if (t.includes('sunce') || t.includes('sunča') || t.includes('toplot') || t.includes('vrućin') || t.includes('dehidrat') || t.includes('opekot')) return '☀️';
  if (t.includes('krpelj')) return '🪲';
  if (t.includes('respirat') || t.includes('prehlad') || t.includes('grip') || t.includes('uha, grla')) return '🤧';
  if (t.includes('denga') || t.includes('komarc')) return '🦟';
  if (t.includes('besnil') || t.includes('pas') || t.includes('lutalic')) return '🐕';
  if (t.includes('ujed') && t.includes('meduz')) return '🪼';
  if (t.includes('motocik') || t.includes('skuter')) return '🏍️';
  if (t.includes('visins')) return '🏔️';
  if (t.includes('bolest') && t.includes('vode')) return '💧';
  return '⚕️';
}

export function formatCostRange(range: CostRange): string {
  if (range.min === 0 && range.max === 0) return '—';
  if (range.min === 0 && range.max > 0) return `do €${range.max}`;
  if (range.min === range.max) return `€${range.min}`;
  return `€${range.min} – €${range.max}`;
}

export function getWorstCaseTotal(costs: MedicalDestination['costs']): number {
  return Object.values(costs).reduce((sum, r) => sum + r.max, 0);
}

export function getAverageCost(costs: MedicalDestination['costs']): number {
  const values = Object.values(costs);
  const total = values.reduce((sum, r) => sum + Math.round((r.min + r.max) / 2), 0);
  return total;
}

export interface InsuranceCompany {
  id: string;
  name: string;
  packages: string;
  coverage: string;
  tag: 'cheapest' | 'balanced' | 'premium';
  prices: {
    balkans: { perPerson7d: number };
    europe: { perPerson7d: number };
    world: { perPerson7d: number };
  };
}

export const insuranceCompanies: InsuranceCompany[] = [
  {
    id: 'grawe', name: 'Grawe', packages: 'Travel / Travel Star',
    coverage: '15K–120K€ medical', tag: 'cheapest',
    prices: { balkans: { perPerson7d: 8 }, europe: { perPerson7d: 13 }, world: { perPerson7d: 20 } },
  },
  {
    id: 'sava', name: 'Sava', packages: 'Basic / Standard / Premium',
    coverage: '15K–60K€ medical', tag: 'balanced',
    prices: { balkans: { perPerson7d: 11 }, europe: { perPerson7d: 15 }, world: { perPerson7d: 22 } },
  },
  {
    id: 'wiener', name: 'Wiener', packages: 'Standard / VIP',
    coverage: '12K–40K€ medical', tag: 'balanced',
    prices: { balkans: { perPerson7d: 11 }, europe: { perPerson7d: 16 }, world: { perPerson7d: 25 } },
  },
  {
    id: 'uniqa', name: 'Uniqa', packages: 'Ekskluziv / Komfort',
    coverage: '15K–40K€ medical', tag: 'premium',
    prices: { balkans: { perPerson7d: 13 }, europe: { perPerson7d: 18 }, world: { perPerson7d: 28 } },
  },
  {
    id: 'generali', name: 'Generali', packages: 'Standard / Gold',
    coverage: '15K–40K€ medical', tag: 'premium',
    prices: { balkans: { perPerson7d: 14 }, europe: { perPerson7d: 20 }, world: { perPerson7d: 31 } },
  },
];

export type ZoneKey = 'balkans' | 'europe' | 'world';

export const zoneLabels: Record<ZoneKey, string> = {
  balkans: 'Balkan',
  europe: 'Evropa',
  world: 'Svet',
};

export function getDestinationZone(region: MedicalDestination['region']): ZoneKey {
  if (region === 'Balkan') return 'balkans';
  if (region === 'Evropa') return 'europe';
  return 'world';
}

export function getCostTierLabel(avg: number): { label: string; emoji: string; tier: 'low' | 'medium' | 'high' } {
  if (avg <= 56) return { label: 'Jeftini troškovi lečenja', emoji: '✅', tier: 'low' };
  if (avg <= 127) return { label: 'Prosečni troškovi lečenja', emoji: '⚠️', tier: 'medium' };
  return { label: 'Visoki troškovi lečenja', emoji: '🔴', tier: 'high' };
}
