import { Link } from "react-router-dom";
import policymarketLogo from "@/assets/policymarket-logo.svg";
import { Button } from "@/components/ui/button";
import { openPreferences } from "@/lib/consent";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-subtle)" }}>
      <header className="bg-card border-b border-border py-4 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/">
            <img src={policymarketLogo} alt="PolicyMarket" className="h-7" />
          </Link>
          <Button size="sm" variant="outline" onClick={openPreferences}>
            Podešavanja kolačića
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground">Politika kolačića</h1>

        <section className="space-y-2">
          <h2 className="text-xl font-bold font-heading text-foreground">Šta su kolačići?</h2>
          <p className="text-sm text-muted-foreground">
            [Tekst u pripremi — molimo dostavi sadržaj.]
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold font-heading text-foreground">Koje kolačiće koristimo?</h2>
          <p className="text-sm text-muted-foreground">[Tekst u pripremi.]</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold font-heading text-foreground">Tvoja prava i izbor</h2>
          <p className="text-sm text-muted-foreground">
            U svakom trenutku možeš promeniti svoj izbor klikom na dugme ispod.
          </p>
          <Button onClick={openPreferences}>Otvori podešavanja kolačića</Button>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold font-heading text-foreground">Kontakt</h2>
          <p className="text-sm text-muted-foreground">[Tekst u pripremi.]</p>
        </section>

        <div className="pt-6">
          <Link to="/" className="text-sm text-primary underline">
            ← Nazad na početnu
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CookiePolicy;
