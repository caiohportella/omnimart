"use server";

import { SUPPLIER_BR, SUPPLIER_EU } from "@/lib/constants";
import { normalizeBRProduct } from "@/lib/suppliers/br";
import { normalizeEUProduct } from "@/lib/suppliers/eu";
import { Product } from "@/lib/types";

export async function getProducts(): Promise<Product[]> {
  try {
    const [brRes, euRes] = await Promise.allSettled([
      fetch(SUPPLIER_BR.ENDPOINT, { cache: "no-store" }),
      fetch(SUPPLIER_EU.ENDPOINT, { cache: "no-store" }),
    ]);

    const brProducts: Product[] =
      brRes.status === "fulfilled"
        ? (await brRes.value.json()).map(normalizeBRProduct)
        : [];

    const euProducts: Product[] =
      euRes.status === "fulfilled"
        ? (await euRes.value.json()).map(normalizeEUProduct)
        : [];

    return [...brProducts, ...euProducts];
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products;
}