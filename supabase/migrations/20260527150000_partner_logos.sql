-- Partner / media logos for marquee sections (home, about, members)

CREATE TABLE IF NOT EXISTS public.partner_logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text NOT NULL,
  website_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS partner_logos_sort_idx
  ON public.partner_logos (sort_order ASC, created_at ASC)
  WHERE is_active = true;

ALTER TABLE public.partner_logos ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'partner_logos'
      AND policyname = 'partner_logos_public_read'
  ) THEN
    CREATE POLICY "partner_logos_public_read"
      ON public.partner_logos FOR SELECT
      TO anon, authenticated
      USING (is_active = true);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'partner_logos_updated_at'
  ) THEN
    CREATE TRIGGER partner_logos_updated_at
      BEFORE UPDATE ON public.partner_logos
      FOR EACH ROW
      EXECUTE FUNCTION public.set_updated_at();
  END IF;
END;
$$;

-- Seed default logos from static manifest (only when table is empty)
INSERT INTO public.partner_logos (name, image_url, sort_order)
SELECT v.name, v.image_url, v.sort_order
FROM (
  VALUES
    ('Báo Thiếu Niên', '/images/nuoiem/thieunien-1554879258.png', 10),
    ('Báo An Ninh Thủ Đô', '/images/nuoiem/an-ninh-thu-do-logo-1554879647.png', 20),
    ('Báo Lao Động Nghệ An', '/images/nuoiem/logo-lao-dong-nghe-an-1554879835.png', 30),
    ('VTV3', '/images/nuoiem/vtv3_logo-1554880679.png', 40),
    ('VTV24', '/images/nuoiem/vtv24-1554881152.jpg', 50),
    ('Việc Tử Tế', '/images/nuoiem/viectutelogo-1554881120.jpg', 60),
    ('VTV1', '/images/nuoiem/vi-nguoi-ngheo-1554880497.jpg', 70),
    ('Cà phê sáng', '/images/nuoiem/cafe-sang-1554880803.jpeg', 80),
    ('VOV', '/images/nuoiem/logo-vov-1554881388.png', 90),
    ('Tình nguyện Niềm Tin', '/images/nuoiem/logo-niem-tin-1510299904291.png', 100),
    ('Ánh Sáng Núi Rừng', '/images/nuoiem/logo-asnr-1200-1538388243.png', 110)
) AS v(name, image_url, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.partner_logos LIMIT 1);

-- Storage: allow uploads to images/doi-tac/ for editors/admins
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'storage_doi_tac_insert_editors'
  ) THEN
    CREATE POLICY "storage_doi_tac_insert_editors"
      ON storage.objects FOR INSERT
      TO authenticated
      WITH CHECK (
        bucket_id = 'images'
        AND (storage.foldername(name))[1] = 'doi-tac'
        AND EXISTS (
          SELECT 1 FROM public.profiles p
          WHERE p.id = auth.uid() AND p.role IN ('editor', 'admin')
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'storage_doi_tac_update_editors'
  ) THEN
    CREATE POLICY "storage_doi_tac_update_editors"
      ON storage.objects FOR UPDATE
      TO authenticated
      USING (
        bucket_id = 'images'
        AND (storage.foldername(name))[1] = 'doi-tac'
        AND EXISTS (
          SELECT 1 FROM public.profiles p
          WHERE p.id = auth.uid() AND p.role IN ('editor', 'admin')
        )
      )
      WITH CHECK (
        bucket_id = 'images'
        AND (storage.foldername(name))[1] = 'doi-tac'
        AND EXISTS (
          SELECT 1 FROM public.profiles p
          WHERE p.id = auth.uid() AND p.role IN ('editor', 'admin')
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'storage_doi_tac_delete_editors'
  ) THEN
    CREATE POLICY "storage_doi_tac_delete_editors"
      ON storage.objects FOR DELETE
      TO authenticated
      USING (
        bucket_id = 'images'
        AND (storage.foldername(name))[1] = 'doi-tac'
        AND EXISTS (
          SELECT 1 FROM public.profiles p
          WHERE p.id = auth.uid() AND p.role IN ('editor', 'admin')
        )
      );
  END IF;
END;
$$;
