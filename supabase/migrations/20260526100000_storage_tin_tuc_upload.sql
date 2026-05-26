-- Allow authenticated editors/admins to upload news images to images/tin-tuc/
-- Run in SQL Editor if uploads fail with permission errors.

CREATE POLICY "storage_tin_tuc_select_public"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'images');

CREATE POLICY "storage_tin_tuc_insert_editors"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'images'
    AND (storage.foldername(name))[1] = 'tin-tuc'
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('editor', 'admin')
    )
  );

CREATE POLICY "storage_tin_tuc_update_editors"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'images'
    AND (storage.foldername(name))[1] = 'tin-tuc'
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('editor', 'admin')
    )
  )
  WITH CHECK (
    bucket_id = 'images'
    AND (storage.foldername(name))[1] = 'tin-tuc'
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('editor', 'admin')
    )
  );
