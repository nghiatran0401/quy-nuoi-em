-- Seed first financial report: Tháng 4/2026 (monthly figures from official Google Doc)

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
  'thang-4-2026',
  'Tháng 4/2026',
  '/logo.webp',
  'https://docs.google.com/document/d/1qMuH3UUmjgqhw286dU6GNEvI7Lf2uJ-2/edit?usp=sharing',
  '419.815.618 ₫',
  '10.739.792.717 ₫',
  NULL,
  2026,
  100
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
