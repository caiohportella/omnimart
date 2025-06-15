"use client";

import React from "react";

import Link from "next/link";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "../context/CartContext";

export function Header() {
  const { cartCount } = useCart();

  return (
    <header className="border-b bg-background shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          Omnimart
        </Link>
        <nav className="flex items-center text-sm">
          {/* Botão do Carrinho */}
          <Button asChild variant="ghost" className="px-2 md:px-3">
            <Link href="/cart" className="flex items-center gap-2">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-[18px] w-[18px] text-xs p-0 flex items-center justify-center"
                  >
                    {cartCount}
                  </Badge>
                )}
              </div>
              <span className="hidden md:inline">Carrinho</span>
            </Link>
          </Button>

          {/* Botão de Pedidos */}
          <Button asChild variant="ghost" className="px-2 md:px-3">
            <Link href="/orders" className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden md:inline">Pedidos</span>
            </Link>
          </Button>

          {/* Botão de Tema */}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}