-- Phase 1: Editable homepage content (hero, stats, CTA, members, FAQ)

CREATE TABLE IF NOT EXISTS public.homepage_content (
  locale text PRIMARY KEY CHECK (locale IN ('vi', 'en')),
  hero jsonb,
  stats jsonb,
  cta jsonb,
  members jsonb,
  faq jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'homepage_content' AND policyname = 'homepage_content_public_read'
  ) THEN
    CREATE POLICY "homepage_content_public_read"
      ON public.homepage_content FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'homepage_content_updated_at'
  ) THEN
    CREATE TRIGGER homepage_content_updated_at
      BEFORE UPDATE ON public.homepage_content
      FOR EACH ROW
      EXECUTE FUNCTION public.set_updated_at();
  END IF;
END;
$$;
