-- Homepage content is now code-managed in src/content/homepage-content.ts.
-- Remove legacy CMS table from Supabase.
drop table if exists public.homepage_content cascade;
