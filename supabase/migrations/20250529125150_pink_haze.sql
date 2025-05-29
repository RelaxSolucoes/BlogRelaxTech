-- Create categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('America/Sao_Paulo', NOW()) NOT NULL
);

-- Create articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('America/Sao_Paulo', NOW()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('America/Sao_Paulo', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('America/Sao_Paulo', NOW()) NOT NULL
);

-- Create a junction table for articles and categories (many-to-many)
CREATE TABLE article_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(article_id, category_id)
);

-- Create newsletter table
CREATE TABLE newsletter (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('America/Sao_Paulo', NOW()) NOT NULL
);

-- Create RLS policies for public read access
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for articles" ON articles
  FOR SELECT TO authenticated, anon USING (true);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for categories" ON categories
  FOR SELECT TO authenticated, anon USING (true);

ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for article_categories" ON article_categories
  FOR SELECT TO authenticated, anon USING (true);

-- Create RLS policy for newsletter subscriptions
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert access for newsletter" ON newsletter
  FOR INSERT TO authenticated, anon WITH CHECK (true);
CREATE POLICY "No public read access for newsletter" ON newsletter
  FOR SELECT TO authenticated USING (false);

-- Create a VIEW to simplify article and category joins
CREATE VIEW articles_with_categories AS
  SELECT 
    a.id,
    a.title,
    a.slug,
    a.excerpt,
    a.content,
    a.image_url,
    a.published_at,
    a.created_at,
    a.updated_at,
    COALESCE(
      json_agg(
        json_build_object('id', c.id, 'name', c.name)
      ) FILTER (WHERE c.id IS NOT NULL),
      '[]'::json
    ) AS categories
  FROM articles a
  LEFT JOIN article_categories ac ON a.id = ac.article_id
  LEFT JOIN categories c ON ac.category_id = c.id
  GROUP BY a.id;

-- Insert sample categories
INSERT INTO categories (name) VALUES 
  ('Desenvolvimento'), 
  ('Inteligência Artificial'),
  ('Low-code'),
  ('No-code'),
  ('DevOps'),
  ('UX/UI');

-- Create function to search articles
CREATE OR REPLACE FUNCTION search_articles(search_term TEXT)
RETURNS SETOF articles_with_categories
LANGUAGE sql
AS $$
  SELECT * FROM articles_with_categories
  WHERE 
    title ILIKE '%' || search_term || '%' OR
    excerpt ILIKE '%' || search_term || '%' OR
    content ILIKE '%' || search_term || '%'
  ORDER BY published_at DESC;
$$;