# Relax Tech Blog

Um blog moderno e responsivo desenvolvido com Astro, React, Tailwind CSS e Supabase, focado em conteúdo sobre desenvolvimento, inteligência artificial, low-code e no-code.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [Astro](https://astro.build/) - Framework web moderno com foco em performance
- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Supabase](https://supabase.com/) - Plataforma de banco de dados e backend
- [N8N](https://n8n.io/) - Plataforma de automação para publicação de artigos

## 💡 Funcionalidades

- ✨ Design moderno e responsivo
- 🌓 Tema claro/escuro
- 🔍 Busca de artigos em tempo real
- 📱 Layout otimizado para mobile
- 📧 Sistema de newsletter
- 🔄 Integração automática com N8N para publicação de artigos
- 🗃️ Categorização de conteúdo
- 🔗 URLs amigáveis para SEO
- 📊 Rotas dinâmicas para artigos

## 🛠️ Estrutura do Projeto

```
/
├── public/          # Arquivos estáticos
├── src/
│   ├── components/  # Componentes React e Astro
│   ├── layouts/     # Layouts compartilhados
│   ├── lib/         # Utilitários e integrações
│   ├── pages/       # Páginas da aplicação
│   └── styles/      # Estilos globais
└── supabase/        # Migrações e configurações do Supabase
```

## 🔧 Desenvolvimento

Este projeto foi desenvolvido com ajuda do [bolt.new](https://bolt.new), que forneceu um ambiente de desenvolvimento integrado e otimizado.

### Características do Desenvolvimento

- **Arquitetura SSR**: Utiliza Server-Side Rendering para melhor performance e SEO
- **Integração Contínua**: Publicação automática de artigos via N8N
- **Banco de Dados**: Estrutura relacional no Supabase com tabelas para artigos, categorias e newsletter
- **Design System**: Interface consistente com Tailwind CSS e componentes reutilizáveis

## 📝 Publicação de Conteúdo

O blog utiliza um fluxo automatizado para publicação de conteúdo:

1. Artigos são criados em uma fonte externa (CMS, planilha, etc.)
2. N8N monitora alterações e sincroniza com o Supabase
3. Páginas são geradas dinamicamente usando rotas SSR
4. Conteúdo é disponibilizado instantaneamente sem necessidade de rebuild

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Adicione suas credenciais do Supabase

# Iniciar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com 💜 usando [bolt.new](https://bolt.new)