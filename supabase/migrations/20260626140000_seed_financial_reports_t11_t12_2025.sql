-- Seed monthly financial reports (Tháng 11–12/2025) from Google Drive folder "Báo cáo công bố"

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
    'thang-11-2025',
    'Tháng 11/2025',
    '/logo.webp',
    'https://docs.google.com/document/d/12Lzhe_nbim1JmvewfXGyL3zYNYOtPu7D/edit?usp=sharing',
    '5.798.479.320 đ',
    '10.890.479.606 đ',
    '30/11/2025',
    '50.121.124.329 đ',
    NULL,
    2025,
    202511
  ),
  (
    'thang-12-2025',
    'Tháng 12/2025',
    '/logo.webp',
    'https://docs.google.com/document/d/1Y7ikJwnG1gX93NVBI90P_Z0bDoggyAzr/edit?usp=sharing',
    '1.762.692.350 đ',
    '5.354.574.100 đ',
    '31/12/2025',
    '46.955.242.579 đ',
    NULL,
    2025,
    202512
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
