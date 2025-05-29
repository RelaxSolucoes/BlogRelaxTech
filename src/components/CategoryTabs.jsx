import React, { useState } from 'react';
import ArticleCardReact from './ArticleCardReact';

export default function CategoryTabs({ categories, articles }) {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Get all articles for the "Todos" tab
  const allArticles = articles.reduce((acc, category) => [...acc, ...category.articles], []);
  
  // Get articles for the active category
  const activeArticles = activeCategory === 'all' 
    ? allArticles 
    : articles.find(cat => cat.name === activeCategory)?.articles || [];

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-primary-600 text-white dark:bg-primary-500'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.name
                ? 'bg-primary-600 text-white dark:bg-primary-500'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeArticles.map((article) => (
          <ArticleCardReact key={article.id} article={article} />
        ))}
      </div>
      
      {activeArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            Nenhum artigo encontrado nesta categoria.
          </p>
        </div>
      )}
    </div>
  );
}