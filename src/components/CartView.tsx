"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartItemCard } from "@/components/CartItemCard";
import { SimilarProducts } from "@/components/SimilarProducts";
import { formatCurrency } from "@/lib/utils";

interface CartViewProps {
  allProducts: Product[];
}

export function CartView({ allProducts }: CartViewProps) {
  const { cartItems, cartCount, totalPrice, clearCart } = useCart();

  // Lógica para sugerir produtos
  const suggestedProducts = useMemo(() => {
    if (!allProducts) return [];

    const cartItemIds = new Set(cartItems.map((item) => item.id));
    
    return allProducts.filter((p) => !cartItemIds.has(p.id)).slice(0, 12);
  }, [allProducts, cartItems]);

  if (cartCount === 0) {
    return (
      <div className="py-16 text-center flex flex-col items-center">
        <ShoppingCart className="h-20 w-20 text-muted-foreground/50 mb-6" />
        <h1 className="text-2xl font-semibold">Seu carrinho está vazio</h1>
        <p className="mt-2 text-muted-foreground">
          Navegue pela loja para encontrar produtos que você vai amar!
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Continuar comprando</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Seu Carrinho</h1>
        <Button variant="outline" size="sm" onClick={clearCart}>
          Esvaziar Carrinho
        </Button>
      </div>
      <div className="grid lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>
        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal ({cartCount} {cartCount > 1 ? "itens" : "item"})
                </span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frete</span>
                <span className="font-medium text-primary">Grátis</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full">
                Finalizar Compra
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      {/* O slider é renderizado aqui, com os produtos já filtrados */}
      <div className="my-16">
        <Separator className="mb-12" />
        <SimilarProducts products={suggestedProducts} />
      </div>
    </>
  );
}
