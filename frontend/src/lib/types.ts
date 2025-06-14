export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  source: "BR" | "EU";
  category?: string;
  department?: string;
  adjective?: string;
  material?: string;
  images?: string[];
  hasDiscount?: boolean;
  discountValue?: number;
}

export type ProductFilter = {
  category?: string;
  department?: string;
  source?: "BR" | "EU";
  priceMin?: number;
  priceMax?: number;
  searchTerm?: string;
  onSale?: boolean;
};

export interface CartItem extends Product {
  quantity: number;
}