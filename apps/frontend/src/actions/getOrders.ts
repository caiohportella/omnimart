"use server";

import { SERVER_ADDR } from "packages/shared/constants";
import { Order } from "packages/shared/types/domain";


export async function getAllOrders(): Promise<Order[]> {
  const res = await fetch(`${SERVER_ADDR}/orders`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}
