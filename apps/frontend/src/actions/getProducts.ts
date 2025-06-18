"use server";

import { SERVER_ADDR } from "@shared/constants";

export async function getAllProducts() {
  const res = await fetch(`${SERVER_ADDR}/products`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`${SERVER_ADDR}/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
}
