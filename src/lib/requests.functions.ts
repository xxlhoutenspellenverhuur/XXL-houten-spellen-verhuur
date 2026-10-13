import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

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

    // Back-up in Lovable Cloud. De e-mail gaat rechtstreeks vanuit de browser via FormSubmit
    // (vanaf een gedeelde server geeft FormSubmit een rate limit).
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
