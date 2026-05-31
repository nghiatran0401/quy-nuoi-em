import { nuoiEmImage } from "@/lib/nuoiem-images";

export type MealProgramBlock = {
  label?: string;
  text: string;
};

export const mealProgramSectionCopy = {
  since: "Từ 2014",
  title: "Bữa cơm níu chân trẻ tới trường",
  blocks: [
    {
      text: "2. Mỗi bữa, các bé được ăn thịt, đậu, canh, rau với chi phí 8.500đ/suất — gạo do địa phương, gia đình đối ứng. Tiểu học thường ăn 4 bữa/tuần (chiều thứ Sáu thầy cô về trường chính giao ban); mầm non ăn 5 bữa/tuần với chi phí 6.800đ/suất.",
    },
    {
      label: "Đối tượng nuôi",
      text: "Trẻ 3–5 tuổi (dự án vẫn hỗ trợ thêm từ năm học 2025–2026) và học sinh cấp 1–2–3 chưa được nhà nước nuôi cơm trưa. Một số bé nội trú xa được hỗ trợ cơm trưa và tối — mỗi bữa một mã NE (ví dụ NE00001S — ăn trưa, NE00001T — ăn tối). Khi bé được nhà nước nuôi, dự án đổi sang bé khác và giữ nguyên mã NE.",
    },
    {
      label: "Số tiền",
      text: "150.000đ/tháng/cháu × 9 tháng học + 100.000đ cơ sở vật chất. Tổng phổ biến: 1.450.000đ/năm học. Một số vùng Tây Nguyên (trung học cơ sở / trung học phổ thông): 170.000đ/tháng × 9 tháng + 120.000đ cơ sở vật chất — tổng 1.650.000đ/năm học.",
    },
  ] satisfies MealProgramBlock[],
  costs: [
    { amount: "1.450.000đ", note: "/ năm học (phổ biến)" },
    { amount: "1.650.000đ", note: "/ năm học (một số vùng Tây Nguyên)" },
  ],
  media: {
    youtubeId: "ouYY0ri-vIs",
    title: "Bữa cơm trưa tại điểm trường vùng cao",
  },
  mascot: {
    image: nuoiEmImage("mascotASang"),
    name: "A Sáng",
    caption: "A Sáng — Linh vật của dự án",
  },
} as const;
