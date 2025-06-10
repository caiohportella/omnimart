"use client";

import Link from "next/link";
import { ShoppingCart, Newspaper } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b bg-white dark:bg-background shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          Omnimart
        </Link>
        <nav className="flex gap-6 md:gap-8 text-sm">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden md:inline">Carrinho</span>
          </Link>
          <Link
            href="/orders"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Newspaper className="h-5 w-5" />
            <span className="hidden md:inline">Pedidos</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}