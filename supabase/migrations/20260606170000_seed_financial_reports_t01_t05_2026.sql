-- Seed all published monthly financial reports (Tháng 1–5/2026) from Google Drive folder "Báo cáo công bố"

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
VALUES
  (
    'thang-1-2026',
    'Tháng 1/2026',
    '/logo.webp',
    'https://docs.google.com/document/d/15aDgrQ7HXDtFZ_roswCjRjxqlQlLDu0q/edit?usp=sharing',
    '19.746.928.722 ₫',
    '23.615.107.602 ₫',
    NULL,
    2026,
    202601
  ),
  (
    'thang-2-2026',
    'Tháng 2/2026',
    '/logo.webp',
    'https://docs.google.com/document/d/1T_zlURriSbb72w-grKtpa5wsKxnb-8S-/edit?usp=sharing',
    '34.954.197 ₫',
    '3.115.349.736 ₫',
    NULL,
    2026,
    202602
  ),
  (
    'thang-3-2026',
    'Tháng 3/2026',
    '/logo.webp',
    'https://docs.google.com/document/d/1hD_s7_XsIsxtKP624onubj_woC2RcL_7/edit?usp=sharing',
    '555.428.098 ₫',
    '1.008.685.600 ₫',
    NULL,
    2026,
    202603
  ),
  (
    'thang-4-2026',
    'Tháng 4/2026',
    '/logo.webp',
    'https://docs.google.com/document/d/1qMuH3UUmjgqhw286dU6GNEvI7Lf2uJ-2/edit?usp=sharing',
    '419.815.618 ₫',
    '10.768.292.617 ₫',
    NULL,
    2026,
    202604
  ),
  (
    'thang-5-2026',
    'Tháng 5/2026',
    '/logo.webp',
    'https://docs.google.com/document/d/1l0D-8UW4i62MEOsA4iK7O-SZHO9sxj6k/edit?usp=sharing',
    '115.517.225 ₫',
    '3.358.193.920 ₫',
    NULL,
    2026,
    202605
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  document_url = EXCLUDED.document_url,
  total_income = EXCLUDED.total_income,
  total_expense = EXCLUDED.total_expense,
  year = EXCLUDED.year,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();
