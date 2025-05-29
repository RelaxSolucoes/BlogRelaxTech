import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL e Anon Key são obrigatórios nas variáveis de ambiente!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funções para interação com o Supabase
export async function getLatestArticles(limit = 10, offset = 0) {
  const { data, error } = await supabase
    .from('articles_with_categories')
    .select('*')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Erro ao buscar artigos:', error);
    return [];
  }

  return data || [];
}

export async function getAllArticleSlugs() {
  const { data, error } = await supabase
    .from('articles_with_categories')
    .select('slug')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar slugs dos artigos:', error);
    return [];
  }

  return data || [];
}

export async function getArticleBySlug(slug) {
  const { data, error } = await supabase
    .from('articles_with_categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Erro ao buscar artigo por slug:', error);
    return null;
  }

  return data;
}

export async function getArticlesByCategory(categoryName, limit = 10, offset = 0) {
  const { data, error } = await supabase
    .from('articles_with_categories')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar artigos:', error);
    return [];
  }

  // Filtra os artigos que contêm a categoria especificada
  const filteredArticles = data?.filter(article => 
    article.categories.some(category => 
      category.name === categoryName
    )
  ) || [];

  // Aplica a paginação após a filtragem
  return filteredArticles.slice(offset, offset + limit);
}

export async function searchArticles(query) {
  const { data, error } = await supabase
    .rpc('search_articles', { search_term: query });

  if (error) {
    console.error('Erro na busca de artigos:', error);
    return [];
  }

  return data || [];
}

export async function getAllCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('name')
    .order('name');

  if (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }

  return data || [];
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
      console.error('Erro ao cadastrar na newsletter:', error);
      return { success: false, message: 'Erro ao cadastrar na newsletter.' };
    }

    return { success: true, message: 'Email cadastrado com sucesso!' };
  } catch (error) {
    console.error('Erro ao cadastrar na newsletter:', error);
    return { success: false, message: 'Erro ao processar solicitação.' };
  }
}