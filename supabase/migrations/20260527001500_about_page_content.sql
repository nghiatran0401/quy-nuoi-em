-- Editable content for /about page

CREATE TABLE IF NOT EXISTS public.about_page_content (
  locale text PRIMARY KEY CHECK (locale IN ('vi', 'en')),
  meta jsonb,
  hero jsonb,
  stats jsonb,
  partners_title text,
  hero_image text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.about_page_content ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'about_page_content'
      AND policyname = 'about_page_content_public_read'
  ) THEN
    CREATE POLICY "about_page_content_public_read"
      ON public.about_page_content FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'about_page_content_updated_at'
  ) THEN
    CREATE TRIGGER about_page_content_updated_at
      BEFORE UPDATE ON public.about_page_content
      FOR EACH ROW
      EXECUTE FUNCTION public.set_updated_at();
  END IF;
END;
$$;
