"use client";

import React from "react";

import { X } from "lucide-react";
import { Button } from "./ui/button";


import { useCart } from "../context/CartContext";
import { formatCurrency, getProductPricing } from "../lib/utils";

import { FallbackImage } from "./FallbackImage";
import { CartItem } from "@shared/types/domain";


interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { removeFromCart, updateQuantity } = useCart();
  const { discountedPrice } = getProductPricing(item);

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
        <FallbackImage
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-grow">
        <p className="font-medium line-clamp-2">{item.name}</p>
        <p className="text-sm text-muted-foreground">
          {formatCurrency(discountedPrice)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          -
        </Button>
        <span>{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground"
        onClick={() => removeFromCart(item.id)}
      >
        <X className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );
}
