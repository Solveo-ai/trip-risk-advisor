export interface Destination {
  id: string;
  name: string;
  country: string;
  region: 'EU' | 'non-EU' | 'nearby';
  flightPriceEUR: number;
  carCostEUR: number | null; // null = not drivable
  accommodationPerNight: {
    budget: number;
    mid: number;
    premium: number;
  };
  medicalCosts: {
    emergencyVisitEUR: number;
    hospitalizationPerDayEUR: number;
    ambulanceEUR: number;
    example: string;
    exampleCostEUR: number;
  };
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Insurer {
  id: string;
  name: string;
  logo?: string;
  pricePerDayEUR: Record<string, number>; // by region
}

export const destinations: Destination[] = [
  {
    id: 'greece',
    name: 'Grčka',
    country: 'Grčka',
    region: 'EU',
    flightPriceEUR: 120,
    carCostEUR: 80,
    accommodationPerNight: { budget: 40, mid: 75, premium: 140 },
    medicalCosts: {
      emergencyVisitEUR: 300,
      hospitalizationPerDayEUR: 800,
      ambulanceEUR: 250,
      example: 'Prelom noge na plaži',
      exampleCostEUR: 3500,
    },
    riskLevel: 'medium',
  },
  {
    id: 'turkey',
    name: 'Turska',
    country: 'Turska',
    region: 'non-EU',
    flightPriceEUR: 150,
    carCostEUR: null,
    accommodationPerNight: { budget: 35, mid: 65, premium: 130 },
    medicalCosts: {
      emergencyVisitEUR: 250,
      hospitalizationPerDayEUR: 600,
      ambulanceEUR: 200,
      example: 'Trovanje hranom sa hospitalizacijom',
      exampleCostEUR: 2000,
    },
    riskLevel: 'medium',
  },
  {
    id: 'montenegro',
    name: 'Crna Gora',
    country: 'Crna Gora',
    region: 'nearby',
    flightPriceEUR: 0,
    carCostEUR: 40,
    accommodationPerNight: { budget: 30, mid: 55, premium: 110 },
    medicalCosts: {
      emergencyVisitEUR: 150,
      hospitalizationPerDayEUR: 400,
      ambulanceEUR: 120,
      example: 'Sunčanica sa dehidracijom',
      exampleCostEUR: 800,
    },
    riskLevel: 'low',
  },
  {
    id: 'egypt',
    name: 'Egipat',
    country: 'Egipat',
    region: 'non-EU',
    flightPriceEUR: 250,
    carCostEUR: null,
    accommodationPerNight: { budget: 30, mid: 60, premium: 150 },
    medicalCosts: {
      emergencyVisitEUR: 200,
      hospitalizationPerDayEUR: 500,
      ambulanceEUR: 180,
      example: 'Alergijska reakcija',
      exampleCostEUR: 1500,
    },
    riskLevel: 'medium',
  },
  {
    id: 'spain',
    name: 'Španija',
    country: 'Španija',
    region: 'EU',
    flightPriceEUR: 180,
    carCostEUR: null,
    accommodationPerNight: { budget: 50, mid: 90, premium: 180 },
    medicalCosts: {
      emergencyVisitEUR: 400,
      hospitalizationPerDayEUR: 1200,
      ambulanceEUR: 350,
      example: 'Sportska povreda kolena',
      exampleCostEUR: 5000,
    },
    riskLevel: 'high',
  },
  {
    id: 'italy',
    name: 'Italija',
    country: 'Italija',
    region: 'EU',
    flightPriceEUR: 140,
    carCostEUR: 120,
    accommodationPerNight: { budget: 55, mid: 95, premium: 200 },
    medicalCosts: {
      emergencyVisitEUR: 450,
      hospitalizationPerDayEUR: 1300,
      ambulanceEUR: 400,
      example: 'Infekcija sa antibioticima',
      exampleCostEUR: 2500,
    },
    riskLevel: 'high',
  },
  {
    id: 'hungary',
    name: 'Mađarska',
    country: 'Mađarska',
    region: 'EU',
    flightPriceEUR: 80,
    carCostEUR: 50,
    accommodationPerNight: { budget: 35, mid: 65, premium: 120 },
    medicalCosts: {
      emergencyVisitEUR: 250,
      hospitalizationPerDayEUR: 700,
      ambulanceEUR: 200,
      example: 'Stomačni virus',
      exampleCostEUR: 1200,
    },
    riskLevel: 'medium',
  },
  {
    id: 'croatia',
    name: 'Hrvatska',
    country: 'Hrvatska',
    region: 'EU',
    flightPriceEUR: 0,
    carCostEUR: 60,
    accommodationPerNight: { budget: 45, mid: 80, premium: 160 },
    medicalCosts: {
      emergencyVisitEUR: 300,
      hospitalizationPerDayEUR: 900,
      ambulanceEUR: 280,
      example: 'Ubod meduze sa komplikacijama',
      exampleCostEUR: 1800,
    },
    riskLevel: 'medium',
  },
  {
    id: 'albania',
    name: 'Albanija',
    country: 'Albanija',
    region: 'nearby',
    flightPriceEUR: 0,
    carCostEUR: 55,
    accommodationPerNight: { budget: 25, mid: 45, premium: 90 },
    medicalCosts: {
      emergencyVisitEUR: 120,
      hospitalizationPerDayEUR: 350,
      ambulanceEUR: 100,
      example: 'Pad sa motora',
      exampleCostEUR: 1000,
    },
    riskLevel: 'low',
  },
  {
    id: 'bulgaria',
    name: 'Bugarska',
    country: 'Bugarska',
    region: 'EU',
    flightPriceEUR: 70,
    carCostEUR: 55,
    accommodationPerNight: { budget: 25, mid: 50, premium: 100 },
    medicalCosts: {
      emergencyVisitEUR: 180,
      hospitalizationPerDayEUR: 500,
      ambulanceEUR: 150,
      example: 'Povreda na ski stazi',
      exampleCostEUR: 2200,
    },
    riskLevel: 'medium',
  },
  {
    id: 'austria',
    name: 'Austrija',
    country: 'Austrija',
    region: 'EU',
    flightPriceEUR: 100,
    carCostEUR: 70,
    accommodationPerNight: { budget: 60, mid: 110, premium: 220 },
    medicalCosts: {
      emergencyVisitEUR: 500,
      hospitalizationPerDayEUR: 1500,
      ambulanceEUR: 500,
      example: 'Ski povreda sa operacijom',
      exampleCostEUR: 8000,
    },
    riskLevel: 'high',
  },
  {
    id: 'germany',
    name: 'Nemačka',
    country: 'Nemačka',
    region: 'EU',
    flightPriceEUR: 130,
    carCostEUR: 100,
    accommodationPerNight: { budget: 55, mid: 100, premium: 200 },
    medicalCosts: {
      emergencyVisitEUR: 500,
      hospitalizationPerDayEUR: 1500,
      ambulanceEUR: 600,
      example: 'Hitna pomoć za bolove u grudima',
      exampleCostEUR: 6000,
    },
    riskLevel: 'high',
  },
  {
    id: 'tunisia',
    name: 'Tunis',
    country: 'Tunis',
    region: 'non-EU',
    flightPriceEUR: 200,
    carCostEUR: null,
    accommodationPerNight: { budget: 25, mid: 50, premium: 120 },
    medicalCosts: {
      emergencyVisitEUR: 150,
      hospitalizationPerDayEUR: 400,
      ambulanceEUR: 120,
      example: 'Dehidracija sa infuzijom',
      exampleCostEUR: 900,
    },
    riskLevel: 'medium',
  },
  {
    id: 'france',
    name: 'Francuska',
    country: 'Francuska',
    region: 'EU',
    flightPriceEUR: 170,
    carCostEUR: null,
    accommodationPerNight: { budget: 60, mid: 110, premium: 250 },
    medicalCosts: {
      emergencyVisitEUR: 400,
      hospitalizationPerDayEUR: 1200,
      ambulanceEUR: 400,
      example: 'Povreda na izletu',
      exampleCostEUR: 4500,
    },
    riskLevel: 'high',
  },
  {
    id: 'czech',
    name: 'Češka',
    country: 'Češka',
    region: 'EU',
    flightPriceEUR: 90,
    carCostEUR: 80,
    accommodationPerNight: { budget: 35, mid: 70, premium: 140 },
    medicalCosts: {
      emergencyVisitEUR: 250,
      hospitalizationPerDayEUR: 700,
      ambulanceEUR: 200,
      example: 'Pad na ledu',
      exampleCostEUR: 1800,
    },
    riskLevel: 'medium',
  },
  {
    id: 'romania',
    name: 'Rumunija',
    country: 'Rumunija',
    region: 'EU',
    flightPriceEUR: 75,
    carCostEUR: 60,
    accommodationPerNight: { budget: 25, mid: 50, premium: 100 },
    medicalCosts: {
      emergencyVisitEUR: 150,
      hospitalizationPerDayEUR: 400,
      ambulanceEUR: 120,
      example: 'Ujed životinje',
      exampleCostEUR: 1200,
    },
    riskLevel: 'low',
  },
  {
    id: 'cyprus',
    name: 'Kipar',
    country: 'Kipar',
    region: 'EU',
    flightPriceEUR: 160,
    carCostEUR: null,
    accommodationPerNight: { budget: 45, mid: 85, premium: 170 },
    medicalCosts: {
      emergencyVisitEUR: 350,
      hospitalizationPerDayEUR: 1000,
      ambulanceEUR: 300,
      example: 'Opekotine od sunca sa infekcijom',
      exampleCostEUR: 2800,
    },
    riskLevel: 'medium',
  },
  {
    id: 'thailand',
    name: 'Tajland',
    country: 'Tajland',
    region: 'non-EU',
    flightPriceEUR: 500,
    carCostEUR: null,
    accommodationPerNight: { budget: 20, mid: 50, premium: 120 },
    medicalCosts: {
      emergencyVisitEUR: 200,
      hospitalizationPerDayEUR: 500,
      ambulanceEUR: 150,
      example: 'Povreda na skuteru',
      exampleCostEUR: 3000,
    },
    riskLevel: 'high',
  },
  {
    id: 'uae',
    name: 'UAE (Dubai)',
    country: 'UAE',
    region: 'non-EU',
    flightPriceEUR: 350,
    carCostEUR: null,
    accommodationPerNight: { budget: 60, mid: 120, premium: 300 },
    medicalCosts: {
      emergencyVisitEUR: 500,
      hospitalizationPerDayEUR: 1500,
      ambulanceEUR: 500,
      example: 'Toploni udar sa hospitalizacijom',
      exampleCostEUR: 5000,
    },
    riskLevel: 'high',
  },
  {
    id: 'bosnia',
    name: 'Bosna i Hercegovina',
    country: 'BiH',
    region: 'nearby',
    flightPriceEUR: 0,
    carCostEUR: 35,
    accommodationPerNight: { budget: 20, mid: 40, premium: 80 },
    medicalCosts: {
      emergencyVisitEUR: 100,
      hospitalizationPerDayEUR: 300,
      ambulanceEUR: 80,
      example: 'Alergijska reakcija na hranu',
      exampleCostEUR: 600,
    },
    riskLevel: 'low',
  },
];

export const insurers: Insurer[] = [
  {
    id: 'wiener',
    name: 'Wiener Städtische',
    pricePerDayEUR: { EU: 1.2, 'non-EU': 1.8, nearby: 0.8 },
  },
  {
    id: 'grawe',
    name: 'Grawe',
    pricePerDayEUR: { EU: 1.1, 'non-EU': 1.7, nearby: 0.7 },
  },
  {
    id: 'generali',
    name: 'Generali',
    pricePerDayEUR: { EU: 1.3, 'non-EU': 2.0, nearby: 0.9 },
  },
  {
    id: 'uniqa',
    name: 'UNIQA',
    pricePerDayEUR: { EU: 1.15, 'non-EU': 1.75, nearby: 0.75 },
  },
  {
    id: 'sava',
    name: 'Sava Osiguranje',
    pricePerDayEUR: { EU: 1.0, 'non-EU': 1.6, nearby: 0.65 },
  },
];

export const EUR_TO_RSD = 117.5;

export type AccommodationTier = 'budget' | 'mid' | 'premium';

export const accommodationLabels: Record<AccommodationTier, string> = {
  budget: 'Ekonomičan',
  mid: 'Srednji',
  premium: 'Premium',
};

export function calculateTripCost(
  destination: Destination,
  days: number,
  travelers: number,
  accommodation: AccommodationTier,
  travelMode: 'flight' | 'car'
) {
  const travelCost =
    travelMode === 'flight'
      ? destination.flightPriceEUR * travelers
      : (destination.carCostEUR ?? 0);

  const accommodationCost =
    destination.accommodationPerNight[accommodation] * days * Math.ceil(travelers / 2);

  const totalEUR = travelCost + accommodationCost;
  const totalRSD = Math.round(totalEUR * EUR_TO_RSD);

  return { travelCost, accommodationCost, totalEUR, totalRSD };
}

export function calculateInsurancePrices(
  destination: Destination,
  days: number,
  travelers: number
) {
  return insurers.map((insurer) => {
    const pricePerDay = insurer.pricePerDayEUR[destination.region];
    const totalEUR = Math.round(pricePerDay * days * travelers * 100) / 100;
    const totalRSD = Math.round(totalEUR * EUR_TO_RSD);
    return {
      ...insurer,
      pricePerDay,
      totalEUR,
      totalRSD,
    };
  }).sort((a, b) => a.totalEUR - b.totalEUR);
}
