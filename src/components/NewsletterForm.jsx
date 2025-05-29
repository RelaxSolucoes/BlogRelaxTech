import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({
        type: 'error',
        message: 'Por favor, forneça um email válido.'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('email', email);
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao processar solicitação');
      }

      // Redirect to thank you page on success
      window.location.href = '/thank-you';
    } catch (error) {
      console.error('Erro ao cadastrar na newsletter:', error);
      setStatus({
        type: 'error',
        message: error.message || 'Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="email-newsletter" className="sr-only">
            Email
          </label>
          <input
            id="email-newsletter"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
            className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-md dark:bg-primary-700 dark:hover:bg-primary-600 disabled:opacity-70"
          >
            {isSubmitting ? 'Inscrevendo...' : 'Inscrever-se'}
          </button>
        </div>
      </form>
      
      {status.message && (
        <div 
          className={`mt-3 text-sm p-2 rounded ${
            status.type === 'success' 
              ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
              : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200'
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}