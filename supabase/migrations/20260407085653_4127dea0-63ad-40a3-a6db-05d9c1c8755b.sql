
CREATE TABLE public.blog_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug_it text NOT NULL DEFAULT '',
  slug_en text NOT NULL DEFAULT '',
  slug_fr text NOT NULL DEFAULT '',
  slug_de text NOT NULL DEFAULT '',
  slug_es text NOT NULL DEFAULT '',
  title_it text NOT NULL DEFAULT '',
  title_en text NOT NULL DEFAULT '',
  title_fr text NOT NULL DEFAULT '',
  title_de text NOT NULL DEFAULT '',
  title_es text NOT NULL DEFAULT '',
  meta_description_it text,
  meta_description_en text,
  meta_description_fr text,
  meta_description_de text,
  meta_description_es text,
  content_it text NOT NULL DEFAULT '',
  content_en text NOT NULL DEFAULT '',
  content_fr text NOT NULL DEFAULT '',
  content_de text NOT NULL DEFAULT '',
  content_es text NOT NULL DEFAULT '',
  featured_image text,
  category text NOT NULL DEFAULT 'general',
  author text DEFAULT 'ZAPPER®',
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public can read published blog posts"
  ON public.blog_posts FOR SELECT
  USING (is_published = true);

-- Content editors can manage blog posts
CREATE POLICY "Content editors can insert blog posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (is_content_editor());

CREATE POLICY "Content editors can update blog posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (is_content_editor());

CREATE POLICY "Admins can delete blog posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (is_admin());

-- Admin can read all posts (including drafts)
CREATE POLICY "Admins can read all blog posts"
  ON public.blog_posts FOR SELECT
  TO authenticated
  USING (is_content_editor());

-- Updated_at trigger
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
