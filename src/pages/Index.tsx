import { useState } from "react";
import { medicalDestinations } from "@/data/medicalData";
import DestinationSelect from "@/components/medical/DestinationSelect";
import CostTable from "@/components/medical/CostTable";
import HealthIncidents from "@/components/medical/HealthIncidents";
import DestinationRank from "@/components/medical/DestinationRank";
import InsurancePricing from "@/components/medical/InsurancePricing";
import { ExternalLink, ShieldCheck } from "lucide-react";
import policymarketLogo from "@/assets/policymarket-logo.svg";

const defaultDest = medicalDestinations.find((d) => d.id === "greece")!;

const Index = () => {
  const [destination, setDestination] = useState(defaultDest);

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-subtle)" }}>
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
            🏥 Koliko košta lečenje u inostranstvu?
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Stvarne cene lečenja u 20 najpopularnijih destinacija iz Srbije — bez putnog osiguranja.
          </p>
        </div>
      </section>

      {/* Destination picker */}
      <main className="max-w-3xl mx-auto px-4 pb-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-sm font-medium text-foreground whitespace-nowrap">Izaberite destinaciju:</label>
          <DestinationSelect selected={destination} onSelect={setDestination} />
        </div>

        {/* Section 1: Cost Table */}
        <div className="animate-fade-in-up">
          <CostTable destination={destination} />
        </div>

        {/* Section 2: Health Incidents */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
          <HealthIncidents destination={destination} />
        </div>

        {/* Section 3: Destination Rank */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <DestinationRank destination={destination} />
        </div>

        {/* Section 4: Insurance Pricing */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <InsurancePricing destination={destination} />
        </div>

        {/* CTA */}
        <div className="rounded-xl gradient-hero p-6 text-center space-y-3">
          <ShieldCheck className="h-8 w-8 mx-auto text-primary-foreground" />
          <h2 className="text-xl font-bold font-heading text-primary-foreground">Zaštitite se za manje od €2 dnevno</h2>
          <p className="text-sm text-primary-foreground/80 max-w-md mx-auto">
            Putno osiguranje pokriva sve ove troškove — uporedite cene osiguravajućih kuća u Srbiji.
          </p>
          <a
            href="https://mktg-stg.policymarket.shop/sr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-card text-foreground font-semibold py-3 px-8 rounded-lg hover:bg-card/90 transition-colors text-sm shadow-accent"
          >
            Uporedi polise osiguranja
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Footer */}
        <footer className="pt-6 pb-10 border-t border-border space-y-3">
          <div className="text-xs text-muted-foreground space-y-1.5">
            <p className="font-medium">
              Podaci prikupljeni iz sledećih izvora: gov.uk, CDC, doctorsa.com, expatistan.com,
              internationalinsurance.com, Admiral, AllClear Travel, PillInTrip{" "}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Cene su okvirne i odnose se na pacijente bez osiguranja. Stvarni troškovi mogu varirati u zavisnosti od
            bolnice i vrste tretmana.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
            <span>© 2026 PolicyMarket</span>
            <a
              href="https://policymarket.co"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              policymarket.co <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
