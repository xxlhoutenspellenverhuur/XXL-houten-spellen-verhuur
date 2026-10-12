import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageCircle, Mail } from "lucide-react";
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
        <section id="spellen" className="mx-auto max-w-5xl px-5 py-16 md:py-24">
          <h2 className="text-3xl font-extrabold md:text-4xl">Onze spellen</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Prijzen zijn per dag, plus een borg. Je haalt de spellen op in Eindhoven.
          </p>
          <div className="mt-10 divide-y divide-border border-y">
            {games.map((g, i) => (
              <article key={g.id} className="grid items-center gap-6 py-8 md:grid-cols-2 md:gap-10">
                <div className={i % 2 ? "md:order-2" : ""}>
                  <Photo photo={g.photo} className="aspect-[4/3] h-full w-full rounded-md" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{g.name}</h3>
                  <p className="mt-1 font-display text-lg font-bold text-accent">
                    {euro(g.price)} per dag <span className="font-sans text-sm font-medium text-muted-foreground">+ borg</span>
                  </p>
                  <p className="mt-3 text-muted-foreground">{g.description}</p>
                  {g.detail && <p className="mt-2 text-sm">{g.detail}</p>}
                  <button onClick={() => request(g.id)} className="mt-5 font-bold text-primary underline underline-offset-4 hover:text-accent">
                    Vraag dit spel aan →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PAKKET */}
        <section className="bg-forest text-forest-foreground">
          <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-20">
            <div>
              <p className="eyebrow text-wood-light">Het XXL-pakket</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Alle vier de spellen</h2>
              <p className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-5xl font-extrabold text-wood-light">€49</span>
                <span className="text-lg">per dag</span>
              </p>
              <p className="mt-2 text-sm opacity-80">
                Los samen {euro(separateTotal)}, dus je bespaart {euro(separateTotal - pkg.price)}.
              </p>
              <p className="mt-5 opacity-90">{games.map((g) => g.name).join(", ")}.</p>
              <button onClick={() => request("pakket")} className="mt-7 rounded-lg bg-cta px-6 py-3.5 font-bold text-cta-foreground hover:brightness-110">
                Vraag het XXL-pakket aan
              </button>
            </div>
            <Photo photo={photos.jengaAction} className="aspect-[4/3] w-full rounded-md" />
          </div>
        </section>

        {/* OVER ONS */}
        <section id="verhaal" className="bg-secondary">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
            <Photo photo={photos.story} className="aspect-[4/3] h-full w-full rounded-md" />
            <div>
              <p className="eyebrow text-accent">Over ons</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Hoi, wij zijn Eric en Timo</h2>
              <div className="mt-5 space-y-4 text-secondary-foreground">
                <p>Wij zijn Eric en Timo, twee studenten met altijd al grote dromen. Met een gedeelde liefde voor klussen, spelletjes spelen en dingen organiseren, presenteren wij ons eigen bedrijfje.</p>
                <p>We hebben vaak ideeën en zijn deze keer, in plaats van alleen plannen te maken, echt aan de slag gegaan. We hebben onze eigen XXL houten spellen bedacht, ontworpen en gemaakt in Eindhoven.</p>
                <p>Wat begon met het idee om één spel te maken, beviel erg goed. Inmiddels zitten we al op vier spellen, en er komen er nog meer.</p>
                <p>We vinden het mooi dat mensen veel plezier beleven aan onze zelfgemaakte spellen. Daarom verhuren we ze aan iedereen die zijn feest, borrel of evenement net wat leuker wil maken.</p>
              </div>
              <div className="mt-6 flex flex-col gap-1">
                {[["Eric", "Applied Physics"], ["Timo", "Urban Systems and Real Estate"]].map(([n, s]) => (
                  <p key={n} className="text-sm"><strong>{n}</strong> — {s}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-5xl px-5 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <p className="eyebrow text-accent">Contact</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Aanvraag doen</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Laat weten wanneer en welke spellen je wilt huren. We reageren zelf en checken of ze vrij zijn.
              </p>
              <p className="mt-6 text-muted-foreground">
                Liever mailen?{" "}
                <a href={`mailto:${site.email}`} className="break-all font-semibold text-primary underline underline-offset-4">{site.email}</a>
              </p>
              <ol className="mt-8 space-y-3 border-l-2 border-wood-light pl-5 text-sm">
                <li><strong>1.</strong> Stuur je aanvraag met datum en spellen.</li>
                <li><strong>2.</strong> Wij checken of alles vrij is en bevestigen het persoonlijk.</li>
                <li><strong>3.</strong> Je haalt de spellen op in Eindhoven (omgeving De Hurk). Bij verhuur vragen we een borg.</li>
              </ol>
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
