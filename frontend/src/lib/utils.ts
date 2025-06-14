import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

export function getProductPricing(product: Product | undefined) {
  if (!product) {
    return {
      price: 0,
      discountedPrice: 0,
      showDiscount: false,
      discountPercentage: 0,
    };
  }

  const { price, hasDiscount, discountValue = 0 } = product;

  const showDiscount = hasDiscount === true && discountValue > 0;

  const discountedPrice = showDiscount
    ? price - (price * discountValue) / 100
    : price;

  return {
    price,
    discountedPrice,
    showDiscount,
    discountPercentage: discountValue,
  };
}
