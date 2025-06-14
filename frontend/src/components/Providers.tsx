"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartProvider>
        {children}
        <Toaster richColors closeButton />
      </CartProvider>
    </ThemeProvider>
  );
}
