import { type MedicalDestination, getIncidentIcon } from '@/data/medicalData';

interface Props {
  destination: MedicalDestination;
}

export default function HealthIncidents({ destination }: Props) {
  return (
    <div className="rounded-xl border border-warning/30 bg-warning/5 p-5 space-y-3">
      <h2 className="text-base font-semibold font-heading text-foreground flex items-center gap-2">
        <span className="text-lg">⚠️</span>
        Ovo su najčešći razlozi zašto turisti završe kod lekara u: {destination.name}
      </h2>

      <ul className="space-y-2.5">
        {destination.incidents.map((incident, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-foreground">
            <span className="text-lg leading-none mt-0.5 shrink-0">{getIncidentIcon(incident)}</span>
            <span>{incident}</span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-muted-foreground pt-1">
        Podaci na osnovu prijava putnog osiguranja i zdravstvenih upozorenja za ovu destinaciju.
      </p>
    </div>
  );
}
