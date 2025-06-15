// Atributos específicos
export type BRAttributes = {
  category?: string;
  department?: string;
};

export type EUAttributes = {
  material?: string;
  adjective?: string;
  hasDiscount?: boolean;
  discountValue?: number;
};

// Produto normalizado
export interface Product extends BRAttributes, EUAttributes {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  gallery: string[];
  price: number;
  source: "BR" | "EU";
}

// Filtros
export interface ProductFilter extends BRAttributes, EUAttributes {
  source?: "BR" | "EU";
  searchTerm?: string;
  priceMin?: number;
  priceMax?: number;
  hasDiscount?: boolean;
}

// Carrinho
export interface CartItem extends Product {
  quantity: number;
}

// Filtros laterais
export type SidebarFiltersProps = {
  categories: string[];
  departments: string[];
  onFilter: (filter: ProductFilter) => void;
  isMobileView?: boolean;
};

// Pedido
export interface Order {
  id: string;
  createdAt: string;
  total: number;
  items: Array<{
    productId: string;
    quantity: number;
    name: string;
    price: number;
    imageUrl: string;
  }>;
}
