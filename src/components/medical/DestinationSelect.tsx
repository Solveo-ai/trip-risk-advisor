import { useState, useRef, useEffect } from 'react';
import { medicalDestinations, type MedicalDestination } from '@/data/medicalData';
import { MapPin, Search, ChevronDown } from 'lucide-react';

interface Props {
  selected: MedicalDestination;
  onSelect: (d: MedicalDestination) => void;
}

const regionOrder = ['Balkan', 'Evropa', 'Svet'] as const;

const grouped = regionOrder.map(region => ({
  region,
  destinations: medicalDestinations.filter(d => d.region === region),
}));

export default function DestinationSelect({ selected, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const q = search.toLowerCase();

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-lg border border-input bg-card px-4 py-3 text-sm transition-colors hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-foreground font-medium">{selected.name}</span>
          <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{selected.region}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1.5 rounded-lg border border-border bg-card shadow-lg p-3 space-y-2 animate-fade-in-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pretraži destinaciju..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
          </div>

          <div className="max-h-64 overflow-y-auto space-y-3">
            {grouped.map(({ region, destinations }) => {
              const filtered = destinations.filter(d => d.name.toLowerCase().includes(q));
              if (filtered.length === 0) return null;
              return (
                <div key={region}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">{region}</p>
                  <div className="grid grid-cols-2 gap-1">
                    {filtered.map(d => (
                      <button
                        key={d.id}
                        onClick={() => { onSelect(d); setOpen(false); setSearch(''); }}
                        className={`rounded-md px-3 py-2 text-sm text-left transition-all ${
                          selected.id === d.id
                            ? 'bg-primary text-primary-foreground font-medium'
                            : 'text-foreground hover:bg-secondary'
                        }`}
                      >
                        {d.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
