/**
 * CENTRALE CONFIGURATIE — pas hier bedrijfsgegevens, prijzen en foto's aan.
 */
import jenga1 from "@/assets/jenga_1.png.asset.json";
import jenga2 from "@/assets/jenga_2.png.asset.json";
import doolhof1 from "@/assets/doolhof_1.png.asset.json";
import doolhof2 from "@/assets/doolhof_2.jpeg.asset.json";
import zenuw1 from "@/assets/zenuwspiraal_1.png.asset.json";
import zenuw2 from "@/assets/zenuwspiraal_2.jpeg.asset.json";

export const site = {
  name: "XXL Hollandse Spellen",
  tagline: "Handgemaakt in Eindhoven",
  slogan: "Grote spellen. Goede momenten.",
  /** TODO vóór livegang: definitieve domeinnaam, bv. "https://www.jouwdomein.nl". Leeg = geen canonical. */
  domain: "",
  /** TODO vóór livegang: zakelijk e-mailadres. Leeg = wordt niet getoond. */
  email: "",
  phones: [
    { display: "+31 6 20815877", tel: "+31620815877", wa: "31620815877" },
    { display: "+31 6 46565162", tel: "+31646565162", wa: "31646565162" },
  ],
  pickup: "Eindhoven, omgeving bedrijventerrein De Hurk",
};

export const waLink = (wa: string) => `https://wa.me/${wa}`;

export type Photo = { src: string | null; alt: string };

/** Foto's. Zet src op null om een neutrale placeholder te tonen. */
export const photos = {
  hero: { src: doolhof2.url, alt: "Vrienden spelen samen met het XXL houten knikkerdoolhof" },
  story: { src: doolhof1.url, alt: "Twee spelers kantelen samen het houten knikkerdoolhof" } as Photo,
  jengaAction: { src: jenga2.url, alt: "Vrienden kijken gespannen naar de XXL Jenga-toren" },
  zenuwAction: { src: zenuw2.url, alt: "Een speler beweegt de ring voorzichtig langs de zenuwspiraal" },
};

export type GameId = "jenga" | "zenuwspiraal" | "doolhof" | "pittenzak";

export const games: {
  id: GameId;
  name: string;
  price: number;
  description: string;
  detail?: string;
  photo: Photo;
}[] = [
  {
    id: "jenga",
    name: "XXL Jenga",
    price: 12.5,
    description:
      "Bouw de toren steeds hoger, haal er voorzichtig een blok uit en probeer hem overeind te houden. Wie haalt de volgende zet zonder dat de toren omvalt?",
    detail: "Torenhoogte tijdens het spelen: ongeveer 70 tot 150 cm",
    photo: { src: jenga1.url, alt: "Speler trekt voorzichtig een blok uit de XXL Jenga-toren" },
  },
  {
    id: "zenuwspiraal",
    name: "Zenuwspiraal",
    price: 20,
    description:
      "Heb jij een vaste hand en stalen zenuwen? Beweeg de ring van het ene uiteinde naar het andere zonder de bel te laten afgaan.",
    photo: { src: zenuw1.url, alt: "Speler concentreert zich op de handgemaakte zenuwspiraal" },
  },
  {
    id: "doolhof",
    name: "XXL houten knikkerdoolhof",
    price: 12.5,
    description:
      "Navigeer de knikker door het houten doolhof en probeer de juiste route naar de finish te vinden. Een leuke uitdaging voor jong en oud.",
    photo: { src: doolhof1.url, alt: "Het XXL houten knikkerdoolhof wordt door twee spelers vastgehouden" },
  },
  {
    id: "pittenzak",
    name: "Pittenzak gooien",
    price: 12.5,
    description:
      "Richt, gooi en scoor! Daag elkaar uit met dit toegankelijke werpspel. Het spel bestaat uit twee houten platen.",
    // TODO: eigen foto van pittenzak gooien toevoegen
    photo: { src: null, alt: "Pittenzak gooien met twee houten platen" },
  },
];

export const pkg = { id: "pakket" as const, name: "Compleet XXL-pakket", price: 49 };
export const separateTotal = games.reduce((s, g) => s + g.price, 0);

export const euro = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: n % 1 ? 2 : 0 }).format(n);

export const selectableOptions = [...games.map((g) => ({ id: g.id, name: g.name })), { id: pkg.id, name: pkg.name }];
