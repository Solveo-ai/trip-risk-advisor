import { type Destination, EUR_TO_RSD } from '@/data/travelData';
import { AlertTriangle, Stethoscope, Ambulance, Building2 } from 'lucide-react';

interface Props {
  destination: Destination;
}

function formatRSD(n: number) {
  return new Intl.NumberFormat('sr-RS').format(n);
}

const riskLabels = {
  low: 'Nizak',
  medium: 'Srednji',
  high: 'Visok',
};

export default function RiskContext({ destination }: Props) {
  const { medicalCosts, riskLevel } = destination;

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 card-elevated">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <AlertTriangle className="h-4 w-4" />
          Šta ako se nešto desi u inostranstvu?
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          riskLevel === 'low' ? 'bg-success/10 text-success' :
          riskLevel === 'medium' ? 'bg-warning/10 text-warning' :
          'bg-destructive/10 text-destructive'
        }`}>
          {riskLabels[riskLevel]} troškovi lečenja
        </span>
      </div>

      <div className="bg-secondary/50 rounded-lg p-4 border border-border">
        <p className="text-sm text-muted-foreground mb-1">Čest scenario u destinaciji {destination.name}:</p>
        <p className="text-base font-medium text-foreground">{medicalCosts.example}</p>
        <p className="text-2xl font-bold text-destructive font-heading mt-2">
          ~{formatRSD(Math.round(medicalCosts.exampleCostEUR * EUR_TO_RSD))} RSD
          <span className="text-sm font-normal text-muted-foreground ml-2">({medicalCosts.exampleCostEUR} EUR)</span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 rounded-lg bg-secondary/30">
          <Stethoscope className="h-4 w-4 mx-auto mb-1.5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Hitna pomoć</p>
          <p className="text-sm font-semibold text-foreground">{medicalCosts.emergencyVisitEUR}€</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-secondary/30">
          <Building2 className="h-4 w-4 mx-auto mb-1.5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Bolnica/dan</p>
          <p className="text-sm font-semibold text-foreground">{medicalCosts.hospitalizationPerDayEUR}€</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-secondary/30">
          <Ambulance className="h-4 w-4 mx-auto mb-1.5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Ambulanta</p>
          <p className="text-sm font-semibold text-foreground">{medicalCosts.ambulanceEUR}€</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Podaci o troškovima lečenja: proseci za 2024–2025 iz WHO i lokalnih zdravstvenih sistema.
        Stvarni troškovi mogu varirati.
      </p>
    </div>
  );
}
