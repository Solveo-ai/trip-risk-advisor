import { useState } from 'react';
import { medicalDestinations } from '@/data/medicalData';
import DestinationSelect from '@/components/medical/DestinationSelect';
import CostTable from '@/components/medical/CostTable';
import HealthIncidents from '@/components/medical/HealthIncidents';
import DestinationRank from '@/components/medical/DestinationRank';
import InsurancePricing from '@/components/medical/InsurancePricing';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import policymarketLogo from '@/assets/policymarket-logo.svg';
import miskoImg from '@/assets/misko.png';

const defaultDest = medicalDestinations.find(d => d.id === 'greece')!;

const Index = () => {
  const [destination, setDestination] = useState(defaultDest);

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-subtle)' }}>
      {/* Header */}
      <header className="bg-card border-b border-border py-4 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <img src={policymarketLogo} alt="PolicyMarket" className="h-7" />
          <a
            href="https://mktg-stg.policymarket.shop/sr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
          >
            Uporedi polise <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="py-10 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-3">
            Ne daj Bože da ti se nešto desi na putu. Bez osiguranja.
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Pogledaj stvarne cene lečenja u 20 najpopularnijih destinacija iz Srbije — i koliko bi te to koštalo iz svog džepa.
          </p>
        </div>
      </section>

      {/* Destination picker */}
      <main className="max-w-3xl mx-auto px-4 pb-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-sm font-medium text-foreground whitespace-nowrap">Gde putuješ?</label>
          <DestinationSelect selected={destination} onSelect={setDestination} />
        </div>

        {/* Section 1: Cost Table */}
        <div className="animate-fade-in-up">
          <CostTable destination={destination} />
        </div>

        {/* Section 2: Health Incidents */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <HealthIncidents destination={destination} />
        </div>

        {/* Section 3: Destination Rank */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <DestinationRank destination={destination} />
        </div>

        {/* Section 4: Insurance Pricing */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <InsurancePricing destination={destination} />
        </div>

        {/* CTA */}
        <div className="rounded-xl gradient-hero p-6 text-center space-y-4">
          <div className="flex flex-col items-center gap-2">
            <img src={miskoImg} alt="Miško" className="h-24 w-24 rounded-full object-cover border-2 border-primary-foreground/30 shadow-lg" />
            <p className="text-sm font-medium text-primary-foreground/90 italic">Koji je Miškov savet za tebe?</p>
          </div>
          <h2 className="text-xl font-bold font-heading text-primary-foreground">
            Ne daj Bože, ali ako se nešto desi, neka te to košta manje od €2 dnevno, a ne €800.
          </h2>
          <p className="text-sm text-primary-foreground/80 max-w-md mx-auto">
            Putno osiguranje pokriva sve ove troškove. Uporedi cene osiguravajućih kuća u Srbiji.
          </p>
          <a
            href="https://mktg-stg.policymarket.shop/sr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-card text-foreground font-semibold py-3 px-8 rounded-lg hover:bg-card/90 transition-colors text-sm shadow-accent"
          >
            Uporedi polise osiguranja →
          </a>
        </div>

        {/* Footer */}
        <footer className="pt-6 pb-10 border-t border-border space-y-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Podaci su prikupljeni sa: </span>
            gov.uk, CDC, doctorsa.com, expatistan.com, internationalinsurance.com, Admiral, AllClear Travel, PillInTrip
          </p>
          <p className="text-xs text-muted-foreground">
            Cene su okvirne i odnose se na pacijente bez osiguranja. Stvarni troškovi mogu varirati u zavisnosti od bolnice i vrste tretmana.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
            <span>© 2026 PolicyMarket</span>
            <a href="https://policymarket.co" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-foreground transition-colors">
              policymarket.co <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
