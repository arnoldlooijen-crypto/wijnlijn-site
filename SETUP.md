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

In Netlify, bij de site → **Domain management**:

1. Voeg **dewijnlijn.nl** toe en stel die in als **primary domain**.
2. Voeg **wijnlijn.com** en **wijnlijn.nl** toe als extra domeinen op dezelfde site.
3. Netlify stuurt bezoekers van de twee extra domeinen automatisch door (301-redirect) naar dewijnlijn.nl — daar hoef je verder niets voor in te stellen.

Daarna moet de DNS van elk domein naar Netlify wijzen:

- **Makkelijkste manier:** bij elk domein de nameservers wijzigen naar de nameservers die Netlify je geeft (Netlify beheert dan de DNS). Dit doe je bij de partij waar het domein op dit moment geregistreerd staat.
- **wijnlijn.com** én **dewijnlijn.nl** staan allebei bevestigd bij **VDX**, onder dezelfde handle (VH2023CIDYD), beide op het "Parkeren"-pakket met automatische verlenging op 09-09-2026. Log in op `mijn.vdx.nl` en wijzig voor beide domeinen de nameservers, of vervang de DNS-records door wat Netlify aangeeft. Dit kan in één sessie voor beide domeinen tegelijk.
- **wijnlijn.nl** (zonder "de") — nog niet bevestigd of die ook bij VDX zit. Bij een eerdere DNS-check wees dit domein naar een ander IP-adres dan de andere twee, dus zeker weten doe ik het niet. Check dit even in het VDX-portaal: staat wijnlijn.nl er ook tussen, dan kan alles in één keer.

DNS-wijzigingen kunnen enkele uren tot een dag nodig hebben om overal actief te worden.

## Stap 4 — Hoe teksten aanpassen straks werkt

1. Je zus opent `invulformulier.html` (via de live site-link, bijvoorbeeld `dewijnlijn.nl/invulformulier.html` — deze staat niet in het menu, dus alleen te vinden met de directe link).
2. Ze past aan wat ze wil en klikt op **Download content.json**.
3. Ze stuurt dat bestand naar jou (mail/WhatsApp).
4. Jij vervangt het bestand `content.json` in de GitHub-repository door de nieuwe versie en pusht.
5. Netlify bouwt de site binnen ongeveer een minuut automatisch opnieuw — geen verdere actie nodig.

Let op: het invulformulier is niet met een wachtwoord beveiligd. Iedereen met de directe link kan hem openen en een JSON-bestand downloaden — maar dat overschrijft niets automatisch op de live site, want alleen jij past via GitHub de echte `content.json` aan. Voor puur familiegebruik is dat prima; deel de link verder niet breed.

## Foto's (volgende fase)

Er zitten nog geen foto's in de site. Zodra die er zijn: zet ze in een map `/images` in dezelfde repository, en dan koppelen we ze in `index.html` aan de juiste plekken (portret, sfeerfoto's, etc. — zie de eerdere vragenlijst).
