import { medicalDestinations, type MedicalDestination, getCostTierLabel } from '@/data/medicalData';

interface Props {
  destination: MedicalDestination;
}

export default function DestinationRank({ destination }: Props) {
  const sorted = [...medicalDestinations].sort((a, b) => a.avg - b.avg);
  const rank = sorted.findIndex(d => d.id === destination.id) + 1;
  const tier = getCostTierLabel(destination.avg);
  const barWidth = Math.max((destination.avg / 281) * 100, 4);

  const barColor =
    tier.tier === 'low' ? 'bg-success' :
    tier.tier === 'medium' ? 'bg-warning' :
    'bg-destructive';

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 card-elevated">
      <h2 className="text-base font-semibold font-heading text-foreground">
        📊 Rang destinacije po troškovima lečenja
      </h2>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">{destination.name}</span>
          <span className="text-muted-foreground tabular-nums">€{destination.avg} prosek</span>
        </div>
        <div className="h-3 rounded-full bg-secondary overflow-hidden">
          <div
            className={`h-full rounded-full ${barColor} transition-all duration-500`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{tier.label}</span>
          <span>{rank}. od 20 destinacija (1 = najjeftinija)</span>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground border-t border-border">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success inline-block" /> ≤€56</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning inline-block" /> €57–€127</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive inline-block" /> ≥€128</span>
      </div>
    </div>
  );
}
