import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { getAllProducts } from "../services/productsService";

// Schema do pedido de entrada
const OrderSchema = z.object({
  customerName: z.string(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1),
      })
    )
    .min(1, "Pedido deve ter pelo menos 1 item"),
});

export type OrderInput = z.infer<typeof OrderSchema>;

export interface Order extends OrderInput {
  id: string;
  total: number;
  createdAt: string;
}

const dataFilePath = path.join(__dirname, "../../data/orders.json");

// 🔧 Ler arquivo JSON
async function readOrdersFile(): Promise<Order[]> {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data) as Order[];
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

// 💾 Salvar arquivo JSON
async function saveOrdersFile(orders: Order[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(orders, null, 2));
}

// 🔍 Listar todos os pedidos
export async function getAllOrders(): Promise<Order[]> {
  return await readOrdersFile();
}

// 🚀 Criar um novo pedido com validação e cálculo do total
export async function createOrder(orderData: OrderInput): Promise<Order> {
  const parsed = OrderSchema.parse(orderData);

  const products = await getAllProducts();
  const productMap = new Map(products.map((p) => [p.id, p]));

  let total = 0;

  // Valida cada item e calcula total
  for (const item of parsed.items) {
    const product = productMap.get(item.productId);
    if (!product) {
      console.error(`❌ Produto não encontrado: ${item.productId}`);
      throw new Error(`Produto não encontrado: ${item.productId}`);
    }
    total += product.price * item.quantity;
  }

  const newOrder: Order = {
    ...parsed,
    id: generateId(),
    total: parseFloat(total.toFixed(2)),
    createdAt: new Date().toISOString(),
  };

  const orders = await readOrdersFile();
  orders.push(newOrder);
  await saveOrdersFile(orders);

  console.log(`✅ Pedido criado: ${newOrder.id} (${parsed.customerName})`);

  return newOrder;
}

// 🔑 Gerar ID único simples
function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
