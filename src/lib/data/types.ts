export type ChildStatus =
  | "Đang nhận bảo trợ"
  | "Hoàn thành bảo trợ"
  | "Chấm dứt bảo trợ"
  | "Tạm ngưng";

export type Child = {
  code: string;
  name: string;
  birthYear: number;
  gender: "Nam" | "Nữ";
  province: string;
  status: ChildStatus;
};

export type ChildrenSummary = {
  total: number;
  active: number;
  completed: number;
  terminated: number;
  paused: number;
};

export type FinancialReport = {
  id: string;
  title: string;
  year: number;
  imageUrl: string;
  totalIncome: string;
  totalExpense: string;
  documentUrl?: string;
  incomeNote?: string;
  expenseNote?: string;
};

export type NewsArticle = {
  slug: string;
  title: string;
  /** Human-readable display date (Vietnamese locale formatted). */
  date: string;
  /** ISO 8601 publish timestamp for SEO/OG (`article:published_time`). */
  publishedAt?: string;
  /** ISO 8601 last update timestamp for SEO/OG (`article:modified_time`). */
  updatedAt?: string;
  excerpt?: string;
  imageUrl?: string;
};

export type NewsArticleDetail = NewsArticle & {
  content: string;
};
