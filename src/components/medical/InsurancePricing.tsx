import { useState } from 'react';
import {
  type MedicalDestination,
  insuranceCompanies,
  type ZoneKey,
  zoneLabels,
  getDestinationZone,
} from '@/data/medicalData';
import { Shield, ExternalLink } from 'lucide-react';

interface Props {
  destination: MedicalDestination;
}

const tagStyles: Record<string, { bg: string; text: string; label: string }> = {
  cheapest: { bg: 'bg-success/10', text: 'text-success', label: 'najjeftinije' },
  balanced: { bg: 'bg-warning/10', text: 'text-warning', label: 'balansiran' },
  premium: { bg: 'bg-primary/10', text: 'text-primary', label: 'premium' },
};

export default function InsurancePricing({ destination }: Props) {
  const defaultZone = getDestinationZone(destination.region);
  const [zone, setZone] = useState<ZoneKey>(defaultZone);

  // Sync zone when destination changes
  const destZone = getDestinationZone(destination.region);

  const zones: ZoneKey[] = ['balkans', 'europe', 'world'];

  return (
    <div className="rounded-xl border border-border bg-card card-elevated overflow-hidden">
      <div className="p-5 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold font-heading text-foreground">
            Cene putnog osiguranja
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          👤 1 osoba · 📅 7 dana · 🛡️ Standardni paket — Istraživanje tržišta, feb. 2026.
        </p>
      </div>

      {/* Zone tabs */}
      <div className="px-5 pb-4">
        <div className="flex gap-1.5 p-1 bg-secondary/50 rounded-lg">
          {zones.map((z) => (
            <button
              key={z}
              onClick={() => setZone(z)}
              className={`flex-1 text-sm py-2 px-3 rounded-md transition-all font-medium ${
                zone === z
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              } ${z === destZone ? 'ring-1 ring-primary/30' : ''}`}
            >
              🌍 {zoneLabels[z]}
              {z === destZone && <span className="ml-1 text-xs text-primary">•</span>}
            </button>
          ))}
        </div>
        {zone !== destZone && (
          <p className="text-xs text-muted-foreground mt-2">
            ℹ️ {destination.name} spada u zonu <strong>{zoneLabels[destZone]}</strong>.
            Prikazujete cene za zonu {zoneLabels[zone]}.
          </p>
        )}
      </div>

      {/* Insurer cards */}
      <div className="px-5 pb-5 space-y-3">
        {insuranceCompanies.map((ins) => {
          const price = ins.prices[zone].perPerson7d;
          const perDay = (price / 7).toFixed(2);
          const tag = tagStyles[ins.tag];

          return (
            <div
              key={ins.id}
              className="rounded-lg border border-border p-4 space-y-3 hover:border-primary/20 transition-colors"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-foreground">{ins.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tag.bg} ${tag.text}`}>
                    {tag.label}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-foreground tabular-nums">€{price}</span>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <div>📋 {ins.packages}</div>
                <div>🏥 {ins.coverage}</div>
                <div>€{perDay}/dan po osobi</div>
                <div>Standardni nivo</div>
              </div>

              {/* All zone prices */}
              <div className="flex gap-2 text-xs">
                {zones.map((z) => {
                  const zPrice = ins.prices[z].perPerson7d;
                  const isActive = z === zone;
                  return (
                    <span
                      key={z}
                      className={`px-2 py-1 rounded ${
                        isActive ? 'bg-primary/10 text-primary font-medium' : 'bg-secondary/50 text-muted-foreground'
                      }`}
                    >
                      {zoneLabels[z]}: €{zPrice}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 pb-5">
        <p className="text-xs text-muted-foreground text-center">
          Cene su informativne. Tačnu cenu dobijate na stranici za poređenje.
        </p>
      </div>
    </div>
  );
}
