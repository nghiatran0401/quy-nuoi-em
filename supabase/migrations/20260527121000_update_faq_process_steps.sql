-- Update homepage FAQ sponsorship process steps (5 → 9 steps).
UPDATE public.homepage_content
SET faq = jsonb_set(
  faq,
  '{items}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN elem->>'id' = 'process' THEN jsonb_set(
          elem,
          '{steps}',
          '[
            "Gửi công văn tới các Sở giáo dục và nhà trường tại các tỉnh",
            "Thống nhất nội dung, điều kiện hỗ trợ bao gồm chưa nhận được sự hỗ trợ từ nhà nước, bữa cơm trưa ảnh hưởng việc học",
            "Tiếp nhận thông tin, số liệu ban đầu đăng ký từ Sở giáo dục / Nhà trường",
            "Bắt đầu cấp mã từ tháng 6-7",
            "Toàn quỹ ăn cơm trưa từ tháng 9",
            "Nhận thông tin chi tiết từ Sở giáo dục / Nhà trường tháng 9 - 10",
            "Nhận đầy đủ thông tin học sinh và làm ảnh thẻ, đưa lên hệ thống tra cứu tháng 11",
            "Anh chị nuôi tra cứu và vào group theo bản có thầy cô giáo cắm bản nấu ăn hàng ngày báo cáo theo tháng",
            "Thăm em thực tế Tháng 11-12 và Tháng 3-4"
          ]'::jsonb
        )
        ELSE elem
      END
      ORDER BY ord
    )
    FROM jsonb_array_elements(faq->'items') WITH ORDINALITY AS t(elem, ord)
  )
)
WHERE locale = 'vi'
  AND faq IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM jsonb_array_elements(faq->'items') AS item
    WHERE item->>'id' = 'process'
  );
