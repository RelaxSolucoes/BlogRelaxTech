import React, { useState, useRef, useEffect } from 'react';
import { searchArticles } from '../lib/supabase';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    setIsOpen(true);
    
    try {
      const searchResults = await searchArticles(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Erro na busca:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
        aria-label="Buscar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-screen max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50">
          <form onSubmit={handleSearch} className="relative mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar artigos..."
              className="w-full py-2 pl-10 pr-4 rounded-xl text-sm border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800"
              autoFocus
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </form>

          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Buscando...
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {results.map((article) => (
                  <a
                    key={article.id}
                    href={`/artigos/${article.slug}`}
                    className="block py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg px-3 -mx-3"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">{article.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{article.excerpt}</p>
                  </a>
                ))}
              </div>
            ) : query && (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Nenhum resultado encontrado
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}