import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Funções para interação com o Supabase
export async function getLatestArticles(limit = 10, offset = 0) {
  try {
    const { data, error } = await supabase
      .from('articles_with_categories')
      .select('*')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return [];
  }
}

export async function getAllArticleSlugs() {
  try {
    const { data, error } = await supabase
      .from('articles_with_categories')
      .select('slug')
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar slugs dos artigos:', error);
    return [];
  }
}

export async function getArticleBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('articles_with_categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao buscar artigo por slug:', error);
    return null;
  }
}

export async function getArticlesByCategory(categoryName, limit = 10, offset = 0) {
  try {
    const { data, error } = await supabase
      .from('articles_with_categories')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) throw error;

    const filteredArticles = data?.filter(article => 
      article.categories.some(category => 
        category.name === categoryName
      )
    ) || [];

    return filteredArticles.slice(offset, offset + limit);
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return [];
  }
}

export async function searchArticles(query) {
  try {
    const { data, error } = await supabase
      .rpc('search_articles', { search_term: query });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro na busca de artigos:', error);
    return [];
  }
}

export async function getAllCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('name')
      .order('name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
}

export async function subscribeToNewsletter(email) {
  try {
    const { data, error } = await supabase
      .from('newsletter')
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') {
        return { success: false, message: 'Email já cadastrado na newsletter.' };
      }
      throw error;
    }

    return { success: true, message: 'Email cadastrado com sucesso!' };
  } catch (error) {
    console.error('Erro ao cadastrar na newsletter:', error);
    return { success: false, message: 'Erro ao processar solicitação.' };
  }
}