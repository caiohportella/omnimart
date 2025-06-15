import Link from "next/link";

import React from "react";


import { Badge } from "./ui/badge";
import { ProductCardCarousel } from "./ProductCardCarousel";
import { FallbackImage } from "./FallbackImage";
import { ProductTag } from "./ProductTag";
import { Product } from "packages/shared/types/domain";
import { formatCurrency, formatPercentage, getProductPricing } from "../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FALLBACK_IMAGE_URL } from "packages/shared/constants";



type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const gallery = [product.imageUrl, ...(product.gallery || [])].filter(Boolean);

  const { price, discountedPrice, showDiscount, discountPercentage } =
    getProductPricing(product);

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 p-3 gap-3">
        {/* Imagem // Galeria */}
        <CardHeader className="p-0 flex-shrink-0">
          <div className="relative aspect-square rounded-md overflow-hidden">
            {gallery.length > 1 ? (
              <ProductCardCarousel
                gallery={gallery}
                productName={product.name}
              />
            ) : (
              <FallbackImage
                src={gallery[0] || FALLBACK_IMAGE_URL}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
        </CardHeader>

        <CardContent className="p-2 flex flex-col flex-grow h-full">
          <CardTitle className="text-base font-semibold mb-2 line-clamp-2">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-2 flex-grow">
            {product.description}
          </CardDescription>

          {/* Preços */}
          <div className="mt-auto pt-4">
            <div className="flex flex-col mb-4">
              {showDiscount ? (
                <div className="flex justify-between items-baseline gap-2">
                  <div className="flex items-baseline gap-2">
                    <p className="text-sm text-gray-500 line-through dark:text-gray-400">
                      {formatCurrency(price)}
                    </p>
                    <p className="text-lg font-bold text-red-600 dark:text-red-400">
                      {formatCurrency(discountedPrice)}
                    </p>
                  </div>
                  <Badge variant="destructive">{formatPercentage(discountPercentage)} OFF</Badge>
                </div>
              ) : (
                <p className="text-lg font-bold text-foreground">
                  {formatCurrency(price)}
                </p>
              )}
            </div>

            {/* Seção de Tags */}
            <div className="flex flex-row flex-wrap gap-1">
              {product.category && (
                <ProductTag tagType="category" label={product.category} />
              )}
              {product.department && (
                <ProductTag tagType="department" label={product.department} />
              )}
              {product.source && (
                <ProductTag tagType="source" label={product.source} />
              )}
              {product.material && (
                <ProductTag tagType="material" label={product.material} />
              )}
              {product.adjective && (
                <ProductTag tagType="adjective" label={product.adjective} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
