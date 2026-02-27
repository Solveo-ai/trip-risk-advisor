import { type MedicalDestination, MAX_AVG, getCostTierLabel } from '@/data/medicalData';

interface Props {
  destination: MedicalDestination;
}

export default function DestinationRank({ destination }: Props) {
  const fillPercent = Math.min((destination.avg / MAX_AVG) * 100, 100);
  const tier = getCostTierLabel(destination.avg);

  const barColor =
    tier.tier === 'low' ? 'bg-success' :
    tier.tier === 'medium' ? 'bg-warning' :
    'bg-destructive';

  const labelColor =
    tier.tier === 'low' ? 'text-success' :
    tier.tier === 'medium' ? 'text-warning' :
    'text-destructive';

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 card-elevated">
      <h2 className="text-base font-semibold font-heading text-foreground">
        Rang destinacije po troškovima lečenja
      </h2>

      {/* Tier label */}
      <div className={`text-sm font-medium ${labelColor} flex items-center gap-1.5`}>
        <span>{tier.emoji}</span>
        <span>{tier.label}</span>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-3 rounded-full bg-secondary overflow-hidden">
          <div
            className={`h-full rounded-full ${barColor} transition-all duration-700 ease-out`}
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Jeftinije</span>
          <span>Skuplje</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <p className="text-sm text-muted-foreground">Prosečan trošak po kategoriji</p>
          <p className="text-xl font-bold font-heading text-foreground">€{destination.avg}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Rang</p>
          <p className="text-xl font-bold font-heading text-foreground">
            {destination.rank}. <span className="text-sm font-normal text-muted-foreground">od 20</span>
          </p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">1 = najjeftinija destinacija</p>
    </div>
  );
}
