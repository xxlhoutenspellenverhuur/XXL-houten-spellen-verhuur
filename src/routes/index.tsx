import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Cake, GraduationCap, Briefcase, Users, Wine, Heart, Phone, MessageCircle, Hammer, MapPin, Check, ChevronDown } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Photo } from "@/components/site/Photo";
import { ContactForm } from "@/components/site/ContactForm";
import { site, games, pkg, separateTotal, euro, photos, waLink, type GameId } from "@/config/site";

const TITLE = "XXL houten spellen huren in Eindhoven | XXL Hollandse Spellen";
const DESC =
  "Huur handgemaakte XXL houten spellen in Eindhoven: XXL Jenga, zenuwspiraal, knikkerdoolhof en pittenzak gooien. Los vanaf €12,50 of alle vier voor €49 per dag.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "nl_NL" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: site.domain ? [{ rel: "canonical", href: site.domain + "/" }] : [],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: site.name,
          description: DESC,
          telephone: site.phones.map((p) => p.tel),
          areaServed: "Eindhoven",
          ...(site.domain ? { url: site.domain } : {}),
          ...(site.email ? { email: site.email } : {}),
        }),
      },
    ],
  }),
  component: Index,
});

type Sel = GameId | "pakket";

const faqs = [
  ["Welke spellen kan ik huren?", "Je kunt kiezen uit XXL Jenga, de zenuwspiraal, het XXL houten knikkerdoolhof en pittenzak gooien. Je kunt de spellen los huren of samen als pakket voor €49 per dag."],
  ["Wat kost het huren van de spellen?", "XXL Jenga kost €12,50 per dag, de zenuwspiraal €20 per dag, het XXL houten knikkerdoolhof €12,50 per dag en pittenzak gooien €12,50 per dag. Het pakket met alle vier de spellen kost €49 per dag."],
  ["Waar kan ik de spellen ophalen?", "Ophalen kan in Eindhoven, in de omgeving van bedrijventerrein De Hurk. We stemmen de exacte locatie en praktische afspraken persoonlijk met je af."],
  ["Kan ik de spellen huren voor mijn feest of evenement?", "Ja, de spellen zijn bedoeld voor uiteenlopende feesten en evenementen, van verjaardagen en borrels tot studentenactiviteiten en bedrijfsfeesten."],
  ["Hoe weet ik of de spellen beschikbaar zijn?", "Stuur ons een aanvraag met de gewenste datum en spellen. We controleren de beschikbaarheid en bevestigen de afspraken persoonlijk."],
  ["Bezorgen jullie de spellen?", "Op dit moment gaan we uit van ophalen in Eindhoven. We bieden op de website geen bezorgservice aan."],
  ["Hoe kan ik een aanvraag doen?", "Je kunt het contactformulier invullen, ons bellen of via WhatsApp contact opnemen."],
];

const occasions = [
  [Cake, "Verjaardagen en tuinfeesten"],
  [GraduationCap, "Studentenfeesten en verenigingen"],
  [Briefcase, "Bedrijfsfeesten en teamdagen"],
  [Users, "Familie- en buurtfeesten"],
  [Wine, "Borrelmiddagen"],
  [Heart, "Bruiloften en evenementen"],
] as const;

