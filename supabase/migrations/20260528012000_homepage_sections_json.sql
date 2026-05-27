-- Make all remaining homepage blocks editable from admin

ALTER TABLE public.homepage_content
  ADD COLUMN IF NOT EXISTS sections jsonb;

COMMENT ON COLUMN public.homepage_content.sections IS
  'Các khối còn lại trên trang chủ: bữa cơm, hành trình mở rộng, quy trình, danh sách đã nhận nuôi, tin tức và tiêu đề đối tác.';
