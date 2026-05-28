-- Esquema SQL para la tabla de comentarios en Cloudflare D1
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_slug TEXT NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice optimizado para búsquedas por slug de artículo
CREATE INDEX IF NOT EXISTS idx_comments_post_slug ON comments(post_slug);
