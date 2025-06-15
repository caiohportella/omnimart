<div align="center">
  <h1>Omnimart</h1>
</div>

<div align="center">
  <br />
  
  <img src="https://github.com/user-attachments/assets/542d77a9-4588-408c-865f-008884d509a6" alt="omnimart" />

  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=for-the-badge" alt="shadcn" />
    <img src="https://img.shields.io/badge/express.js-000000?logo=express&logoColor=fff&style=for-the-badge" alt="expressjs" />
  </div>

  <h3 align="center">Omnimart is a fullstack e-commerce platform designed to simulate a real-world marketplace by integrating multiple suppliers. This project was developed as part of a technical challenge for a junior position at Devnology.</h3>
</div>

## 🏗️ Project Structure and Architecture

The project is a **monorepo** managed with **PNPM Workspaces**, organized as follows:

```
omnimart/
├── apps/
│   ├── backend/    → Express.js REST API
│   └── frontend/   → Next.js 15 App Router
|   └── orders.json → Orders JSON database           
├── packages/
│   └── shared/     → Shared types, constants, schemas, and utils        
├── package.json    → Workspace root
├── tsconfig.json   → Root TypeScript config
└── README.md
```

### ✅ Key Decisions

- **Monorepo with PNPM Workspaces:** Centralized dependency management and type sharing between frontend and backend.
- **Backend:** Node.js with Express.js providing REST APIs for products, orders, and filters.
- **Frontend:** Next.js 15 using the App Router, React 19, Server Actions, and modern SSR/ISR features.
- **Shared Package:** Contains TypeScript types, Zod schemas, constants, and normalization utilities to keep the backend and frontend fully type-safe.
- **Caching:**  
  - Backend caches product requests for 60 seconds to avoid excessive API calls to external suppliers.
  - Frontend uses Next.js `fetch()` with `next: { revalidate: 60 }` for incremental static regeneration (ISR), ensuring up-to-date content without sacrificing performance.



## 🔗 API Endpoints Documentation

## 🛍️ Products

| Method | Endpoint          | Description                                         | Request Body | Response                                |
|--------|-------------------|-----------------------------------------------------|--------------|------------------------------------------|
| GET    | `/products`       | Get all products from BR and EU suppliers          | —            | Array of Products                        |
| GET    | `/products/:id`   | Get a single product by ID                         | —            | Product object                           |

## 🧾 Orders

| Method | Endpoint          | Description                                         | Request Body                                     | Response                                |
|--------|-------------------|-----------------------------------------------------|-------------------------------------------------|------------------------------------------|
| GET    | `/orders`         | Get all orders                                      | —                                               | Array of Orders                          |
| POST   | `/orders`         | Create a new order                                  | `{ "items": [{ "productId": string, "quantity": number }] }` | Created Order object                     |

## 🔎 Filters

| Method | Endpoint          | Description                                         | Request Body | Response                                |
|--------|-------------------|-----------------------------------------------------|--------------|------------------------------------------|
| GET    | `/filters`        | Get unique filter values like categories, departments, and sources | — | `{ categories: string[], departments: string[], sources: string[] }` |

## ✅ Example Requests

### Get all products
```http
GET http://localhost:3333/products
```

### Get product by ID
```http
GET http://localhost:3333/products/EU-1
```

### Create an order
```http
POST http://localhost:3333/orders
Content-Type: application/json

{
  "items": [
    { "productId": "EU-1", "quantity": 2 },
    { "productId": "BR-5", "quantity": 1 }
  ]
}
```

### Get filters
```http
GET http://localhost:3333/filters
```


## 🚀 Technologies Used

| Frontend            | Backend           | Shared / Infra          |
|---------------------|-------------------|-------------------------|
| Next.js 15          | Node.js + Express | TypeScript (Monorepo)   |
| React 19            | Zod Validation    | PNPM Workspaces         |
| Tailwind CSS 4      | File-based DB     | Shared Types and Utils  |
| App Router & ISR    | Caching in Memory |                         |

## 📦 Installation Guide

### Prerequisites
- Node.js >= 18
- PNPM >= 8

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/caiohportella/omnimart.git
   cd omnimart
   ```

2. **Install dependencies (root):**
   ```bash
   pnpm install
   ```

3. **Run the backend:**
   ```bash
   pnpm --filter backend dev
   ```
   - The backend runs at `http://localhost:3333`.

4. **Run the frontend:**
   ```bash
   pnpm --filter frontend dev
   ```
   - The frontend runs at `http://localhost:3000`.

## 💾 Data Persistence

- **Orders** are stored in a JSON file located at `/data/orders.json`.
- Products are fetched from external mock APIs (`BR_API` and `EU_API`).

## ⚙️ Technical Highlights

- **Caching Logic:**  
  The backend caches product requests with a **60 seconds TTL**, preventing unnecessary API hits.

- **Data Normalization:**  
  Both BR and EU suppliers return different structures; the backend uses normalization functions to transform them into a unified `Product` type.

- **Error Handling:**  
  Full error handling for unavailable APIs, invalid images, and missing data without breaking the UI.

- **Skeleton Loaders:**  
  Implemented for filters, product cards, cart, and product details to improve UX during data loading.

- **Persistent Cart:**  
  The cart state is persisted to `localStorage`, preventing loss on page refresh.

- **Responsive Design:**  
  Fully responsive with a mobile-first approach using Tailwind CSS.

## 🚧 Known Issues

- The external image provider `placeimg.com` is often down. A fallback image URL is used when the image fails to load.

## 🧠 Learnings & Takeaways

This project demonstrates:
- Type-safe fullstack development.
- API design with Express.js.
- Advanced Next.js App Router usage, caching, and data fetching strategies.
- Clean architecture in monorepos using shared packages.

## ✨ Future Improvements

- Migrate orders storage to a real database (e.g., PostgreSQL or MongoDB).
- Authentication and user management.
- Unit and E2E testing (e.g., Jest + Playwright).
- Deployment pipeline (Vercel for frontend + Railway/Fly.io for backend).

## 👨‍💻 Author

Developed by **Caio H. Portella** as part of a Fullstack Developer interview challenge.
