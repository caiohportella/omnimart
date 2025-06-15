import { Product } from "@shared/types/domain";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";
import { BR_API, EU_API, FALLBACK_IMAGE_URL } from "@shared/constants";
import {
  normalizeBRProduct,
  normalizeEUProduct,
} from "@shared/utils/normalizers";

let cachedProducts: Product[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60 * 1000; // 60 segundos

// Obter todos os produtos
export async function getAllProducts(): Promise<Product[]> {
  const now = Date.now();

  if (cachedProducts && now - cacheTimestamp < CACHE_TTL) {
    return cachedProducts;
  }

  const [brProducts, euProducts] = await Promise.allSettled([
    fetchWithTimeout(BR_API),
    fetchWithTimeout(EU_API),
  ]);

  const products: Product[] = [];

  if (brProducts.status === "fulfilled") {
    const brData = normalizeBRProduct(brProducts.value);

    products.push(...brData);
  } else {
    console.warn("⚠️ Failed to fetch BR products:", brProducts.reason);
  }

  if (euProducts.status === "fulfilled") {
    const euData = normalizeEUProduct(euProducts.value);

    products.push(...euData);
  } else {
    console.warn("⚠️ Failed to fetch EU products:", euProducts.reason);
  }

  if (products.length === 0) {
    throw new Error("Failed to fetch products from both suppliers.");
  }

  cachedProducts = products;
  cacheTimestamp = now;

  return products;
}

// Obter produto específico
export async function getProductById(id: string): Promise<Product | undefined> {
  const allProducts = await getAllProducts();
  return allProducts.find((product) => product.id === id);
}
