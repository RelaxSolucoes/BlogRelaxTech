import { subscribeToNewsletter } from '../../lib/supabase';

export const prerender = false;

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get('email');
    
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Email inválido' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const result = await subscribeToNewsletter(email);
    
    if (result.success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Email cadastrado com sucesso!' 
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: result.message 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('Erro ao processar inscrição na newsletter:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Erro ao processar solicitação' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}