import { SCHOOL_BUILD_URL } from "@/content/quy-trinh-cap-ma-2026";
import { nuoiEmImage } from "@/lib/nuoiem-images";

export type ImpactInitiative = {
  title: string;
  description: string;
  image: string;
};

export type ImpactMilestone = {
  id: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  body: string;
  initiatives: readonly ImpactInitiative[];
  footer?: string;
};

export const impactJourneySectionCopy = {
  milestones: [
    {
      id: "2018",
      titleBefore: "Từ 2018, không chỉ là nuôi ",
      titleHighlight: "cơm trưa",
      titleAfter: "",
      body: "Hơn 25.000 bé tại Điện Biên và các vùng cao không chỉ được ăn no — các dự án bổ trợ triển khai đồng loạt, hoàn toàn không cần đóng thêm phí ngoài khoản nuôi em/năm học.",
      initiatives: [
        {
          title: "Lọc nước bình gốm UNICEF",
          description: "Triển khai tại 500+ điểm bản từ 12/2018.",
          image: "/images/nuoiem/quy-20220415043205.png",
        },
        {
          title: "Tủ đồ chơi cũ",
          description: "Thử nghiệm 13 bản năm 2018 — mục tiêu phủ 100 điểm 2019–2020.",
          image: nuoiEmImage("mascotASang"),
        },
      ],
    },
    {
      id: "2019",
      titleBefore: "Từ 2019, phát huy điều kì diệu ",
      titleHighlight: "từ số đông",
      titleAfter: "",
      body: "Đệm, chăn, tủ sách, áo ấm đồng phục… mở rộng song song với bữa cơm trưa — lấy từ khoản cơ sở vật chất trong mức đóng góp hàng năm.",
      initiatives: [
        {
          title: "Đệm, chăn",
          description: "Thử nghiệm 6 bản 2018, triển khai đồng bộ 360 điểm bản 2019–2020.",
          image: "/images/nuoiem/khuyen-khich-20220415045805.png",
        },
        {
          title: "Tủ sách vùng cao",
          description: "Hơn 150 điểm bản trong năm học 2019–2020.",
          image: "/images/nuoiem/3-1541577888.png",
        },
        {
          title: "Áo ấm đồng phục",
          description: "Tặng áo ấm mới đồng phục cho các bé từ 2019–2020.",
          image: "/images/nuoiem/ao-1552989938.png",
        },
      ],
      footer:
        "Tâm lý anh chị nuôi rất thích tặng thêm quà cho bé — quỹ thống nhất: nếu tặng, nên tặng cái các em dùng chung. Một ngôi trường là điều thiết thực nhất. (Đã xây dựng thành công hơn 200 công trình trong vòng 09 năm qua.)",
    },
  ] satisfies ImpactMilestone[],
  infrastructure: {
    eyebrow: "Đặc biệt từ năm học 2020 – 2021",
    title: "Quỹ Nuôi Em thu thêm",
    amount: "100.000đ / mã NE",
    subtitle: "Tiền cơ sở vật chất",
    body: "Số tiền này sẽ lên tới hơn 1.000.000.000 mỗi năm, kết hợp với dự án Sức mạnh 2000 sẽ giúp xây dựng ngay lập tức 15 điểm trường tại bản (chỉ tính 2021–2022).",
    bodyEmphasis: "ngay lập tức",
    schoolBuildUrl: SCHOOL_BUILD_URL,
    beforeImage: "/images/nuoiem/truong-nat-1541577909.png",
    afterImage: "/images/nuoiem/truong-1541572871.png",
    beforeLabel: "Trước",
    afterLabel: "Sau",
  },
  results: {
    posterImage: "/images/nuoiem/csvc19-20-20210905133309.jpg",
    posterAlt: "Điều kỳ diệu — các điểm trường đã xây 2019–2020",
    title: "Đây là kết quả của việc 8.700 anh chị nuôi em đồng lòng",
    body: "Đóng thêm 50.000đ/bé/năm tiền cơ sở vật chất — 2019–2021: góp 26 điểm trường đã được xây. Jack Ma từng nói: nếu kiếm của mỗi người dân Trung Quốc 1 USD thì sẽ trở thành tỉ phú — và ông đã làm được. Năm 2020, nhìn 8.700 người nuôi 8.700 bé, quỹ nhẩm tính: 50.000đ/365 ngày mỗi ngày chưa tới 140đ, mà sức mạnh thần kỳ: 430.000.000đ đủ xây 3 điểm trường luôn.",
    linkLabel: "Xem chi tiết 26 điểm trường",
    linkHref: SCHOOL_BUILD_URL,
  },
  banner: {
    image: nuoiEmImage("heSinhThai"),
    alt: "Collage các công trình trường học Nuôi Em",
    stat: "2,889 tỷ",
    lines: ["Tiền cơ sở vật chất", "2021 – 2022", "Góp xây 15 trường"],
    footerUrl: SCHOOL_BUILD_URL,
    footerLabel: "sucmanh2000.com",
  },
} as const;
