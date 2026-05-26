export type UserRole = "editor" | "admin";

export type NewsStatus = "draft" | "published" | "archived";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

export type NewsArticleRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  published_at: string | null;
  display_date: string | null;
  status: NewsStatus;
  locale: "vi" | "en";
  author_id: string | null;
  created_at: string;
  updated_at: string;
};
