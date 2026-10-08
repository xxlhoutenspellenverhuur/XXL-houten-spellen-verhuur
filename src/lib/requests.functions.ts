import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const allowed = ["jenga", "zenuwspiraal", "doolhof", "pittenzak", "pakket"] as const;
const events = ["", "verjaardag", "studentenactiviteit", "bedrijfsfeest", "familiefeest", "bruiloft", "buurtfeest", "anders"] as const;

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().default(""),
  date: z.string().trim().regex(/^(\d{4}-\d{2}-\d{2})?$/).optional().default(""),
  eventType: z.enum(events).optional().default(""),
  games: z.array(z.enum(allowed)).max(5),
  location: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  website: z.string().max(0).optional().default(""), // honeypot
  startedAt: z.number(),
});

export const submitRequest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    // Spam: honeypot gevuld of te snel verstuurd → stil negeren
    if (data.website || Date.now() - data.startedAt < 2500) return { ok: true };
    const { error } = await supabase.from("booking_requests").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      desired_date: data.date || null,
      event_type: data.eventType || null,
      games: data.games,
      location: data.location || null,
      message: data.message || null,
    });
    if (error) {
      console.error("booking insert failed", error);
      throw new Error("Opslaan mislukt");
    }
    return { ok: true };
  });
