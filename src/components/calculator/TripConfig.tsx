import { Minus, Plus, Users, Calendar, Plane, Car } from 'lucide-react';
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

const tierDescriptions: Record<AccommodationTier, string> = {
  budget: 'Hostel · 1★-2★',
  mid: '3★ hotel',
  premium: '4★-5★ hotel',
};

function Stepper({ value, onChange, min, max, label, icon: Icon }: {
  value: number; onChange: (n: number) => void; min: number; max: number; label: string; icon: React.ElementType;
}) {
  return (
    <div className="flex items-center justify-between flex-1">
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="h-8 w-8 rounded-md border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors disabled:opacity-40"
          disabled={value <= min}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="text-base font-semibold text-foreground w-8 text-center font-heading">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="h-8 w-8 rounded-md border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors disabled:opacity-40"
          disabled={value >= max}
        >
          <Plus className="h-3.5 w-3.5" />
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
  const hasFlights = destination?.flightPriceEUR != null && destination.flightPriceEUR > 0;

  return (
    <div className="space-y-5">
      {/* Steppers row */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        <Stepper value={days} onChange={setDays} min={1} max={30} label="Broj dana" icon={Calendar} />
        <Stepper value={travelers} onChange={setTravelers} min={1} max={8} label="Putnika" icon={Users} />
      </div>

      {/* Accommodation + Transport in a row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Accommodation */}
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-foreground">Nivo smeštaja</label>
          <div className="grid grid-cols-3 gap-1.5 rounded-lg border border-border bg-background p-1">
            {tiers.map((t) => (
              <button
                key={t}
                onClick={() => setAccommodation(t)}
                className={`rounded-md px-2 py-2.5 text-center transition-all ${
                  accommodation === t
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <span className="text-sm font-medium block">{accommodationLabels[t]}</span>
                <span className={`text-[10px] block mt-0.5 ${accommodation === t ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {tierDescriptions[t]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Transport */}
        {destination && (hasFlights || canDrive) && (
          <div className="sm:w-40 space-y-2">
            <label className="text-sm font-medium text-foreground">Prevoz</label>
            <div className="flex gap-1.5 rounded-lg border border-border bg-background p-1">
              {hasFlights && (
                <button
                  onClick={() => setTravelMode('flight')}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-2.5 text-sm transition-all ${
                    travelMode === 'flight'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Plane className="h-3.5 w-3.5" />
                  Avion
                </button>
              )}
              {canDrive && (
                <button
                  onClick={() => setTravelMode('car')}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-2.5 text-sm transition-all ${
                    travelMode === 'car'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Car className="h-3.5 w-3.5" />
                  Auto
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
