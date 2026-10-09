import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";
import { selectableOptions } from "@/config/site";
import { submitRequest } from "@/lib/requests.functions";

export type Sel = (typeof selectableOptions)[number]["id"];

const field = "w-full rounded-lg border border-input bg-card px-3.5 py-3 text-base outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
const label = "mb-1.5 block text-sm font-semibold";

type Errors = Partial<Record<"name" | "email" | "date", string>>;

export function ContactForm({ selected, setSelected }: { selected: Sel[]; setSelected: (s: Sel[]) => void }) {
  const submit = useServerFn(submitRequest);
  const startedAt = useRef(Date.now());
  const [v, setV] = useState({ name: "", email: "", phone: "", date: "", message: "", website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setV({ ...v, [k]: e.target.value });
  const toggle = (id: Sel) => setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Errors = {};
    if (!v.name.trim()) errs.name = "Vul je naam in.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errs.email = "Vul een geldig e-mailadres in.";
    if (!v.date) errs.date = "Kies een datum.";
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submit({ data: { ...v, games: selected, startedAt: startedAt.current } });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl bg-card p-8 text-center shadow-card md:p-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <p className="mt-4 font-display text-2xl font-bold">Aanvraag verstuurd!</p>
        <p className="mt-2 text-muted-foreground">Bedankt, we hebben je aanvraag ontvangen en nemen zo snel mogelijk contact met je op.</p>
      </div>
    );
  }

  const err = (k: keyof Errors) => errors[k] && <p id={`e-${k}`} className="mt-1 text-sm text-destructive">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl bg-card p-6 shadow-card md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className={label}>Naam *</label>
          <input id="f-name" autoComplete="name" className={field} value={v.name} onChange={set("name")} aria-invalid={!!errors.name} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="f-email" className={label}>E-mailadres *</label>
          <input id="f-email" type="email" autoComplete="email" className={field} value={v.email} onChange={set("email")} aria-invalid={!!errors.email} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="f-phone" className={label}>Telefoonnummer</label>
          <input id="f-phone" type="tel" autoComplete="tel" className={field} value={v.phone} onChange={set("phone")} />
        </div>
        <div>
          <label htmlFor="f-date" className={label}>Gewenste datum *</label>
          <input id="f-date" type="date" className={field} value={v.date} onChange={set("date")} aria-invalid={!!errors.date} />
          {err("date")}
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className={label}>Gewenste spellen</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {selectableOptions.map((o) => (
            <label key={o.id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-input px-3.5 py-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <input type="checkbox" className="h-5 w-5 accent-primary" checked={selected.includes(o.id)} onChange={() => toggle(o.id)} />
              <span className="text-sm font-medium">{o.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor="f-message" className={label}>Bericht</label>
        <textarea id="f-message" rows={4} className={field} value={v.message} onChange={set("message")} maxLength={2000} placeholder="Vragen of opmerkingen?" />
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} /></label>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          Versturen is niet gelukt. Je gegevens staan nog ingevuld, probeer het opnieuw of mail ons.
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cta px-6 py-4 font-bold text-cta-foreground transition hover:brightness-110 disabled:opacity-70 sm:w-auto">
        {status === "sending" && <Loader2 className="h-5 w-5 animate-spin" />}
        Aanvraag versturen
      </button>
      <p className="mt-4 text-xs text-muted-foreground">
        Een aanvraag is nog geen reservering, we bevestigen de beschikbaarheid persoonlijk.{" "}
        <Link to="/privacy" className="underline">Privacybeleid</Link>
      </p>
    </form>
  );
}
