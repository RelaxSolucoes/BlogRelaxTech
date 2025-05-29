-- Drop the dependent function first
DROP FUNCTION IF EXISTS search_articles;

-- Drop the existing view
DROP VIEW IF EXISTS articles_with_categories;

-- Recreate the view with proper category aggregation
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

-- Recreate the search function
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