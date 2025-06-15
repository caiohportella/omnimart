import { Router, Request, Response } from "express";
import { getAllProducts, getProductById } from "../services/productsService";

const router = Router();

// GET /products — Lista todos os produtos
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// GET /products/:id — Produto específico
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductById((id));

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error: any) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

export default router;
