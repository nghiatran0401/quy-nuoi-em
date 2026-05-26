-- Editable content for /quy-trinh-cap-ma-2026 page

CREATE TABLE IF NOT EXISTS public.process_2026_page_content (
  locale text PRIMARY KEY CHECK (locale IN ('vi', 'en')),
  meta jsonb,
  content jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.process_2026_page_content ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'process_2026_page_content'
      AND policyname = 'process_2026_page_content_public_read'
  ) THEN
    CREATE POLICY "process_2026_page_content_public_read"
      ON public.process_2026_page_content FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'process_2026_page_content_updated_at'
  ) THEN
    CREATE TRIGGER process_2026_page_content_updated_at
      BEFORE UPDATE ON public.process_2026_page_content
      FOR EACH ROW
      EXECUTE FUNCTION public.set_updated_at();
  END IF;
END;
$$;
