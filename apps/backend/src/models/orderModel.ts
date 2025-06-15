import fs from "fs/promises";
import path from "path";
import { OrderSchema, OrderInput } from "@shared/schemas/order";
import { getAllProducts } from "../services/productsService";
import { Order } from "@shared/types/domain";

const dataFilePath = path.join(__dirname, "../../../", "orders.json");

// Ler arquivo JSON
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

// Salvar arquivo JSON
async function saveOrdersFile(orders: Order[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(orders, null, 2), "utf-8");
}

// Listar todos os pedidos
export async function getAllOrders(): Promise<Order[]> {
  return await readOrdersFile();
}

// Criar um novo pedido com validação e cálculo do total
export async function createOrder(orderData: OrderInput): Promise<Order> {
  const parsed = OrderSchema.parse(orderData);

  const products = await getAllProducts();
  const productMap = new Map(products.map((p) => [p.id, p]));

  let total = 0;

  const enrichedItems = parsed.items.map((item) => {
    const product = productMap.get(item.productId);
    if (!product) {
      throw new Error(`Produto não encontrado: ${item.productId}`);
    }

    const subtotal = product.price * item.quantity;
    total += subtotal;

    return {
      productId: item.productId,
      quantity: item.quantity,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    };
  });

  const newOrder: Order = {
    id: generateId(),
    total: parseFloat(total.toFixed(2)),
    createdAt: new Date().toISOString(),
    items: enrichedItems,
  };

  const orders = await readOrdersFile();
  orders.push(newOrder);
  await saveOrdersFile(orders);

  console.log(`✅ Pedido criado: ${newOrder.id}`);

  return newOrder;
}

// Gerar ID único simples
function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
