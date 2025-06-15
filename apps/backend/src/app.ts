import express from "express";
import cors from "cors";

import { logger } from './middlewares/logger';
import { timeout } from './middlewares/timeout';
import { errorHandler } from './middlewares/errorHandler';

import productsRouter from "./routes/products";
import ordersRouter from "./routes/orders";
import filtersRouter from "./routes/filters";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(timeout(10_000)); // 10 segundos

// Health Check
app.get("/", (_req, res) => {
  res.send("🛍️ Omnimart API is running");
});

// Rotas
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/filters", filtersRouter);

// Middleware de erro global
app.use(errorHandler);

export default app;
