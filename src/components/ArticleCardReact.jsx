import React from 'react';

export default function ArticleCardReact({ article, featured = false }) {
  const publishDate = new Date(article.published_at);
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(publishDate);

  // Filter out invalid categories and ensure name exists
  const categories = (article.categories || []).filter(category => category?.name);

  return (
    <article className={`card group ${featured ? 'md:flex' : ''} h-full transform transition-all duration-300 hover:scale-[1.02]`}>
      <a 
        href={`/artigos/${article.slug}`} 
        className={`block ${featured ? 'md:w-1/2' : 'w-full'} overflow-hidden ${featured ? 'md:h-auto h-48' : 'h-48'}`}
      >
        <img 
          src={article.image_url} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </a>
      
      <div className={`p-6 ${featured ? 'md:w-1/2' : 'w-full'}`}>
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((category) => (
            <a 
              key={category.name}
              href={`/categorias/${(category.name || '').toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xs font-medium py-1 px-3 bg-primary-100 text-primary-800 dark:bg-primary-900/60 dark:text-primary-100 rounded-full hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors hover:no-underline"
            >
              {category.name}
            </a>
          ))}
        </div>
        
        <h2 className={`font-bold leading-tight mb-3 ${featured ? 'text-2xl' : 'text-xl'} text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors`}>
          <a href={`/artigos/${article.slug}`} className="hover:no-underline">
            {article.title}
          </a>
        </h2>
        
        <p className="text-gray-700 dark:text-gray-100 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-200">
          <span>{formattedDate}</span>
        </div>
      </div>
    </article>
  );
}