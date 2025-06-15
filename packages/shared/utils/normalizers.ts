import { FALLBACK_IMAGE_URL } from "@shared/constants";
import { BRProductAPI, EUProductAPI } from "@shared/types/apiTypes";
import { Product } from "@shared/types/domain";

export function normalizeBRProduct(items: BRProductAPI[]): Product[] {
  return items.map((item) => ({
    id: `BR-${item.id}`,
    name: item.nome,
    description: item.descricao,
    price: parseFloat(item.preco),
    imageUrl: item.imagem || FALLBACK_IMAGE_URL,
    gallery: [item.imagem || FALLBACK_IMAGE_URL],
    source: "BR",
    category: item.categoria,
    department: item.departamento,
    material: undefined,
    adjective: undefined,
    hasDiscount: false,
    discountValue: 0,
  }));
}

export function normalizeEUProduct(items: EUProductAPI[]): Product[] {
  return items.map((item) => ({
    id: `EU-${item.id}`,
    name: item.name,
    description: item.description,
    price: parseFloat(item.price),
    imageUrl: (item.gallery && item.gallery[0]) || FALLBACK_IMAGE_URL,
    gallery: item.gallery.length > 0 ? item.gallery : [FALLBACK_IMAGE_URL],
    source: "EU",
    category: undefined,
    department: undefined,
    material: item.details?.material,
    adjective: item.details?.adjective,
    hasDiscount: item.hasDiscount ?? false,
    discountValue: item.discountValue ? parseFloat(item.discountValue) : 0,
  }));
}
