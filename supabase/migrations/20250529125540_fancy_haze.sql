-- Inserir artigos de exemplo

-- Desenvolvimento
INSERT INTO articles (title, slug, excerpt, content, image_url) VALUES (
  'Como Começar com React em 2025: Um Guia Completo',
  'como-comecar-com-react-2025',
  'Aprenda os fundamentos e as melhores práticas para iniciar seus projetos com React, a biblioteca JavaScript mais popular para construção de interfaces.',
  'React continua sendo uma das bibliotecas mais populares para desenvolvimento front-end em 2025. Neste guia, vamos explorar:

## Pré-requisitos

- Conhecimento básico de HTML, CSS e JavaScript
- Node.js instalado em seu computador
- Um editor de código de sua preferência

## Iniciando com React

O jeito mais moderno de criar um projeto React é utilizando o Vite. Para começar, execute:

```bash
npm create vite@latest meu-projeto -- --template react-ts
```

## Conceitos Fundamentais

1. Componentes
2. Props
3. Estado
4. Hooks
5. Roteamento

## Melhores Práticas

- Utilize TypeScript para maior segurança
- Mantenha componentes pequenos e focados
- Use gerenciamento de estado adequado
- Implemente lazy loading
- Otimize performance desde o início

## Próximos Passos

Após dominar os fundamentos, explore:

- Next.js para SSR
- Testes com Vitest
- Styled-components ou Tailwind
- React Query para gerenciamento de estado servidor',
  'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg'
);

-- Inteligência Artificial
INSERT INTO articles (title, slug, excerpt, content, image_url) VALUES (
  'GPT-4 e o Futuro do Desenvolvimento de Software',
  'gpt4-futuro-desenvolvimento-software',
  'Descubra como a mais recente versão do GPT está transformando a maneira como desenvolvemos software e quais são as implicações para o futuro da programação.',
  'A inteligência artificial está revolucionando o desenvolvimento de software, e o GPT-4 é um exemplo perfeito dessa transformação.

## O Impacto do GPT-4

- Autocompleção de código avançada
- Debugging assistido por IA
- Geração automática de testes
- Documentação inteligente
- Refatoração de código

## Benefícios para Desenvolvedores

1. Aumento de produtividade
2. Redução de erros
3. Aprendizado acelerado
4. Melhoria na qualidade do código

## Desafios e Considerações

- Dependência excessiva
- Validação de código gerado
- Questões éticas
- Privacidade e segurança

## O Futuro da Programação

A IA não substituirá programadores, mas transformará significativamente o processo de desenvolvimento.',
  'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
);

-- Low-code
INSERT INTO articles (title, slug, excerpt, content, image_url) VALUES (
  'Plataformas Low-code: Revolucionando o Desenvolvimento Empresarial',
  'plataformas-low-code-desenvolvimento-empresarial',
  'Explore como as plataformas low-code estão permitindo que empresas desenvolvam aplicações mais rapidamente e com menos recursos.',
  'As plataformas low-code estão mudando a forma como as empresas abordam o desenvolvimento de software.

## Vantagens do Low-code

1. Desenvolvimento Rápido
2. Custo-benefício
3. Menor dependência de desenvolvedores
4. Manutenção simplificada

## Principais Plataformas

- OutSystems
- Mendix
- Power Apps
- Bubble

## Casos de Uso

- Aplicações internas
- Automação de processos
- Portais de cliente
- Dashboards

## Limitações e Considerações

- Personalização limitada
- Vendor lock-in
- Escalabilidade
- Custos a longo prazo',
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'
);

-- No-code
INSERT INTO articles (title, slug, excerpt, content, image_url) VALUES (
  'Construindo um E-commerce Completo sem Código',
  'construindo-ecommerce-sem-codigo',
  'Aprenda a criar uma loja online completa utilizando apenas ferramentas no-code, sem necessidade de conhecimento em programação.',
  'Criar um e-commerce hoje é possível mesmo sem conhecimento em programação, graças às ferramentas no-code.

## Ferramentas Necessárias

- Webflow para o site
- Shopify para e-commerce
- Zapier para automações
- Airtable para gestão

## Passo a Passo

1. Design e estrutura
2. Catálogo de produtos
3. Pagamentos
4. Automação de pedidos
5. Marketing e analytics

## Funcionalidades Avançadas

- Carrinho abandonado
- Programa de fidelidade
- Integração com redes sociais
- Chat ao vivo

## Dicas e Melhores Práticas

- Foco na experiência do usuário
- Otimização para mobile
- SEO básico
- Análise de métricas',
  'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg'
);

-- Associar artigos às categorias
WITH article_data AS (
  SELECT id, slug FROM articles
)
INSERT INTO article_categories (article_id, category_id)
SELECT 
  a.id,
  c.id
FROM article_data a
CROSS JOIN categories c
WHERE 
  (a.slug = 'como-comecar-com-react-2025' AND c.name = 'Desenvolvimento') OR
  (a.slug = 'gpt4-futuro-desenvolvimento-software' AND c.name = 'Inteligência Artificial') OR
  (a.slug = 'plataformas-low-code-desenvolvimento-empresarial' AND c.name = 'Low-code') OR
  (a.slug = 'construindo-ecommerce-sem-codigo' AND c.name = 'No-code');