ALTER TABLE public.financial_reports
  ADD COLUMN IF NOT EXISTS closing_balance_date text,
  ADD COLUMN IF NOT EXISTS closing_balance text;
