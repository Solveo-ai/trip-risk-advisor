import { type Destination, calculateInsurancePrices, calculateTripCost, EUR_TO_RSD, type AccommodationTier } from '@/data/travelData';
import { Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  destination: Destination;
  days: number;
  travelers: number;
  accommodation: AccommodationTier;
  travelMode: 'flight' | 'car';
}

function formatRSD(n: number) {
  return new Intl.NumberFormat('sr-RS').format(n);
}

export default function InsuranceComparison({ destination, days, travelers, accommodation, travelMode }: Props) {
  const prices = calculateInsurancePrices(destination, days, travelers);
  const { totalRSD: tripTotalRSD } = calculateTripCost(destination, days, travelers, accommodation, travelMode);
  const cheapest = prices[0];
  const mostExpensive = prices[prices.length - 1];

  const cheapestPercent = ((cheapest.totalRSD / tripTotalRSD) * 100).toFixed(1);

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 card-elevated">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Shield className="h-4 w-4" />
        Koliko košta zaštita cele investicije?
      </div>

      {/* Anchoring statement */}
      <div className="bg-primary/5 rounded-lg p-4 border border-primary/10 text-center">
        <p className="text-sm text-muted-foreground">
          Osiguranje za celo putovanje košta samo
        </p>
        <p className="text-3xl font-bold text-foreground font-heading mt-1">
          {cheapestPercent}%
          <span className="text-sm font-normal text-muted-foreground ml-1">vaše investicije</span>
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Od <strong className="text-foreground">{formatRSD(cheapest.totalRSD)} RSD</strong> do{' '}
          <strong className="text-foreground">{formatRSD(mostExpensive.totalRSD)} RSD</strong>
        </p>
      </div>

      {/* All insurers */}
      <div className="space-y-2">
        {prices.map((p, i) => (
          <div
            key={p.id}
            className={`flex items-center justify-between rounded-lg border px-4 py-3 transition-all ${
              i === 0
                ? 'border-success/30 bg-success/5'
                : 'border-border bg-card'
            }`}
          >
            <div className="flex items-center gap-3">
              {i === 0 && <CheckCircle2 className="h-4 w-4 text-success" />}
              <div>
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.pricePerDay.toFixed(2)}€/dan po osobi
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{formatRSD(p.totalRSD)} RSD</p>
              <p className="text-xs text-muted-foreground">{p.totalEUR.toFixed(2)} EUR</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full gradient-accent text-accent-foreground font-semibold py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 shadow-accent hover:opacity-90 transition-opacity text-sm">
        Uporedite ponude i kupite online
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Cene su informativne. Tačnu cenu dobijate na stranici za poređenje.
      </p>
    </div>
  );
}
