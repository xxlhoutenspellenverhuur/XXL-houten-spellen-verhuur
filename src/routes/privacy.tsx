import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/config/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacybeleid | XXL Hollandse Spellen" },
      { name: "description", content: "Hoe XXL Hollandse Spellen omgaat met de gegevens die je via het aanvraagformulier deelt." },
      { property: "og:title", content: "Privacybeleid | XXL Hollandse Spellen" },
      { property: "og:description", content: "Hoe wij omgaan met gegevens uit het aanvraagformulier." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Privacy,
});

// TODO vóór livegang: laat deze tekst controleren en vul contactgegevens aan.
function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <Link to="/" className="text-sm font-semibold text-accent hover:underline">← Terug naar de website</Link>
      <h1 className="mt-6 text-4xl font-extrabold">Privacybeleid</h1>
      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>{site.name} verzamelt alleen de gegevens die je zelf invult in het aanvraagformulier: naam, e-mailadres en optioneel je telefoonnummer, gewenste datum, type evenement, gewenste spellen, locatie en bericht.</p>
        <p>We gebruiken deze gegevens uitsluitend om contact met je op te nemen over je aanvraag. We delen ze niet met derden voor marketingdoeleinden en gebruiken geen trackingcookies of advertentiepixels.</p>
        <p>Wil je je gegevens inzien of laten verwijderen? Neem contact met ons op via {site.phones.map((p) => p.display).join(" of ")}{site.email ? ` of ${site.email}` : ""}.</p>
      </div>
    </main>
  );
}
