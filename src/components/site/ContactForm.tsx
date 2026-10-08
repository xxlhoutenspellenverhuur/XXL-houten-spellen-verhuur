import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";
import { selectableOptions, type GameId } from "@/config/site";
import { submitRequest } from "@/lib/requests.functions";

type Sel = GameId | "pakket";
const eventTypes = [
  ["verjaardag", "Verjaardag"],
  ["studentenactiviteit", "Studentenactiviteit"],
  ["bedrijfsfeest", "Bedrijfsfeest"],
  ["familiefeest", "Familiefeest"],
  ["bruiloft", "Bruiloft"],
  ["buurtfeest", "Buurtfeest"],
  ["anders", "Anders"],
] as const;

const field = "w-full rounded-lg border border-input bg-card px-3.5 py-3 text-base outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
const label = "mb-1.5 block text-sm font-semibold";

export function ContactForm({ selected, setSelected }: { selected: Sel[]; setSelected: (s: Sel[]) => void }) {
  const submit = useServerFn(submitRequest);
  const startedAt = useRef(Date.now());
  const [v, setV] = useState({ name: "", email: "", phone: "", date: "", eventType: "", location: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setV({ ...v, [k]: e.target.value });

  const toggle = (id: Sel) => setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!v.name.trim()) errs.name = "Vul je naam in.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errs.email = "Vul een geldig e-mailadres in.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submit({ data: { ...v, eventType: v.eventType as never, games: selected, startedAt: startedAt.current } });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl bg-card p-8 text-center shadow-card md:p-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <p className="mt-4 font-display text-2xl font-bold">Bedankt voor je aanvraag!</p>
        <p className="mt-2 text-muted-foreground">We hebben je bericht ontvangen en nemen persoonlijk contact met je op.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl bg-card p-6 shadow-card md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className={label}>Naam *</label>
          <input id="f-name" autoComplete="name" className={field} value={v.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
          {errors.name && <p id="e-name" className="mt-1 text-sm text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="f-email" className={label}>E-mailadres *</label>
          <input id="f-email" type="email" autoComplete="email" className={field} value={v.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />
          {errors.email && <p id="e-email" className="mt-1 text-sm text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="f-phone" className={label}>Telefoonnummer <span className="font-normal text-muted-foreground">(optioneel)</span></label>
          <input id="f-phone" type="tel" autoComplete="tel" className={field} value={v.phone} onChange={set("phone")} />
        </div>
        <div>
          <label htmlFor="f-date" className={label}>Gewenste datum <span className="font-normal text-muted-foreground">(aanbevolen)</span></label>
          <input id="f-date" type="date" className={field} value={v.date} onChange={set("date")} />
        </div>
        <div>
          <label htmlFor="f-event" className={label}>Type evenement</label>
          <select id="f-event" className={field} value={v.eventType} onChange={set("eventType")}>
            <option value="">Maak een keuze</option>
            {eventTypes.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="f-location" className={label}>Locatie van het evenement</label>
          <input id="f-location" className={field} value={v.location} onChange={set("location")} />
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className={label}>Gewenste spellen</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {selectableOptions.map((o) => (
            <label key={o.id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-input px-3.5 py-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <input type="checkbox" className="h-5 w-5 accent-primary" checked={selected.includes(o.id as Sel)} onChange={() => toggle(o.id as Sel)} />
              <span className="text-sm font-medium">{o.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor="f-message" className={label}>Bericht of aanvullende wensen</label>
        <textarea id="f-message" rows={4} className={field} value={v.message} onChange={set("message")} maxLength={2000} />
      </div>

      {/* Honeypot tegen spam — onzichtbaar voor bezoekers */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} /></label>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          Het versturen is niet gelukt. Je gegevens staan nog ingevuld — probeer het opnieuw of neem contact op via telefoon of WhatsApp.
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cta px-6 py-4 font-bold text-cta-foreground transition hover:brightness-110 disabled:opacity-70 sm:w-auto">
        {status === "sending" && <Loader2 className="h-5 w-5 animate-spin" />}
        Verstuur mijn aanvraag
      </button>
      <p className="mt-4 text-xs text-muted-foreground">
        Een aanvraag is nog geen definitieve reservering. We gebruiken je gegevens alleen om je aanvraag te behandelen. Lees ons{" "}
        <Link to="/privacy" className="underline">privacybeleid</Link>.
      </p>
    </form>
  );
}