function Index() {
  const [selected, setSelected] = useState<Sel[]>([]);
  const request = (id: Sel) => {
    setSelected((s) => (s.includes(id) ? s : [...s, id]));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="top" className="overflow-x-hidden">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-card focus:p-3">
        Naar de inhoud
      </a>
      <Header onRequestPackage={() => request("pakket")} />

      <main id="main">
        {/* HERO */}
        <section className="relative flex min-h-[92svh] items-end bg-forest text-forest-foreground">
          <Photo photo={photos.hero} eager className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-32 md:pb-20">
            <p className="eyebrow text-wood-light">Handgemaakt in Eindhoven</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.95] sm:text-6xl md:text-8xl">
              Grote spellen. Goede momenten.
            </h1>
            <p className="mt-6 max-w-xl text-lg opacity-90 md:text-xl">
              Op zoek naar iets leuks voor je feest, borrel of evenement? Huur onze zelfgemaakte XXL houten spellen en maak er samen iets bijzonders van.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#spellen" className="rounded-lg bg-cta px-6 py-4 text-center font-bold text-cta-foreground transition hover:brightness-110">
                Bekijk onze spellen
              </a>
              <button onClick={() => request("pakket")} className="rounded-lg border-2 border-forest-foreground/70 px-6 py-4 font-bold transition hover:bg-forest-foreground/10">
                Vraag het XXL-pakket aan — €49 per dag
              </button>
            </div>
            <p className="mt-8 text-sm font-medium opacity-80">
              Zelf gemaakt in Eindhoven · Ophalen in Eindhoven · Voor feesten en evenementen
            </p>
          </div>
        </section>

        {/* SPELLEN */}
        <section id="spellen" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="eyebrow text-accent">XXL houten spellen huren</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-extrabold md:text-5xl">Maak van ieder feest een spelletje</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Van een fanatieke uitdaging met vrienden tot een gezellige activiteit met collega's: onze handgemaakte houten spellen zorgen voor plezier, competitie en mooie momenten.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {games.map((g) => (
              <article key={g.id} className="flex flex-col overflow-hidden rounded-2xl bg-card shadow-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <Photo photo={g.photo} className="h-full w-full transition duration-500 hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl font-bold">{g.name}</h3>
                    <p className="shrink-0 font-display text-xl font-bold text-accent">
                      {euro(g.price)}<span className="text-sm font-medium text-muted-foreground"> /dag</span>
                    </p>
                  </div>
                  <p className="mt-3 text-muted-foreground">{g.description}</p>
                  {g.detail && <p className="mt-3 text-sm font-semibold">{g.detail}</p>}
                  <button onClick={() => request(g.id)} className="mt-6 self-start rounded-lg border-2 border-primary px-5 py-3 font-bold text-primary transition hover:bg-primary hover:text-primary-foreground">
                    Vraag dit spel aan
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PAKKET */}
        <section className="bg-forest text-forest-foreground">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
            <div>
              <p className="eyebrow text-wood-light">Het XXL-pakket</p>
              <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">Vier spellen. Eén compleet pakket.</h2>
              <p className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-6xl font-extrabold text-wood-light">€49</span>
                <span className="text-lg">per dag</span>
              </p>
              <p className="mt-2 text-sm opacity-80">
                Los samen {euro(separateTotal)} — je bespaart {euro(separateTotal - pkg.price)}
              </p>
              <p className="mt-6 text-lg opacity-90">
                Liever meteen goed uitpakken? Huur alle vier onze XXL houten spellen samen voor één vaste pakketprijs. Ideaal voor een feest, familiedag, studentenactiviteit, borrel of bedrijfsuitje.
              </p>
              <ul className="mt-6 space-y-2">
                {games.map((g) => (
                  <li key={g.id} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-wood-light" /> {g.name}
                  </li>
                ))}
              </ul>
              <button onClick={() => request("pakket")} className="mt-8 rounded-lg bg-cta px-6 py-4 font-bold text-cta-foreground transition hover:brightness-110">
                Vraag het XXL-pakket aan
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {games.map((g, i) => (
                <div key={g.id} className={`overflow-hidden rounded-xl ${i % 2 ? "mt-8" : ""}`}>
                  <Photo photo={g.photo} className="aspect-square h-full w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OVER ONS */}
        <section id="verhaal" className="bg-secondary">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
            <div className="overflow-hidden rounded-2xl shadow-card">
              <Photo photo={photos.story} className="aspect-[4/3] h-full w-full" />
            </div>
            <div>
              <p className="eyebrow text-accent">Over ons</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Hoi, wij zijn Eric en Timo</h2>
              <div className="mt-5 space-y-4 text-secondary-foreground">
                <p>Wij zijn Eric en Timo, twee studenten met altijd al grote dromen. Met een gedeelde liefde voor klussen, spelletjes spelen en dingen organiseren, presenteren wij ons eigen bedrijfje.</p>
                <p>We hebben vaak ideeën en zijn deze keer, in plaats van alleen plannen te maken, echt aan de slag gegaan. We hebben onze eigen XXL houten spellen bedacht, ontworpen en gemaakt in Eindhoven.</p>
                <p>Wat begon met het idee om één spel te maken, beviel erg goed. Inmiddels zitten we al op vier spellen, en er komen er nog meer.</p>
                <p>We vinden het mooi dat mensen veel plezier beleven aan onze zelfgemaakte spellen. Daarom verhuren we ze aan iedereen die zijn feest, borrel of evenement net wat leuker wil maken.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {[["E", "Eric", "Applied Physics"], ["T", "Timo", "Urban Systems and Real Estate"]].map(([i, n, s]) => (
                  <div key={n} className="flex items-center gap-3 rounded-full bg-card py-2 pl-2 pr-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{i}</span>
                    <span className="text-sm"><strong>{n}</strong> — {s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <p className="eyebrow text-accent">Contact</p>
              <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">Welk spel maakt jouw feest compleet?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Vertel ons wat je organiseert en welke spellen je wilt huren. We nemen persoonlijk contact met je op om de mogelijkheden te bespreken.
              </p>
              <div className="mt-8 rounded-xl border bg-card p-5">
                <p className="text-sm text-muted-foreground">Liever mailen?</p>
                <a href={`mailto:${site.email}`} className="mt-1 inline-flex items-center gap-2 break-all font-display text-lg font-bold text-primary hover:underline">
                  <Mail className="h-5 w-5 shrink-0" /> {site.email}
                </a>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Ophalen in Eindhoven (omgeving De Hurk)</li>
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" /> Bij verhuur vragen we een borg</li>
              </ul>
            </div>
            <ContactForm selected={selected} setSelected={setSelected} />
          </div>
        </section>
      </main>

      <footer className="bg-forest text-forest-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-extrabold">{site.name}</p>
            <p className="eyebrow mt-1 text-wood-light">{site.tagline}</p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
            <a href="#spellen" className="hover:underline">Onze spellen</a>
            <a href="#verhaal" className="hover:underline">Ons verhaal</a>
            <a href="#zo-werkt-het" className="hover:underline">Zo werkt het</a>
            <a href="#contact" className="hover:underline">Contact</a>
            <a href="/privacy" className="hover:underline">Privacybeleid</a>
          </nav>
          <div className="space-y-2 text-sm">
            {site.phones.map((p) => (
              <p key={p.tel}>
                <a href={`tel:${p.tel}`} className="hover:underline">{p.display}</a> ·{" "}
                <a href={waLink(p.wa)} target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp</a>
              </p>
            ))}
            {site.email && <p><a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a></p>}
          </div>
        </div>
        <p className="border-t border-forest-foreground/15 py-5 text-center text-xs opacity-70">
          © {new Date().getFullYear()} {site.name}
        </p>
      </footer>

      {/* Compacte WhatsApp-knop op mobiel */}
      <a
        href={waLink(site.phones[0].wa)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Neem contact op via WhatsApp"
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card md:hidden"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
