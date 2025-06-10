// src/context/CartContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { Product, CartItem } from "@/lib/types";
import { getProductPricing } from "@/lib/utils";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
  totalOriginalPrice: number;
  totalDiscount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const { totalOriginalPrice, totalPrice } = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => {
        const { price, discountedPrice } = getProductPricing(item);
        acc.totalOriginalPrice += price * item.quantity;
        acc.totalPrice += discountedPrice * item.quantity;
        return acc;
      },
      { totalOriginalPrice: 0, totalPrice: 0 }
    );
  }, [cartItems]);

  const totalDiscount = totalOriginalPrice - totalPrice;

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    totalPrice,
    totalOriginalPrice,
    totalDiscount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
