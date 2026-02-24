import { useState } from 'react';
import DestinationPicker from '@/components/calculator/DestinationPicker';
import TripConfig from '@/components/calculator/TripConfig';
import TripCostSummary from '@/components/calculator/TripCostSummary';
import RiskContext from '@/components/calculator/RiskContext';
import InsuranceComparison from '@/components/calculator/InsuranceComparison';
import { type Destination, type AccommodationTier } from '@/data/travelData';
import { ChevronDown, Database, ExternalLink } from 'lucide-react';
import policymarketLogo from '@/assets/policymarket-logo.svg';

const Index = () => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [accommodation, setAccommodation] = useState<AccommodationTier>('mid');
  const [travelMode, setTravelMode] = useState<'flight' | 'car'>('flight');

  // Auto-select travel mode when destination changes
  const handleDestinationSelect = (d: Destination) => {
    setDestination(d);
    if (d.flightPriceEUR === 0 && d.carCostEUR != null) {
      setTravelMode('car');
    } else if (d.carCostEUR == null) {
      setTravelMode('flight');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-subtle)' }}>
      {/* Header */}
      <header className="bg-card border-b border-border py-4 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <img src={policymarketLogo} alt="PolicyMarket" className="h-7" />
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Kontaktirajte nas</a>
            <a href="#" className="hover:text-foreground transition-colors">Blog</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-10 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-3">
            Koliko košta tvoje putovanje?
          </h1>
          <p className="text-base text-muted-foreground max-w-lg mx-auto mb-2">
            Izaberi destinaciju i saznaj okvirne troškove za prevoz, smeštaj i osiguranje.
          </p>
          <ChevronDown className="h-5 w-5 mx-auto mt-4 animate-pulse-soft text-muted-foreground opacity-60" />
        </div>
      </section>

      {/* Calculator */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Step 1: Destination */}
        <section className="rounded-xl border border-border bg-card p-5 card-elevated">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-6 w-6 rounded-full gradient-accent flex items-center justify-center text-xs font-bold text-accent-foreground">1</span>
            <h2 className="text-base font-semibold text-foreground font-heading">Odaberite destinaciju</h2>
          </div>
          <DestinationPicker selected={destination} onSelect={handleDestinationSelect} />
        </section>

        {/* Step 2: Trip config */}
        {destination && (
          <section className="rounded-xl border border-border bg-card p-5 card-elevated animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-6 w-6 rounded-full gradient-accent flex items-center justify-center text-xs font-bold text-accent-foreground">2</span>
              <h2 className="text-base font-semibold text-foreground font-heading">Podesite detalje putovanja</h2>
            </div>
            <TripConfig
              days={days} setDays={setDays}
              travelers={travelers} setTravelers={setTravelers}
              accommodation={accommodation} setAccommodation={setAccommodation}
              travelMode={travelMode} setTravelMode={setTravelMode}
              destination={destination}
            />
          </section>
        )}

        {/* Step 3: Trip cost */}
        {destination && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-6 w-6 rounded-full gradient-accent flex items-center justify-center text-xs font-bold text-accent-foreground">3</span>
              <h2 className="text-base font-semibold text-foreground font-heading">Vaša investicija u putovanje</h2>
            </div>
            <TripCostSummary
              destination={destination}
              days={days}
              travelers={travelers}
              accommodation={accommodation}
              travelMode={travelMode}
            />
          </div>
        )}

        {/* Step 4: Risk context */}
        {destination && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-6 w-6 rounded-full gradient-accent flex items-center justify-center text-xs font-bold text-accent-foreground">4</span>
              <h2 className="text-base font-semibold text-foreground font-heading">Rizici na destinaciji</h2>
            </div>
            <RiskContext destination={destination} />
          </div>
        )}

        {/* Step 5: Insurance comparison */}
        {destination && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-6 w-6 rounded-full gradient-accent flex items-center justify-center text-xs font-bold text-accent-foreground">5</span>
              <h2 className="text-base font-semibold text-foreground font-heading">Zaštitite svoju investiciju</h2>
            </div>
            <InsuranceComparison
              destination={destination}
              days={days}
              travelers={travelers}
              accommodation={accommodation}
              travelMode={travelMode}
            />
          </div>
        )}

        {/* Credibility footer */}
        <footer className="pt-6 pb-10 border-t border-border space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Database className="h-3.5 w-3.5" />
            <span>Izvori podataka i metodologija</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Cene letova: prosečne cene iz Srbije za 2025/2026 (Google Flights, Skyscanner)</p>
            <p>• Smeštaj: proseci sa Booking.com za odabrani nivo komfora</p>
            <p>• Troškovi lečenja: WHO, evropski zdravstveni sistemi, lokalni bolnički cenovnici</p>
            <p>• Cene osiguranja: zvanični cenovnici osiguravajućih kuća u Srbiji (januar 2026)</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
            <span>© 2026 PolicyMarket</span>
            <a href="#" className="flex items-center gap-1 hover:text-foreground transition-colors">
              O platformi <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
