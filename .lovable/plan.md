# Plan: Cookie Banner + GTM Consent Mode v2

## Cilj
Dodati GDPR-friendly cookie banner sa granularnim kategorijama (Neophodni / Analitika / Marketing) koji upravlja Google Consent Mode v2 signalima ka GTM-u.

## Šta se dodaje

### 1. Default consent (denied) u `index.html`
Pre GTM snippet-a postaviti default Consent Mode v2 na `denied` za sve kategorije osim `security_storage`. Ovo osigurava da GTM/GA/Ads ne pucaju kolačiće dok korisnik ne pristane.

```html
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });
</script>
<!-- postojeci GTM snippet ide ispod -->
```

### 2. Novi komponenti
- `src/components/cookies/CookieBanner.tsx` — fiksni banner na dnu ekrana sa 3 dugmeta: **Prihvati sve**, **Odbij sve**, **Podesi**. Tekst na srpskom.
- `src/components/cookies/CookiePreferences.tsx` — modal/sheet sa 3 toggle-a:
  - Neophodni (uvek ON, disabled)
  - Analitika (`analytics_storage`)
  - Marketing (`ad_storage`, `ad_user_data`, `ad_personalization`)
- `src/lib/consent.ts` — helper sa `getConsent()`, `setConsent(prefs)`, `hasConsented()`. Čuva u `localStorage` pod `pm_cookie_consent_v1` (verzija + timestamp + prefs). Poziva `gtag('consent', 'update', {...})`.

### 3. Mount u `src/App.tsx`
`<CookieBanner />` renderuje se globalno, prikazuje se samo ako `!hasConsented()`.

### 4. Link u footeru
U `src/pages/Index.tsx` footer dodati link **"Podešavanja kolačića"** koji ponovo otvara preferences modal (preko shared store-a / custom event-a).

### 5. Stranica `/cookie-policy`
- Nova ruta u `src/App.tsx`: `<Route path="/cookie-policy" element={<CookiePolicy />} />`
- `src/pages/CookiePolicy.tsx` sa placeholder sekcijama (Šta su kolačići / Koje kolačiće koristimo / Tvoja prava / Kontakt) — tekst ćeš ti dostaviti, ja postavljam strukturu i `<Helmet>` SEO.
- Link na stranicu iz banera ("Saznaj više") i footera.

## Tehnički detalji

- **Storage key**: `pm_cookie_consent_v1` = `{ version: 1, timestamp, analytics: bool, marketing: bool }`
- **Re-prompt**: ako `version` ne odgovara aktuelnoj, baner se ponovo prikazuje.
- **SSR safe**: sve `localStorage`/`window` pozive čuvati iza `typeof window !== 'undefined'`.
- **Stilizovanje**: koristi postojeće semantic tokene (`bg-card`, `border-border`, `text-foreground`, primary CTA varijanta). Banner: `fixed bottom-4 inset-x-4 z-50 rounded-xl shadow-lg` (responsive).
- **Tipografija**: Inter, u skladu sa brand identitetom.
- **A11y**: focus trap u preferences modalu (koristi shadcn `Dialog`/`Sheet`), ESC zatvara.

## Šta NIJE u opsegu
- Konfiguracija GTM tag-ova (to se radi u GTM UI — postojeći tagovi treba da poštuju Consent Mode signale).
- Tekst cookie policy stranice (čekamo od tebe).
- Geo-targeting (banner se prikazuje svima).

## Fajlovi koji se menjaju
- `index.html` — dodati default consent script pre GTM
- `src/App.tsx` — mount banner-a + nova ruta
- `src/pages/Index.tsx` — link u footeru
- **Novi**: `src/lib/consent.ts`, `src/components/cookies/CookieBanner.tsx`, `src/components/cookies/CookiePreferences.tsx`, `src/pages/CookiePolicy.tsx`
