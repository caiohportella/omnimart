
# 🛍️ Omnimart — Monorepo E-commerce Full Stack

Omnimart é uma aplicação full stack simulando um e-commerce moderno, desenvolvido com as tecnologias mais recentes do ecossistema JavaScript/TypeScript. O projeto é estruturado como um monorepo contendo **frontend**, **backend** e um pacote **shared** que compartilha tipos, schemas e constantes entre eles.

## 📦 Arquitetura do Projeto

```
omnimart/
├── apps/
│   ├── backend/      # Backend em Node + Express
│   └── frontend/     # Frontend em Next.js App Router
├── packages/
│   └── shared/       # Tipos, utils e schemas compartilhados
└── data/             # Dados mockados (produtos, pedidos)
```

- **apps/frontend:** Aplicação em Next.js 15 App Router com React Server Components, TailwindCSS e TypeScript.
- **apps/backend:** API em Node.js com Express, manipulando os dados em arquivos JSON mockados.
- **packages/shared:** Contém todos os tipos TypeScript, normalizadores, constantes e validações zod, compartilhados entre frontend e backend.

## 🚀 Tecnologias

- Next.js 15 (App Router, React Server Components, Server Actions)
- React 19
- TailwindCSS 4.1
- TypeScript 5.8
- Express 4
- Zod (validações)
- pnpm workspaces (monorepo)

## 🔗 API Routes

### Produtos

| Verbo | Endpoint       | Descrição                |
|-------|----------------|--------------------------|
| GET   | `/products`    | Lista todos os produtos  |
| GET   | `/products/:id`| Busca produto específico |

### Pedidos

| Verbo | Endpoint       | Descrição                |
|-------|----------------|--------------------------|
| GET   | `/orders`      | Lista todos os pedidos   |
| POST  | `/orders`      | Cria novo pedido         |

### Filtros

| Verbo | Endpoint       | Descrição                          |
|-------|----------------|------------------------------------|
| GET   | `/filters`     | Lista filtros (categoria, origem) |

## 🏗️ Como rodar o projeto

### Pré-requisitos

- Node.js >= 18
- pnpm >= 8

### Passos

1. **Instalar dependências:**

```
pnpm install
```

2. **Rodar o backend:**

```
pnpm --filter backend dev
```

Servidor rodará em: [http://localhost:3333](http://localhost:3333)

3. **Rodar o frontend:**

```
pnpm --filter frontend dev
```

App rodará em: [http://localhost:3000](http://localhost:3000)

## 🎯 Decisões Técnicas

- Utilização de monorepo para compartilhar tipos e validações entre backend e frontend, garantindo consistência.
- Backend simples em Express com manipulação de JSON para simular uma API real.
- Frontend com Next.js App Router e React Server Components para melhor performance e DX moderna.
- Utilização de Server Actions, Suspense e otimização automática do Next.js 15.
- Sistema de cache de imagens com Next.js Image remoto (com fallback).
- Skeleton Loaders implementados para carregamento UX-friendly.
- Carregamento e persistência de carrinho no localStorage.
- Integração entre frontend e backend 100% tipada via shared package.

## 📄 Licença

Este projeto é apenas educacional.

## 👨‍💻 Feito com 💙 por [Seu Nome]
