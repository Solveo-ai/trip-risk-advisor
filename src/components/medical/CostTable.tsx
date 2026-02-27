import { type MedicalDestination, costLabels, formatCostRange, getWorstCaseTotal, getAverageCost } from '@/data/medicalData';

interface Props {
  destination: MedicalDestination;
}

export default function CostTable({ destination }: Props) {
  const costEntries = Object.entries(destination.costs) as [keyof typeof costLabels, { min: number; max: number }][];

  // Find the row with the highest max value for highlighting
  let highestMaxKey = costEntries[0][0];
  let highestMax = 0;
  for (const [key, range] of costEntries) {
    if (range.max > highestMax) {
      highestMax = range.max;
      highestMaxKey = key;
    }
  }

  const worstCase = getWorstCaseTotal(destination.costs);
  const avgCase = getAverageCost(destination.costs);

  return (
    <div className="rounded-xl border border-border bg-card card-elevated overflow-hidden">
      <div className="p-5 pb-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">
          Troškovi lečenja u: {destination.name}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Bez putnog osiguranja — cene za pacijente koji sami plaćaju
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-border">
              <th className="text-left font-medium text-muted-foreground px-5 py-2.5">Medicinski postupak</th>
              <th className="text-right font-medium text-muted-foreground px-5 py-2.5 whitespace-nowrap">Cena (EUR)</th>
            </tr>
          </thead>
          <tbody>
            {costEntries.map(([key, range], i) => {
              const isHighest = key === highestMaxKey;
              return (
                <tr
                  key={key}
                  className={`border-t border-border transition-colors ${
                    isHighest
                      ? 'bg-destructive/5 font-semibold'
                      : i % 2 === 0
                        ? 'bg-card'
                        : 'bg-secondary/30'
                  }`}
                >
                  <td className={`px-5 py-3 ${isHighest ? 'text-foreground' : 'text-foreground'}`}>
                    {costLabels[key]}
                    {isHighest && (
                      <span className="ml-2 text-xs font-medium text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">
                        najskuplji
                      </span>
                    )}
                  </td>
                  <td className={`px-5 py-3 text-right tabular-nums whitespace-nowrap ${
                    isHighest ? 'text-destructive' : 'text-foreground'
                  }`}>
                    {formatCostRange(range)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border bg-foreground/5">
              <td className="px-5 py-3.5 font-semibold text-foreground">
                Ukupna izloženost (najgori scenario)
              </td>
              <td className="px-5 py-3.5 text-right font-bold text-destructive text-base tabular-nums">
                €{worstCase.toLocaleString('sr-RS')}
              </td>
            </tr>
            <tr className="border-t border-border bg-foreground/3">
              <td className="px-5 py-3 text-muted-foreground">
                Prosečan trošak (srednja vrednost)
              </td>
              <td className="px-5 py-3 text-right font-semibold text-foreground tabular-nums">
                €{avgCase.toLocaleString('sr-RS')}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
