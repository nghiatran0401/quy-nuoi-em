/**
 * Restores Vietnamese CMS rows polluted by integration tests.
 * Usage: npm run restore:cms
 * (or: node --env-file=.env scripts/restore-vietnamese-cms.mjs)
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

function loadDotEnv() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) return;
  try {
    const envPath = resolve(dirname(fileURLToPath(import.meta.url)), "../.env");
    for (const line of readFileSync(envPath, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      if (process.env[key]) continue;
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch {
    /* .env optional when vars are already exported */
  }
}

loadDotEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Add them to .env, then run: npm run restore:cms",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const mealFirstBlockText =
  "2. Mỗi bữa, các bé được ăn thịt, đậu, canh, rau với chi phí 8.500đ/suất — gạo do địa phương, gia đình đối ứng. Tiểu học thường ăn 4 bữa/tuần (chiều thứ Sáu thầy cô về trường chính giao ban); mầm non ăn 5 bữa/tuần với chi phí 6.800đ/suất.";

const homepage = {
  locale: "vi",
  hero: {
    eyebrow: "Bữa cơm níu chân trẻ tới trường",
    title: "Dự án Nuôi Em",
    description:
      "Trên những mái nhà tranh vùng cao, 150.000–170.000đ mỗi tháng là đủ để một em no bụng và đi học đầy đủ. Anh chị biết rõ em nào, có thể đến thăm — mỗi em một mã NE, mỗi em một người nuôi.",
    sponsorNow: "Đóng góp ngay",
    learnMore: "Tìm hiểu thêm",
  },
  stats: [
    { value: "81.937", label: "Tổng số em nuôi", hint: "Năm học 9/2025–5/2026" },
    { value: "56,6\u00a0tỷ\u00a0đ", label: "Tổng tiền thu", hint: "Chi tiết: 56.615.108.077đ" },
    { value: "52,3\u00a0tỷ\u00a0đ", label: "Tổng tiền chi", hint: "Chi tiết: 52.305.002.708đ" },
    { value: "40.690", label: "Đã có người nuôi", hint: "49,7% tổng số em nuôi" },
    { value: "41.247", label: "Chưa có người nuôi", hint: "50,3% tổng số em nuôi" },
  ],
  cta: {
    title: "MỞ MÃ NUÔI EM MÙA 12 — ĐANG MỞ",
    paragraphs: [
      "Năm 2018 thật sự là một bước chuyển mình lớn đối với dự án Nuôi Em, khi hơn 5.436 em nhỏ bản cao đã được tìm thấy anh chị nuôi cơm trưa. Đó là hạnh phúc không chỉ với người làm dự án mà còn hơn 95.000+ niềm vui đến hết 2023 từ anh chị nuôi và các em tìm đến được với nhau.",
      "Đến nay hơn 1.000 nhóm Facebook theo trường thuộc hơn 500 xã tại Điện Biên, Hà Giang, Lào Cai, Yên Bái, Lai Châu, Bắc Kạn, Lạng Sơn, Hòa Bình, Cao Bằng, Thanh Hóa, Đắk Nông, Đắk Lắk, Kon Tum, Gia Lai… hoạt động tích cực và cập nhật tình hình các bé hàng tháng.",
      "Ngay từ bây giờ hãy đăng ký là một phần trong số +120.000 anh chị nuôi của các bé trong 2025 – 2026.",
    ],
    donate: "Tìm hiểu thêm",
    reports: "Báo cáo tài chính",
    campaign: {
      headline: "MỞ MÃ NUÔI EM MÙA 12 — ĐANG MỞ",
      phase: "2025 – 2026 · Thêm 30.000 bé đợt 1",
      goal: "Mục tiêu +120.000 bé được nhận nuôi trên cả nước",
    },
    story: {
      paragraphs: [
        "Năm 2018 thật sự là một bước chuyển mình lớn đối với dự án Nuôi Em, khi hơn 5.436 em nhỏ bản cao đã được tìm thấy anh chị nuôi cơm trưa. Đó là hạnh phúc không chỉ với người làm dự án mà còn hơn 95.000+ niềm vui đến hết 2023 từ anh chị nuôi và các em tìm đến được với nhau.",
        "Đến nay hơn 1.000 nhóm Facebook theo trường thuộc hơn 500 xã tại Điện Biên, Hà Giang, Lào Cai, Yên Bái, Lai Châu, Bắc Kạn, Lạng Sơn, Hòa Bình, Cao Bằng, Thanh Hóa, Đắk Nông, Đắk Lắk, Kon Tum, Gia Lai… hoạt động tích cực và cập nhật tình hình các bé hàng tháng.",
        "Ngay từ bây giờ hãy đăng ký là một phần trong số +120.000 anh chị nuôi của các bé trong 2025 – 2026.",
      ],
      ctaLabel: "Tìm hiểu thêm",
      ctaHref: "/quy-trinh-cap-ma-2026",
    },
  },
  members: {
    eyebrow: "Thành viên Quỹ",
    title: "Gắn Kết Yêu Thương",
    paragraphs: [
      "Bắt đầu từ con số 20 thành viên Quỹ là các anh chị trong nhóm sản xuất Nuôi Em, các thành viên rải rác khắp tỉnh thành trên nước Việt Nam. Giờ đây, sau ba năm con số thành viên Quỹ đã tăng lên gần gấp đôi.",
      "Nhóm Quỹ vẫn đang từng bước nỗ lực hơn mỗi ngày để có thể bảo trợ nhiều trẻ hơn và mang lại nhiều niềm vui hơn cho các con!",
    ],
    cta: "Thành viên Quỹ",
  },
  donate_info: {
    bank: "MB",
    branch: "Ngân hàng TMCP Quân đội",
    accountName: "CTCP DNXH QUY NUOI EM",
    accountNumber: "1805",
    accountHighlight:
      "Số tài khoản minh bạch công khai 4 số QUY NUOI EM tại Ngân hàng Quân đội (MB)",
    publicAccountLine:
      "Số tài khoản minh bạch công khai 4 số QUY NUOI EM tại Ngân hàng Quân đội (MB): 1805",
    transferFormat: "Mã NE + số điện thoại + tên bạn (bắt buộc có mã NE mới chuyển khoản)",
    transferExample: "NE00123 Nguyen Van A",
  },
  faq: {
    eyebrow: "Giải đáp thắc mắc",
    title: "Câu Hỏi Thường Gặp",
    intro:
      "Những thông tin phổ biến nhất về Dự án Nuôi Em được tổng hợp tại đây để giải đáp nhanh các thắc mắc của bạn.",
    items: [
      {
        id: "dia-chi",
        question: "Địa chỉ văn phòng của Dự án Nuôi Em ở đâu?",
        type: "dia-chi",
        body: "Xin mời cả nhà, các anh chị ghé thăm văn phòng Quỹ để cùng lắng nghe những câu chuyện, để hiểu về hành trình mà Quỹ đang làm cho các con.",
        address: "15 Ngách 352/15 đường Giải Phóng - Thanh Xuân - Hà Nội",
      },
      { id: "ngan-hang", question: "Số tài khoản của Dự án Nuôi Em?", type: "ngan-hang" },
      {
        id: "quy-trinh",
        question: "Quy trình xét duyệt bảo trợ ra sao?",
        type: "quy-trinh",
        steps: [
          "Gửi công văn tới các Sở giáo dục và nhà trường tại các tỉnh",
          "Thống nhất nội dung, điều kiện hỗ trợ bao gồm chưa nhận được sự hỗ trợ từ nhà nước, bữa cơm trưa ảnh hưởng việc học",
          "Tiếp nhận thông tin, số liệu ban đầu đăng ký từ Sở giáo dục / Nhà trường",
          "Bắt đầu cấp mã từ tháng 6-7",
          "Toàn dự án ăn cơm trưa từ tháng 9",
          "Nhận thông tin chi tiết từ Sở giáo dục / Nhà trường tháng 9 - 10",
          "Nhận đầy đủ thông tin học sinh và làm ảnh thẻ, đưa lên hệ thống tra cứu tháng 11",
          "Anh chị nuôi tra cứu và vào nhóm Facebook theo bản có thầy cô giáo cắm bản nấu ăn hàng ngày báo cáo theo tháng",
          "Thăm em thực tế Tháng 11-12 và Tháng 3-4",
        ],
      },
    ],
  },
};

