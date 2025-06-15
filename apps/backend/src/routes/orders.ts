import { Router, Request, Response } from "express";
import { createOrder, getAllOrders } from "../models/orderModel";

const router = Router();

// GET /orders — Lista todos os pedidos
router.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
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
