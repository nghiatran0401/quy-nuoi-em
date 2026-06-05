-- Seed financial report: Tháng 5/2026 (monthly figures from official Google Doc)

INSERT INTO public.financial_reports (
  id,
  title,
  image_url,
  document_url,
  total_income,
  total_expense,
  summary,
  year,
  sort_order
)
VALUES (
  'thang-5-2026',
  'Tháng 5/2026',
  '/logo.webp',
  'https://docs.google.com/document/d/1l0D-8UW4i62MEOsA4iK7O-SZHO9sxj6k/edit?usp=sharing',
  '115.517.225 ₫',
  '3.358.193.920 ₫',
  NULL,
  2026,
  101
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  image_url = EXCLUDED.image_url,
  document_url = EXCLUDED.document_url,
  total_income = EXCLUDED.total_income,
  total_expense = EXCLUDED.total_expense,
  year = EXCLUDED.year,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();
