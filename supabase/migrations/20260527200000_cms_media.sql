-- CMS-managed images: homepage media, static page slots, financial report covers

ALTER TABLE public.homepage_content
  ADD COLUMN IF NOT EXISTS media jsonb;

COMMENT ON COLUMN public.homepage_content.media IS
  'Ảnh trang chủ: hero, CTA nền, QR chuyển khoản, collage thành viên (mảng URL).';

CREATE TABLE IF NOT EXISTS public.static_media (
  key text PRIMARY KEY,
  label text NOT NULL,
  image_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.static_media ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'static_media'
      AND policyname = 'static_media_public_read'
  ) THEN
    CREATE POLICY "static_media_public_read"
      ON public.static_media FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END;
$$;

CREATE TABLE IF NOT EXISTS public.financial_reports (
  id text PRIMARY KEY,
  title text NOT NULL,
  image_url text NOT NULL,
  document_url text,
  total_income text,
  total_expense text,
  summary text,
  year integer NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS financial_reports_year_idx
  ON public.financial_reports (year DESC, sort_order DESC);

ALTER TABLE public.financial_reports ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'financial_reports'
      AND policyname = 'financial_reports_public_read'
  ) THEN
    CREATE POLICY "financial_reports_public_read"
      ON public.financial_reports FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END;
$$;

-- Seed static page images (when empty)
INSERT INTO public.static_media (key, label, image_url, sort_order)
SELECT v.key, v.label, v.image_url, v.sort_order
FROM (
  VALUES
    ('process_2026_diagram', 'Quy trình cấp mã 2026 — sơ đồ', '/images/nuoiem/huong-dan-6-buoc-nhan-ma--20240825115002-lnudk.jpg', 10),
    ('scoring_reference', 'Thang điểm — ảnh tham chiếu', '/images/nuoiem/huong-dan-6-buoc-nhan-ma--20240825115002-lnudk.jpg', 20),
    ('mou_1', 'MOU — ảnh 1', '/images/nuoiem/100961727_884727968659929_4319462667015159808_n-20200604055417.jpg', 30),
    ('mou_2', 'MOU — ảnh 2', '/images/nuoiem/101836418_884727855326607_7128808836982374400_n-1-20200604055417.jpg', 40),
    ('mou_3', 'MOU — ảnh 3', '/images/nuoiem/102427543_884728195326573_5782125543583383552_n-20200604055417.jpg', 50),
    ('process_step_1', 'Quy trình xét duyệt — bước 1', '/images/nuoiem/1-20220415031911.png', 110),
    ('process_step_2', 'Quy trình xét duyệt — bước 2', '/images/nuoiem/2-gui-tien-20220415031911.png', 120),
    ('process_step_3', 'Quy trình xét duyệt — bước 3', '/images/nuoiem/3-20220415033821.png', 130),
    ('process_step_4', 'Quy trình xét duyệt — bước 4', '/images/nuoiem/4-20220415031911.png', 140),
    ('process_step_5', 'Quy trình xét duyệt — bước 5', '/images/nuoiem/5-20220415031911.png', 150),
    ('process_step_6', 'Quy trình xét duyệt — bước 6', '/images/nuoiem/6-20220415035511.png', 160)
) AS v(key, label, image_url, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.static_media LIMIT 1);

-- Storage policies for trang-chu, trang-tinh, bao-cao folders
DO $$
DECLARE
  folder text;
BEGIN
  FOREACH folder IN ARRAY ARRAY['trang-chu', 'trang-tinh', 'bao-cao', 'about']
  LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies
      WHERE schemaname = 'storage'
        AND tablename = 'objects'
        AND policyname = 'storage_' || folder || '_insert_editors'
    ) THEN
      EXECUTE format(
        $policy$
        CREATE POLICY "storage_%1$s_insert_editors"
          ON storage.objects FOR INSERT
          TO authenticated
          WITH CHECK (
            bucket_id = 'images'
            AND (storage.foldername(name))[1] = %1$L
            AND EXISTS (
              SELECT 1 FROM public.profiles p
              WHERE p.id = auth.uid() AND p.role IN ('editor', 'admin')
            )
          )
        $policy$,
        folder
      );
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_policies
      WHERE schemaname = 'storage'
        AND tablename = 'objects'
        AND policyname = 'storage_' || folder || '_update_editors'
    ) THEN
      EXECUTE format(
        $policy$
        CREATE POLICY "storage_%1$s_update_editors"
          ON storage.objects FOR UPDATE
          TO authenticated
          USING (
            bucket_id = 'images'
            AND (storage.foldername(name))[1] = %1$L
            AND EXISTS (
              SELECT 1 FROM public.profiles p
              WHERE p.id = auth.uid() AND p.role IN ('editor', 'admin')
            )
          )
          WITH CHECK (
            bucket_id = 'images'
            AND (storage.foldername(name))[1] = %1$L
            AND EXISTS (
              SELECT 1 FROM public.profiles p
              WHERE p.id = auth.uid() AND p.role IN ('editor', 'admin')
            )
          )
        $policy$,
        folder
      );
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_policies
      WHERE schemaname = 'storage'
        AND tablename = 'objects'
        AND policyname = 'storage_' || folder || '_delete_editors'
    ) THEN
      EXECUTE format(
        $policy$
        CREATE POLICY "storage_%1$s_delete_editors"
          ON storage.objects FOR DELETE
          TO authenticated
          USING (
            bucket_id = 'images'
            AND (storage.foldername(name))[1] = %1$L
            AND EXISTS (
              SELECT 1 FROM public.profiles p
              WHERE p.id = auth.uid() AND p.role IN ('editor', 'admin')
            )
          )
        $policy$,
        folder
      );
    END IF;
  END LOOP;
END;
$$;
