"use server";

import { SERVER_ADDR } from "@shared/constants";
import { revalidatePath } from "next/cache";


type CreateOrderInput = {
  items: { productId: string; quantity: number }[];
};

export async function createOrderAction(data: CreateOrderInput) {
  const res = await fetch(`${SERVER_ADDR}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create order");
  }

  const order = await res.json();

  // Opcional: forçar revalidação de cache se desejar
  revalidatePath("/orders");

  return order;
}
