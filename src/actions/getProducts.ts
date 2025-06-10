"use server";

import { SUPPLIER_BR, SUPPLIER_EU } from "@/lib/constants";
import { normalizeBRProduct } from "@/lib/suppliers/br";
import { normalizeEUProduct } from "@/lib/suppliers/eu";
import { Product } from "@/lib/types";

async function getProducts(): Promise<Product[]> {
  try {
    const [brRes, euRes] = await Promise.allSettled([
      fetch(SUPPLIER_BR.ENDPOINT, { next: { revalidate: 3600 } }), // Revalida a cada hora
      fetch(SUPPLIER_EU.ENDPOINT, { next: { revalidate: 3600 } }),
    ]);

    const products: Product[] = [];

    // Processa produtos do fornecedor BR
    if (brRes.status === "fulfilled") {
      const rawBrProducts = await brRes.value.json();
      for (const item of rawBrProducts) {
        try {
          // Tenta normalizar cada produto individualmente
          const normalized = normalizeBRProduct(item);
          products.push(normalized);
        } catch (error) {
          // Se falhar, registra o erro e continua para o próximo
          console.error("Produto BR inválido foi pulado:", {
            product: item,
            error,
          });
        }
      }
    }

    // Processa produtos do fornecedor EU
    if (euRes.status === "fulfilled") {
      const rawEuProducts = await euRes.value.json();
      for (const item of rawEuProducts) {
        try {
          // Tenta normalizar cada produto individualmente
          const normalized = normalizeEUProduct(item);
          products.push(normalized);
        } catch (error) {
          // Se falhar, registra o erro e continua para o próximo
          console.error("Produto EU inválido foi pulado:", {
            product: item,
            error,
          });
        }
      }
    }

    return products;
  } catch (error) {
    console.error("Erro geral ao buscar produtos:", error);
    return [];
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products;
}
