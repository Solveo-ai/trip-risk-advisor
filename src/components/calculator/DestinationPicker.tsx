import { useState } from 'react';
import { destinations, type Destination } from '@/data/travelData';
import { MapPin, Search } from 'lucide-react';

interface Props {
  selected: Destination | null;
  onSelect: (d: Destination) => void;
}

export default function DestinationPicker({ selected, onSelect }: Props) {
  const [search, setSearch] = useState('');
  const filtered = destinations.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        Kuda putujete?
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Pretražite destinaciju..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-input bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
        {filtered.map((d) => (
          <button
            key={d.id}
            onClick={() => onSelect(d)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm text-left transition-all ${
              selected?.id === d.id
                ? 'border-accent bg-accent/10 text-accent-foreground font-medium shadow-sm'
                : 'border-border bg-card text-foreground hover:border-accent/50 hover:bg-secondary'
            }`}
          >
            <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">{d.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
