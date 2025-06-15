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

    products.push(
      ...euData.map((item: any) => ({
        id: `${item.id}`,
        name: item.name,
        description: item.description || "",
        price: parseFloat(item.price),
        imageUrl:
          (Array.isArray(item.gallery) && item.gallery[0]) ||
          FALLBACK_IMAGE_URL,
        gallery:
          Array.isArray(item.gallery) && item.gallery.length > 0
            ? item.gallery
            : [FALLBACK_IMAGE_URL],
        source: "EU" as const,

        // Não existem para EU
        category: undefined,
        department: undefined,

        material: item.details?.material,
        adjective: item.details?.adjective,

        hasDiscount: item.hasDiscount ?? false,
        discountValue: item.discountValue ? parseFloat(item.discountValue) : 0,
      }))
    );
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
