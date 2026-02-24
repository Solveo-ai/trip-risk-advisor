import { useState } from 'react';
import DestinationPicker from '@/components/calculator/DestinationPicker';
import TripConfig from '@/components/calculator/TripConfig';
import TripCostSummary from '@/components/calculator/TripCostSummary';
import RiskContext from '@/components/calculator/RiskContext';
import InsuranceComparison from '@/components/calculator/InsuranceComparison';
import { type Destination, type AccommodationTier } from '@/data/travelData';
import { Database, ExternalLink } from 'lucide-react';
import policymarketLogo from '@/assets/policymarket-logo.svg';

const Index = () => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [accommodation, setAccommodation] = useState<AccommodationTier>('mid');
  const [travelMode, setTravelMode] = useState<'flight' | 'car'>('flight');

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
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <img src={policymarketLogo} alt="PolicyMarket" className="h-7" />
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Kontaktirajte nas</a>
            <a href="#" className="hover:text-foreground transition-colors">Blog</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-10 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-3">
            Koliko košta tvoje putovanje?
          </h1>
          <p className="text-base text-muted-foreground max-w-lg mx-auto">
            Izaberi destinaciju i saznaj okvirne troškove za prevoz, smeštaj i osiguranje.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <main className="max-w-2xl mx-auto px-4 pb-12 space-y-6">
        {/* Combined: Destination + Config */}
        <section className="rounded-xl border border-border bg-card p-5 card-elevated space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Destinacija</label>
            <DestinationPicker selected={destination} onSelect={handleDestinationSelect} />
          </div>

          {destination && (
            <div className="pt-2 border-t border-border animate-fade-in-up">
              <TripConfig
                days={days} setDays={setDays}
                travelers={travelers} setTravelers={setTravelers}
                accommodation={accommodation} setAccommodation={setAccommodation}
                travelMode={travelMode} setTravelMode={setTravelMode}
                destination={destination}
              />
            </div>
          )}

          {destination && (
            <button
              className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors text-sm"
              onClick={() => {
                document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Izračunaj troškove
            </button>
          )}
        </section>

        {/* Results */}
        {destination && (
          <div id="results" className="space-y-6">
            {/* Trip cost */}
            <div className="animate-fade-in-up">
              <TripCostSummary
                destination={destination}
                days={days}
                travelers={travelers}
                accommodation={accommodation}
                travelMode={travelMode}
              />
            </div>

            {/* Risk context */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <RiskContext destination={destination} />
            </div>

            {/* Insurance comparison */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <InsuranceComparison
                destination={destination}
                days={days}
                travelers={travelers}
                accommodation={accommodation}
                travelMode={travelMode}
              />
            </div>
          </div>
        )}

        {/* Credibility footer */}
        <footer className="pt-6 pb-10 border-t border-border space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Database className="h-3.5 w-3.5" />
            <span>Izvori podataka i metodologija</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Cene letova: prosečne cene iz Srbije za 2025/2026 (<a href="https://www.google.com/travel/flights" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Google Flights</a>, <a href="https://www.skyscanner.net" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Skyscanner</a>)</p>
            <p>• Smeštaj: proseci sa <a href="https://www.booking.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Booking.com</a> za odabrani nivo komfora</p>
            <p>• Troškovi lečenja: WHO, evropski zdravstveni sistemi, lokalni bolnički cenovnici</p>
            <p>• Cene osiguranja: zvanični cenovnici osiguravajućih kuća u Srbiji (januar 2026)</p>
            <p>• Troškovi putarine: <a href="https://www.tolls.eu" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Tolls.eu</a>, <a href="https://www.budgetyourtrip.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">BudgetYourTrip</a></p>
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
