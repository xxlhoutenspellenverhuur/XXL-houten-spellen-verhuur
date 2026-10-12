import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { site, selectableOptions } from "@/config/site";

const allowed = ["jenga", "zenuwspiraal", "doolhof", "pittenzak", "pakket", "anders"] as const;

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().default(""),
  date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  games: z.array(z.enum(allowed)).max(6),
  message: z.string().trim().max(2000).optional().default(""),
  website: z.string().max(0).optional().default(""), // honeypot
  startedAt: z.number(),
});

export const submitRequest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    if (data.website || Date.now() - data.startedAt < 2500) return { ok: true };

    const names = data.games.map((g) => selectableOptions.find((o) => o.id === g)?.name ?? g).join(", ");

    // 1. E-mail naar ons via FormSubmit (gratis). Alleen bij succes melden we "verstuurd".
    let res: Response;
    try {
      res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: site.formOrigin,
          Referer: site.formOrigin + "/",
        },
        body: JSON.stringify({
          _subject: `Nieuwe aanvraag: ${data.name} (${data.date})`,
          _replyto: data.email,
          _template: "table",
          _captcha: "false",
          _honey: "",
          Naam: data.name,
          "E-mail": data.email,
          Telefoon: data.phone || "-",
          "Gewenste datum": data.date,
          Spellen: names || "-",
          Bericht: data.message || "-",
        }),
      });
    } catch (e) {
      console.error("formsubmit network error", e);
      throw new Error("Versturen mislukt");
    }
    const text = await res.text();
    let ok = res.ok;
    try {
      const j = JSON.parse(text) as { success?: string | boolean };
      ok = ok && (j.success === true || j.success === "true");
    } catch {
      ok = false;
    }
    if (!ok) {
      console.error("formsubmit failed", res.status, text);
      throw new Error("Versturen mislukt");
    }

    // 2. Back-up in Lovable Cloud (mag de verzending niet laten mislukken)
    const { error } = await supabase.from("booking_requests").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      desired_date: data.date,
      games: data.games,
      message: data.message || null,
    });
    if (error) console.error("booking backup insert failed", error);

    return { ok: true };
  });
