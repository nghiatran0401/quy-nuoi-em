-- Sync homepage FAQ office address (HCM → Hà Nội) for existing CMS rows.
UPDATE public.homepage_content
SET faq = replace(
  faq::text,
  'Số 383 đường Nguyễn Duy Trinh, phường Bình Trưng, TP. HCM.',
  '15 Ngách 352/15 đường Giải Phóng - Thanh Xuân - Hà Nội'
)::jsonb
WHERE locale = 'vi'
  AND faq::text LIKE '%383 đường Nguyễn Duy Trinh%';
