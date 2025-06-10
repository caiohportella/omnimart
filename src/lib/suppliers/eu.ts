import { Product } from "../types";
import { SUPPLIER_EU } from "../constants";

type EUEndpointRaw = {
  id: string;
  name: string;
  description: string;
  gallery: string[];
  price: string;
  hasDiscount: boolean;
  discountValue: string;
  details: {
    adjective: string;
    material: string;
  };
};

export function normalizeEUProduct(item: EUEndpointRaw): Product {
  return {
    id: `EU-${item.id}`,
    name: item.name,
    description: item.description,
    imageUrl: Array.isArray(item.gallery) && item.gallery.length > 0 ? item.gallery[0] : "",
    images: Array.isArray(item.gallery) ? item.gallery : [],
    price: parseFloat(item.price),
    hasDiscount: item.hasDiscount,
    discountValue: parseFloat(item.discountValue) * 100,
    material: item.details?.material,
    adjective: item.details?.adjective,
    source: SUPPLIER_EU.ID,
  };
}