const about = {
  locale: "vi",
  meta: {
    title: "Về Chúng Tôi",
    description:
      "Tìm hiểu về Dự án Nuôi Em — sứ mệnh gieo mầm hy vọng và minh bạch tài chính.",
  },
  hero: {
    eyebrow: "Nuôi cơm trưa — giúp trẻ tới trường",
    title: "Dự án Nuôi Em",
    description:
      "Kết nối anh chị nuôi với trẻ vùng cao qua mã NE minh bạch. Từ 150.000đ/tháng giúp bé no bụng, đi học đầy đủ — biết rõ bé nào, có thể đi thăm. Mã Tây Nguyên: 170.000đ/tháng.",
  },
  stats: homepage.stats,
  partners_title: "Đơn vị đồng hành & Tài trợ",
  hero_image: "/images/about/digital-heart-hero.png",
};

async function main() {
  const { error: homeError } = await supabase
    .from("homepage_content")
    .upsert(homepage, { onConflict: "locale" });
  if (homeError) throw homeError;
  console.log("Restored homepage_content (vi)");

  const { data: homeRow } = await supabase
    .from("homepage_content")
    .select("sections")
    .eq("locale", "vi")
    .maybeSingle();

  const sections = homeRow?.sections ?? {};
  const meal = sections.meal ?? {};
  const blocks = Array.isArray(meal.blocks) ? [...meal.blocks] : [];

  if (blocks.length > 0) {
    blocks[0] = { ...blocks[0], text: mealFirstBlockText };
  }

  if (blocks.length > 0 || meal.title) {
    const { error: sectionsError } = await supabase
      .from("homepage_content")
      .update({ sections: { ...sections, meal: { ...meal, blocks } } })
      .eq("locale", "vi");
    if (sectionsError) throw sectionsError;
    console.log("Updated homepage sections (meal block 1)");
  }

  const { error: aboutError } = await supabase
    .from("about_page_content")
    .upsert(about, { onConflict: "locale" });
  if (aboutError) throw aboutError;
  console.log("Restored about_page_content (vi)");

  const { error: deleteEnHome } = await supabase.from("homepage_content").delete().eq("locale", "en");
  if (deleteEnHome) console.warn("Could not delete en homepage row:", deleteEnHome.message);
  else console.log("Removed homepage_content (en) if present");

  const { error: deleteEnAbout } = await supabase.from("about_page_content").delete().eq("locale", "en");
  if (deleteEnAbout) console.warn("Could not delete en about row:", deleteEnAbout.message);
  else console.log("Removed about_page_content (en) if present");

  console.log("Done. Redeploy or revalidate the site to see changes.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
