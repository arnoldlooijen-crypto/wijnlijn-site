# De Wijnlijn — website opzetten

## Wat zit er in deze map

De site bestaat nu uit **losse pagina's** in plaats van één lange scrollpagina, met gedeelde bestanden voor stijl en logica:

- `index.html` — homepage (hero + korte teaser naar de drie onderdelen)
- `proeverijen.html` — de drie proeverij-varianten
- `training.html` — wijntraining
- `wijn-spijs.html` — wijn & spijs
- `over-mij.html` — persoonlijk verhaal + reacties van gasten
- `contact.html` — contactgegevens
- `styles.css` — alle opmaak, gedeeld door elke pagina
- `site.js` — gedeelde logica: menu, animaties, content laden
- `fallback-content.js` — ingebouwde reservetekst (zie hieronder)
- `content.json` — alle teksten en prijzen (verandert regelmatig)
- `invulformulier.html` — los formulier waarmee je zus `content.json` overzichtelijk kan bewerken
- `netlify.toml` — instellingen voor Netlify

Omdat stijl (`styles.css`) en logica (`site.js`) nu gedeeld zijn, kun je straks een nieuwe pagina toevoegen door gewoon een nieuw HTML-bestand met dezelfde `<head>`-verwijzingen en een eigen `<script>`-blokje te maken — de opmaak volgt vanzelf mee.

**Betrouwbaarheid:** als `content.json` om wat voor reden dan ook niet geladen kan worden (bijvoorbeeld bij lokaal openen zonder server), springt elke pagina automatisch terug op de tekst in `fallback-content.js`, zodat er nooit een lege pagina verschijnt.

## Stap 1 — GitHub

1. Maak op github.com een nieuwe (privé of publieke) repository, bijvoorbeeld `wijnlijn-site`.
2. Zet alle bestanden uit deze map in die repository en push ze naar de `main`-branch.

## Stap 2 — Netlify

1. Log in op netlify.com → **Add new site → Import an existing project**.
2. Kies GitHub, geef toegang, selecteer de `wijnlijn-site`-repository.
3. Build command: laat leeg. Publish directory: `.` (root). Er is geen build-stap nodig, het is pure HTML/CSS/JS.
4. Klik **Deploy**. Je krijgt een tijdelijke `iets.netlify.app`-link om te testen.

## Stap 3 — Domeinen koppelen

Domeinen van De Wijnlijn: **dewijnlijn.nl** (primair), **dewijnlijn.com** en **wijnlijn.com**. Alle drie geregistreerd via VDX, nameservers bij Netlify DNS (`dns1` t/m `dns4.p04.nsone.net`).

**wijnlijn.nl is NIET van De Wijnlijn.** Geregistreerd sinds 1999 bij EuroDNS door een andere partij; wijst naar een server van Team Internet AG (domeinparkeerder). Niet toevoegen in Netlify.

In Netlify, bij de site → **Domain management**:

1. **dewijnlijn.nl** is het primary domain.
2. Voeg **dewijnlijn.com** en **wijnlijn.com** toe als domain alias (knop staat onderaan; max. ±3 wijzigingen per uur).
3. Zet per alias **Netlify DNS** aan (Options → Set up Netlify DNS). Netlify toont dan nameservers: moeten `dns1` t/m `dns4.p04.nsone.net` zijn, anders via helpdesk@vdx.nl laten aanpassen.
4. Netlify stuurt aliassen automatisch door (301) naar dewijnlijn.nl en regelt het HTTPS-certificaat.

Status 16 okt 2026: dewijnlijn.nl en www.dewijnlijn.nl werken. dewijnlijn.com en wijnlijn.com geven een DNS-fout (SERVFAIL, "lame delegation"): de registry verwijst naar Netlify DNS, maar daar bestaat geen zone voor deze domeinen. Stap 2 en 3 hierboven lossen dat op.

## Stap 4 — Hoe teksten aanpassen straks werkt

1. Je zus opent `invulformulier.html` (via de live site-link, bijvoorbeeld `dewijnlijn.nl/invulformulier.html` — deze staat niet in het menu, dus alleen te vinden met de directe link).
2. Ze past aan wat ze wil en klikt op **Download content.json**.
3. Ze stuurt dat bestand naar jou (mail/WhatsApp).
4. Jij vervangt het bestand `content.json` in de GitHub-repository door de nieuwe versie en pusht.
5. Netlify bouwt de site binnen ongeveer een minuut automatisch opnieuw — geen verdere actie nodig.

Let op: het invulformulier is niet met een wachtwoord beveiligd. Iedereen met de directe link kan hem openen en een JSON-bestand downloaden — maar dat overschrijft niets automatisch op de live site, want alleen jij past via GitHub de echte `content.json` aan. Voor puur familiegebruik is dat prima; deel de link verder niet breed.

## Huisstijl (definitief, oktober 2026)

- **Kleuren:** navy `#172234`, goud `#D4B676`, crème `#F3EAD8` (tekst op navy), papier `#F8F3E9` (lichte vlakken). Goud voor tekst op licht: `#7D5F27`.
- **Lettertypes:** Poppins (koppen, menu, knoppen) en EB Garamond (lopende tekst, tagline). Staan lokaal in `/fonts`, dus geen verbinding met Google nodig.
- **Logo:** `images/logo-de-wijnlijn.png` (+ `.webp`), goud op transparant, alleen bedoeld voor donkere achtergrond. Gemaakt uit de definitieve logobestanden.
- **Iconen en delen:** `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`; `images/og-image.jpg` is het plaatje dat verschijnt als iemand een link deelt (WhatsApp, LinkedIn e.d.).

## Foto's

Staan in `/images` (pety-rood, pety-wit, druiven-1, druiven-2, wijnboek). Nieuwe foto's daar neerzetten en in de HTML of `content.json` naar het bestand verwijzen.
