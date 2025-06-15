
# 🛍️ Omnimart — Fullstack E-commerce Monolito

Este é um projeto fullstack de e-commerce desenvolvido como parte de um teste técnico para a empresa Devnology. O projeto é um **monolito** contendo:

- 🧠 **Frontend:** Next.js 14, React 19, TailwindCSS 4, TypeScript 5
- 🔗 **Backend:** Node.js + Express + TypeScript

## 🗂️ Estrutura do projeto:

```
omnimart/
├── frontend/   → Aplicação web (Next.js)
├── backend/    → API (Node.js + Express)
├── README.md   → Este arquivo
└── .gitignore
```

## 🚀 Rodando o projeto localmente

### 📦 Pré-requisitos:
- Node.js >= 18.17
- NPM >= 9 ou Yarn/Pnpm (opcional)

### 🔥 1. Clonar o projeto

```bash
git clone https://github.com/caiohportella/omnimart.git
cd omnimart
```

### 💻 2. Rodar o frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Acesse 👉 http://localhost:3000

### 🔗 3. Rodar o backend (Node.js + Express)

```bash
cd backend
npm install
npm run dev
```

API acessível em 👉 http://localhost:3333

## 🌐 Endpoints da API:

| Método | Rota            | Descrição                                |
|--------|------------------|------------------------------------------|
| GET    | `/products`      | Lista todos os produtos (BR + EU)       |
| GET    | `/products/:id`  | Detalhes de um produto específico       |
| POST   | `/orders`        | Cria um pedido (persistência local)     |
| GET    | `/orders`        | Lista todos os pedidos realizados       |

## ⚙️ Tecnologias utilizadas

### 🧠 Frontend:
- Next.js 14 (App Router, Server Actions, Partial Prerendering)
- React 19 (Server Components, useOptimistic, useActionState)
- TailwindCSS 4 (Container Queries, CSS-first config)
- TypeScript 5 (Decorators, melhorias de tipos)

### 🔗 Backend:
- Node.js + Express
- TypeScript
- Persistência local via arquivo JSON (`data/orders.json`)
- Integração com APIs externas de fornecedores

## 🛡️ Decisões técnicas
- Projeto como monolito para facilitar deploy e desenvolvimento local.
- Backend desacoplado do frontend, porém no mesmo repositório.
- Backend simples, robusto e performático, com validações e tratamento de erros.
- Frontend aproveita o que há de mais moderno no ecossistema React + Next.

## 💡 Rodando ambos juntos (opcional):

Em dois terminais separados:

```bash
cd frontend && npm run dev
```

```bash
cd backend && npm run dev
```

Ou use ferramentas como Docker ou PM2 futuramente.

## 🧠 Futuras melhorias (sugestões):
- 📦 Deploy via Vercel (frontend) e Railway/Render (backend).
- 🏗️ Docker Compose para rodar ambos juntos.
- 🗄️ Banco de dados real (SQLite, PostgreSQL, etc.).
- 🔐 Autenticação de usuários.
- 📈 Testes automatizados (Jest, Vitest).
