import { useState } from "react";
import { medicalDestinations, getWorstCaseTotal, insuranceCompanies, getDestinationZone } from "@/data/medicalData";
import DestinationSelect from "@/components/medical/DestinationSelect";
import CostTable from "@/components/medical/CostTable";
import HealthIncidents from "@/components/medical/HealthIncidents";
import DestinationRank from "@/components/medical/DestinationRank";
import InsurancePricing from "@/components/medical/InsurancePricing";
import { ExternalLink } from "lucide-react";
import policymarketLogo from "@/assets/policymarket-logo.svg";
import miskoImg from "@/assets/misko.png";

const defaultDest = medicalDestinations.find((d) => d.id === "greece")!;

const getForwardedParams = () => {
  if (typeof window === "undefined") return "";
  return (window.location.search || "") + (window.location.hash || "");
};

const Index = () => {
  const [destination, setDestination] = useState(defaultDest);
  const [email, setEmail] = useState("");
  const zone = getDestinationZone(destination.region);
  const worstCase = getWorstCaseTotal(destination.costs);
  const forwardedParams = getForwardedParams();

  const insuranceOptions = insuranceCompanies.map((ins) => ({
    provider: ins.name,
    price: ins.prices[zone].perPerson7d,
    coverage: ins.coverage,
    packages: ins.packages,
    tag: ins.tag,
  }));

  const cheapestOption = [...insuranceOptions].sort((a, b) => a.price - b.price)[0];

  const resultSnapshot = {
    destination: destination.name,
    region: destination.region,
    averageCost: destination.avg,
    rank: destination.rank,
    worstCase,

    incident1: destination.incidents[0] || "",
    incident2: destination.incidents[1] || "",
    incident3: destination.incidents[2] || "",
    incident4: destination.incidents[3] || "",
    incident5: destination.incidents[4] || "",

    cheapestProvider: cheapestOption?.provider || "",
    cheapestPrice: cheapestOption?.price || "",
    cheapestCoverage: cheapestOption?.coverage || "",
    cheapestPackages: cheapestOption?.packages || "",

    provider1: insuranceOptions[0]?.provider || "",
    price1: insuranceOptions[0]?.price || "",
    provider2: insuranceOptions[1]?.provider || "",
    price2: insuranceOptions[1]?.price || "",
    provider3: insuranceOptions[2]?.provider || "",
    price3: insuranceOptions[2]?.price || "",
    provider4: insuranceOptions[3]?.provider || "",
    price4: insuranceOptions[3]?.price || "",
    provider5: insuranceOptions[4]?.provider || "",
    price5: insuranceOptions[4]?.price || "",
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleEmailSubmit = async () => {
    if (!email || submitting) return;
    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-medical-cost-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ email, ...resultSnapshot }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Submit error:", err);
        setSubmitStatus("error");
      } else {
        setSubmitStatus("success");
        setEmail("");
      }
    } catch (e) {
      console.error("Submit error:", e);
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-subtle)" }}>
      {/* Header */}
      <header className="bg-card border-b border-border py-4 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a
            href={`https://policymarket.shop/sr${forwardedParams}`}
            target="_blank"
            rel="noopener"
          >
            <img src={policymarketLogo} alt="PolicyMarket" className="h-7" />
          </a>
          <a
            href={`https://app.policymarket.shop/sr-RS${window.location.search}`}
            target="_blank"
            rel="noopener"
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
            Pogledaj stvarne cene lečenja u 20 najpopularnijih destinacija iz Srbije — i koliko bi te to koštalo iz svog
            džepa.
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

        {/* Email form */}
        <div className="text-center py-2 space-y-2">
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tvoj email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSubmitStatus("idle");
              }}
              className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              onClick={handleEmailSubmit}
              disabled={submitting || !email}
              className="h-10 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap disabled:opacity-50"
            >
              {submitting ? "Šaljem..." : "Pošalji mi detaljan pregled troškova"}
            </button>
          </div>
          {submitStatus === "success" && (
            <p className="text-sm text-green-600">✓ Pregled troškova je poslat na tvoj email!</p>
          )}
          {submitStatus === "error" && <p className="text-sm text-destructive">Došlo je do greške. Pokušaj ponovo.</p>}
        </div>

        {/* CTA */}
        <div className="rounded-xl gradient-hero p-6 text-center space-y-4">
          <div className="flex flex-col items-center gap-2">
            <img
              src={miskoImg}
              alt="Miško"
              className="h-24 w-24 rounded-full object-cover border-2 border-primary-foreground/30 shadow-lg"
            />
            <p className="text-sm font-medium text-primary-foreground/90 italic">Koji je Miškov savet za tebe?</p>
          </div>
          <h2 className="text-xl font-bold font-heading text-primary-foreground">
            Ne daj Bože, ali ako se nešto desi, neka te to košta manje od €2 dnevno, a ne €800.
          </h2>
          <p className="text-sm text-primary-foreground/80 max-w-md mx-auto">
            Putno osiguranje pokriva sve ove troškove. Uporedi cene osiguravajućih kuća u Srbiji.
          </p>
          <a
            href={`https://app.policymarket.shop/sr-RS${window.location.search}`}
            target="_blank"
            rel="noopener"
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
            Cene su okvirne i odnose se na pacijente bez osiguranja. Stvarni troškovi mogu varirati u zavisnosti od
            bolnice i vrste tretmana.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
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
