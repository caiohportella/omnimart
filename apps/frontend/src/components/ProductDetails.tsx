"use client";

import { ShoppingCart } from "lucide-react";

import { ProductTag } from "./ProductTag";

import { toast } from "sonner";
import { Product } from "packages/shared/types/domain";
import { useCart } from "../context/CartContext";
import {
  formatCurrency,
  formatPercentage,
  getProductPricing,
} from "../lib/utils";
import { ProductCardCarousel } from "./ProductCardCarousel";
import { FallbackImage } from "./FallbackImage";
import { Button } from "./ui/button";
import { SimilarProducts } from "./SimilarProducts";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const { price, discountedPrice, showDiscount, discountPercentage } =
    getProductPricing(product);
  const gallery =
    product.gallery.length > 0 ? product.gallery : [product.imageUrl];

  const handleAddToCart = () => {
    addToCart({ ...product });
    toast.success(`${product.name} foi adicionado ao carrinho!`);
  };

  const hasTags =
    !!product.category ||
    !!product.department ||
    !!product.material ||
    !!product.adjective;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
      {/* Images */}
      <div className="lg:col-span-2">
        <div className="relative aspect-square rounded-lg overflow-hidden md:sticky md:top-24 h-fit">
          {gallery.length > 1 ? (
            <ProductCardCarousel gallery={gallery} productName={product.name} />
          ) : (
            <FallbackImage
              src={gallery[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-6 lg:col-span-3">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              {product.name}
            </h1>
            <ProductTag tagType="source" label={product.source} />
          </div>
          {product.description && (
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {showDiscount ? (
            <div className="flex items-baseline gap-3">
              <p className="text-xl text-muted-foreground line-through">
                {formatCurrency(price)}
              </p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(discountedPrice)}
              </p>
            </div>
          ) : (
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(price)}
            </p>
          )}

          {showDiscount && (
            <ProductTag
              tagType="discount"
              label={`${formatPercentage(discountPercentage)} OFF`}
            />
          )}
        </div>

        {/* Button */}
        <div>
          <Button
            size="lg"
            className="w-full cursor-pointer"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Adicionar ao Carrinho
          </Button>
        </div>

        {/* Tags */}
        {hasTags && (
          <div className="flex flex-col gap-3 pt-6 border-t">
            <h3 className="font-semibold text-lg">Tags</h3>
            <div className="flex flex-row flex-wrap gap-2">
              {product.category && (
                <ProductTag tagType="category" label={product.category} />
              )}
              {product.department && (
                <ProductTag tagType="department" label={product.department} />
              )}
              {product.material && (
                <ProductTag tagType="material" label={product.material} />
              )}
              {product.adjective && (
                <ProductTag tagType="adjective" label={product.adjective} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
