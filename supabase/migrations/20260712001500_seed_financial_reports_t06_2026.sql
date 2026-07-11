-- Seed monthly financial report (Tháng 6/2026) from Google Drive folder "Báo cáo công bố"

INSERT INTO public.financial_reports (
  id,
  title,
  image_url,
  document_url,
  total_income,
  total_expense,
  closing_balance_date,
  closing_balance,
  summary,
  year,
  sort_order
)
VALUES
  (
    'thang-6-2026',
    'Tháng 6/2026',
    '/logo.webp',
    'https://docs.google.com/document/d/1Rnui6KRQaeQgeHKWdIKXT04Hf0v7KceI/edit?usp=sharing',
    '152.678.172 đ',
    '2.531.058.700 đ',
    '30/06/2026',
    '3.628.091.449 đ',
    NULL,
    2026,
    202606
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  document_url = EXCLUDED.document_url,
  total_income = EXCLUDED.total_income,
  total_expense = EXCLUDED.total_expense,
  closing_balance_date = EXCLUDED.closing_balance_date,
  closing_balance = EXCLUDED.closing_balance,
  year = EXCLUDED.year,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();
