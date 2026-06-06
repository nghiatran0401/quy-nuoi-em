import { formatVndDots, VND_UNIT } from "@/lib/format-vnd";

export type FinanceReportLineItem = {
  label: string;
  amountVnd: number;
  note?: string;
};

export type FinanceReportSection = {
  id: "charity" | "operations";
  index: "I" | "II";
  title: string;
  openingDate: string;
  openingBalanceVnd: number;
  closingDate: string;
  closingBalanceVnd: number;
  closingNote?: string;
  totalIncomeVnd: number;
  incomeItems?: FinanceReportLineItem[];
  totalExpenseVnd: number;
  expenseItems: FinanceReportLineItem[];
};

export const homeFinancePeriodReport = {
  periodLabel: "BC thu chi giai đoạn từ 01/06/2025-31/05/2026",
  periodShort: "01/06/2025-31/05/2026",
  sections: [
    {
      id: "charity",
      index: "I",
      title: "BC thu chi hoạt động từ thiện - Dự án Nuôi em",
      openingDate: "01/06/2025",
      openingBalanceVnd: 13_354_056_693,
      closingDate: "31/05/2026",
      closingBalanceVnd: 6_006_471_977,
      closingNote: "Bao gồm tiền ăn và cơ sở vật chất xây trường",
      totalIncomeVnd: 71_159_937_110,
      totalExpenseVnd: 78_507_521_826,
      expenseItems: [
        { label: "Chi tiền ăn Nuôi em", amountVnd: 75_018_985_426 },
        { label: "Mua Áo ấm", amountVnd: 1_917_119_000 },
        { label: "Mua Bình lọc", amountVnd: 0 },
        { label: "Hỗ trợ thầy cô", amountVnd: 190_417_400 },
        { label: "Xây trường", amountVnd: 1_381_000_000 },
      ],
    },
    {
      id: "operations",
      index: "II",
      title: "BC thu chi hoạt động vận hành toàn hệ sinh thái (từ lãi tiết kiệm, nhà tài trợ hỗ trợ chi phí vận hành)",
      openingDate: "01/06/2025",
      openingBalanceVnd: 3_856_108_542,
      closingDate: "31/05/2026",
      closingBalanceVnd: 4_538_822_078,
      totalIncomeVnd: 2_175_441_815,
      incomeItems: [
        { label: "Nhà tài trợ hỗ trợ chi phí vận hành", amountVnd: 94_652_000 },
        {
          label: "Lãi tiền tiết kiệm",
          amountVnd: 2_080_789_815,
          note: "bao gồm trong khoản tất toán 63.074.062.680 đ để chi cho các dự án thiện nguyện",
        },
      ],
      totalExpenseVnd: 1_492_728_279,
      expenseItems: [
        { label: "Hỗ trợ cán sự (20 người)", amountVnd: 1_322_427_200 },
        { label: "Hỗ trợ đi thực tế", amountVnd: 128_500_000 },
        {
          label: "Chi phí đồ dùng sửa chữa, văn phòng phẩm, chuyển phát nhanh,...",
          amountVnd: 40_446_449,
        },
        { label: "Phí chuyển tiền ngân hàng", amountVnd: 927_630 },
        { label: "Chi phí ăn uống", amountVnd: 427_000 },
      ],
    },
  ] satisfies FinanceReportSection[],
} as const;

export function formatFinanceReportAmount(amountVnd: number): string {
  return `${formatVndDots(amountVnd)} ${VND_UNIT}`;
}

export function getHomeFinancePeriodReport() {
  return homeFinancePeriodReport;
}
