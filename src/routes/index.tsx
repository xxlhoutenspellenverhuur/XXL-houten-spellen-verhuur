import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageCircle, MapPin, Check, Mail } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Photo } from "@/components/site/Photo";
import { ContactForm, type Sel } from "@/components/site/ContactForm";
import { site, games, pkg, separateTotal, euro, photos, waLink } from "@/config/site";

const TITLE = "XXL houten spellen huren in Eindhoven | XXL Hollandse Spellen";
const DESC =
  "Huur handgemaakte XXL houten spellen in Eindhoven: XXL Jenga, zenuwspiraal, knikkerdoolhof en pittenzak gooien. Per stuk vanaf €12,50 of alle vier voor €49 per dag.";

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
            <p className="eyebrow text-wood-light">XXL Hollandse Spellen · Eindhoven</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-7xl">
              Handgemaakt XXL spellen voor jouw feest of evenement
            </h1>
            <p className="mt-6 max-w-xl text-lg opacity-90 md:text-xl">
              Wij verhuren XXL houten spellen voor jullie vermaak. Alle spellen hebben we zelf gemaakt en zijn per stuk of als pakket te huur.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#spellen" className="rounded-lg bg-cta px-6 py-4 text-center font-bold text-cta-foreground transition hover:brightness-110">
                Bekijk onze spellen
              </a>
              <button onClick={() => request("pakket")} className="rounded-lg border-2 border-forest-foreground/70 px-6 py-4 font-bold transition hover:bg-forest-foreground/10">
                Pakket: alle vier voor €49
              </button>
            </div>
          </div>
        </section>

        {/* SPELLEN */}
        <section id="spellen" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="eyebrow text-accent">Onze spellen</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-extrabold md:text-5xl">Wat je bij ons kunt huren</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Voor verjaardagen, borrels, bedrijfsfeesten, studentenactiviteiten of een bruiloft. Prijzen zijn per dag.
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
                    <p className="shrink-0 text-right font-display text-xl font-bold text-accent">
                      {euro(g.price)}<span className="text-sm font-medium text-muted-foreground"> /dag</span>
                      <span className="block font-sans text-xs font-medium text-muted-foreground">+ borg</span>
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
                Huur alle vier de spellen samen voor één vaste prijs.
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
              <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">Aanvraag doen</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Laat weten wanneer en welke spellen je wilt huren. We reageren zelf en checken of ze vrij zijn.
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
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:justify-between">
          <div>
            <p className="font-display text-xl font-extrabold">{site.name}</p>
            <p className="eyebrow mt-1 text-wood-light">{site.tagline}</p>
            <a href={`mailto:${site.email}`} className="mt-4 inline-flex items-center gap-2 text-sm hover:underline">
              <Mail className="h-4 w-4" /> {site.email}
            </a>
          </div>
          <ul className="space-y-2 text-sm">
            {site.phones.map((p) => (
              <li key={p.tel} className="flex items-center gap-3">
                <a href={`tel:${p.tel}`} className="inline-flex items-center gap-2 hover:underline"><Phone className="h-4 w-4" /> {p.display}</a>
                <a href={waLink(p.wa)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${p.display}`} className="inline-flex items-center gap-1 rounded-full border border-forest-foreground/30 px-2.5 py-0.5 text-xs hover:bg-forest-foreground/10">
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="border-t border-forest-foreground/15 py-4 text-center text-xs opacity-70">
          © {new Date().getFullYear()} {site.name} · <a href="/privacy" className="hover:underline">Privacy</a>
        </p>
      </footer>
    </div>
  );
}
