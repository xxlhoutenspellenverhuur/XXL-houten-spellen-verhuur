CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  desired_date date,
  event_type text,
  games text[] NOT NULL DEFAULT '{}',
  location text,
  message text
);
GRANT INSERT ON public.booking_requests TO anon, authenticated;
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a request" ON public.booking_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(name) BETWEEN 1 AND 120 AND char_length(email) BETWEEN 3 AND 255 AND coalesce(char_length(message),0) <= 2000);