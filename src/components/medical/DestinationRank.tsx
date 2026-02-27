import { medicalDestinations, type MedicalDestination, getCostTierLabel } from '@/data/medicalData';

interface Props {
  destination: MedicalDestination;
}

export default function DestinationRank({ destination }: Props) {
  // Sort all destinations by avg descending (most expensive first)
  const sorted = [...medicalDestinations].sort((a, b) => b.avg - a.avg);

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-3 card-elevated">
      <h2 className="text-base font-semibold font-heading text-foreground">
        📊 Rang destinacija po troškovima lečenja
      </h2>
      <p className="text-xs text-muted-foreground">
        Od najskuplje do najjeftinije — prosečan trošak po kategoriji
      </p>

      <div className="space-y-1.5">
        {sorted.map((dest, i) => {
          const isSelected = dest.id === destination.id;
          const tier = getCostTierLabel(dest.avg);
          const barWidth = Math.max((dest.avg / 281) * 100, 4);

          const barColor =
            tier.tier === 'low' ? 'bg-success' :
            tier.tier === 'medium' ? 'bg-warning' :
            'bg-destructive';

          return (
            <div
              key={dest.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                isSelected
                  ? 'bg-primary/10 border border-primary/20'
                  : 'hover:bg-secondary/30'
              }`}
            >
              <span className="text-xs text-muted-foreground w-5 text-right tabular-nums">
                {i + 1}.
              </span>
              <span className={`flex-shrink-0 w-24 truncate ${isSelected ? 'font-semibold text-foreground' : 'text-foreground'}`}>
                {dest.name}
              </span>
              <div className="flex-1 h-2.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full rounded-full ${barColor} transition-all duration-500`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <span className={`text-xs tabular-nums w-12 text-right ${isSelected ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
                €{dest.avg}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground border-t border-border">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success inline-block" /> ≤€56</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning inline-block" /> €57–€127</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive inline-block" /> ≥€128</span>
      </div>
    </div>
  );
}
