-- Bank / transfer details used on homepage FAQ (ngân hàng) and /dong-gop

ALTER TABLE public.homepage_content
  ADD COLUMN IF NOT EXISTS donate_info jsonb;

COMMENT ON COLUMN public.homepage_content.donate_info IS
  'Thông tin chuyển khoản: FAQ tài khoản ngân hàng và trang Đóng góp.';
