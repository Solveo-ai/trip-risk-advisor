import { useState } from 'react';
import { destinations, type Destination } from '@/data/travelData';
import { MapPin, Search, ChevronDown } from 'lucide-react';

interface Props {
  selected: Destination | null;
  onSelect: (d: Destination) => void;
}

export default function DestinationPicker({ selected, onSelect }: Props) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const filtered = destinations.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-2">
      {/* Selected or trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-lg border border-input bg-card px-4 py-3 text-sm transition-colors hover:border-primary/50"
      >
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className={selected ? 'text-foreground font-medium' : 'text-muted-foreground'}>
            {selected ? selected.name : 'Izaberi destinaciju'}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="rounded-lg border border-border bg-card p-3 space-y-2 animate-fade-in-up shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pretraži..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto">
            {filtered.map((d) => (
              <button
                key={d.id}
                onClick={() => { onSelect(d); setOpen(false); setSearch(''); }}
                className={`rounded-md px-3 py-2 text-sm text-left transition-all ${
                  selected?.id === d.id
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
