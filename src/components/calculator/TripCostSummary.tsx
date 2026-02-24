import { type Destination, EUR_TO_RSD, type AccommodationTier, calculateTripCost } from '@/data/travelData';
import { Plane, Car, BedDouble, Wallet } from 'lucide-react';

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

export default function TripCostSummary({ destination, days, travelers, accommodation, travelMode }: Props) {
  const { travelCost, accommodationCost, totalEUR, totalRSD } = calculateTripCost(
    destination, days, travelers, accommodation, travelMode
  );

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 card-elevated">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Wallet className="h-4 w-4" />
        Vaša ukupna investicija u putovanje
      </div>

      <div className="text-center py-3">
        <p className="text-4xl font-bold text-foreground font-heading animate-fade-in-up">
          {formatRSD(totalRSD)} <span className="text-lg font-medium text-muted-foreground">RSD</span>
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          ≈ {formatRSD(totalEUR)} EUR
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
        <div className="flex items-start gap-2">
          {travelMode === 'flight' ? (
            <Plane className="h-4 w-4 mt-0.5 text-muted-foreground" />
          ) : (
            <Car className="h-4 w-4 mt-0.5 text-muted-foreground" />
          )}
          <div>
            <p className="text-xs text-muted-foreground">Prevoz</p>
            <p className="text-sm font-medium text-foreground">{formatRSD(Math.round(travelCost * EUR_TO_RSD))} RSD</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <BedDouble className="h-4 w-4 mt-0.5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Smeštaj ({days} noći)</p>
            <p className="text-sm font-medium text-foreground">{formatRSD(Math.round(accommodationCost * EUR_TO_RSD))} RSD</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center pt-2">
        * Procene bazirane na prosečnim cenama za 2026. godinu
      </p>
    </div>
  );
}
