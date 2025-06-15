import { Router, Request, Response } from "express";
import { createOrder, getAllOrders } from "../models/orderModel";
import { getAllProducts } from "@backend/services/productsService";

const router = Router();

// GET /orders — Lista todos os pedidos
router.get("/", async (_req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    const products = await getAllProducts();

    const enrichedOrders = orders.map((order) => {
      const items = order.items.map((item) => {
        const product = products.find((p) => p.id === item.productId);

        return {
          productId: item.productId,
          quantity: item.quantity,
          name: product?.name ?? "Produto não encontrado",
          price: product?.price ?? 0,
          imageUrl: product?.imageUrl ?? "",
        };
      });

      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...order,
        items,
        total,
      };
    });

    res.json(enrichedOrders);
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

// POST /orders — Cria um novo pedido
router.post("/", async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const newOrder = await createOrder(orderData);

    res.status(201).json(newOrder);
  } catch (error: any) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
});

export default router;
