import { Minus, Plus, Users, Calendar } from 'lucide-react';
import { type AccommodationTier, accommodationLabels, type Destination } from '@/data/travelData';

interface Props {
  days: number;
  setDays: (n: number) => void;
  travelers: number;
  setTravelers: (n: number) => void;
  accommodation: AccommodationTier;
  setAccommodation: (t: AccommodationTier) => void;
  travelMode: 'flight' | 'car';
  setTravelMode: (m: 'flight' | 'car') => void;
  destination: Destination | null;
}

function Stepper({ value, onChange, min, max, label, icon: Icon }: {
  value: number; onChange: (n: number) => void; min: number; max: number; label: string; icon: React.ElementType;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        <Icon className="h-4 w-4 text-muted-foreground" />
        {label}
      </label>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="h-9 w-9 rounded-lg border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors disabled:opacity-40"
          disabled={value <= min}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="text-lg font-semibold text-foreground w-8 text-center font-heading">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="h-9 w-9 rounded-lg border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors disabled:opacity-40"
          disabled={value >= max}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function TripConfig({
  days, setDays, travelers, setTravelers,
  accommodation, setAccommodation,
  travelMode, setTravelMode, destination,
}: Props) {
  const tiers: AccommodationTier[] = ['budget', 'mid', 'premium'];
  const canDrive = destination?.carCostEUR != null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-6">
        <Stepper value={days} onChange={setDays} min={1} max={30} label="Broj dana" icon={Calendar} />
        <Stepper value={travelers} onChange={setTravelers} min={1} max={8} label="Broj putnika" icon={Users} />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Smeštaj</label>
        <div className="flex gap-2">
          {tiers.map((t) => (
            <button
              key={t}
              onClick={() => setAccommodation(t)}
              className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                accommodation === t
                  ? 'border-accent bg-accent/10 text-accent-foreground font-medium'
                  : 'border-border bg-card text-muted-foreground hover:border-accent/50'
              }`}
            >
              {accommodationLabels[t]}
            </button>
          ))}
        </div>
      </div>

      {destination && (
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Prevoz</label>
          <div className="flex gap-2">
            {destination.flightPriceEUR > 0 && (
              <button
                onClick={() => setTravelMode('flight')}
                className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                  travelMode === 'flight'
                    ? 'border-accent bg-accent/10 text-accent-foreground font-medium'
                    : 'border-border bg-card text-muted-foreground hover:border-accent/50'
                }`}
              >
                ✈️ Avion
              </button>
            )}
            {canDrive && (
              <button
                onClick={() => setTravelMode('car')}
                className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                  travelMode === 'car'
                    ? 'border-accent bg-accent/10 text-accent-foreground font-medium'
                    : 'border-border bg-card text-muted-foreground hover:border-accent/50'
                }`}
              >
                🚗 Auto
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
