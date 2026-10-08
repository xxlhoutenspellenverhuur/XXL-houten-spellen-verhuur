import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { site, waLink } from "@/config/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "#spellen", label: "Onze spellen" },
  { href: "#verhaal", label: "Ons verhaal" },
  { href: "#zo-werkt-het", label: "Zo werkt het" },
  { href: "#contact", label: "Contact" },
];

export function Header({ onRequestPackage }: { onRequestPackage: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "bg-background/95 text-foreground shadow-sm backdrop-blur" : "bg-transparent text-forest-foreground",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-20">
        {/* Logo — vervang later door een echt logo */}
        <a href="#top" className="leading-none" aria-label={`${site.name}, naar boven`}>
          <span className="block font-display text-xl font-extrabold tracking-tight md:text-2xl">
            XXL <span className={solid ? "text-accent" : "text-wood-light"}>Hollandse</span> Spellen
          </span>
          <span className="eyebrow mt-1 block text-[0.6rem] opacity-80">{site.tagline}</span>
        </a>
        <nav aria-label="Hoofdnavigatie" className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold opacity-90 hover:opacity-100 hover:underline underline-offset-4">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={waLink(site.phones[0].wa)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Neem contact op via WhatsApp"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-current/30 sm:inline-flex"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <button
            onClick={onRequestPackage}
            className="hidden rounded-lg bg-cta px-4 py-2.5 text-sm font-bold text-cta-foreground transition hover:brightness-110 sm:inline-block"
          >
            Vraag een pakket aan
          </button>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobiel menu" className="border-t bg-background px-5 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b py-3.5 text-base font-semibold">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onRequestPackage();
            }}
            className="mt-5 w-full rounded-lg bg-cta px-4 py-3.5 font-bold text-cta-foreground"
          >
            Vraag een pakket aan
          </button>
        </nav>
      )}
    </header>
  );
}
