import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { ProductCardCarousel } from "./ProductCardCarousel";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const discountedPrice =
    product.hasDiscount && product.discountValue
      ? product.price - (product.price * product.discountValue) / 100
      : product.price;

  const gallery = [product.imageUrl, ...(product.images || [])].filter(Boolean);

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 p-3 gap-3">
      <CardHeader className="p-0 flex-shrink-0">
        <div className="relative aspect-square rounded-md overflow-hidden">
          {gallery.length > 1 ? (
            <ProductCardCarousel gallery={gallery} productName={product.name} />
          ) : (
            <Image
              src={gallery[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
      </CardHeader>

      <Link href={`/product/${product.id}`} className="group block">
        <CardContent className="p-2 flex flex-col flex-grow">
          
          <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-2">
            {product.description}
          </CardDescription>

          {/* Seção de Preço */}
          <div className="flex flex-col mb-2 mt-auto">
            {product.hasDiscount && product.discountValue ? (
              <div className="flex justify-between items-baseline gap-2">
                <div className="flex items-baseline gap-2">
                  <p className="text-sm text-gray-500 line-through dark:text-gray-400">
                    {formatCurrency(product.price)}
                  </p>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">
                    {formatCurrency(discountedPrice)}
                  </p>
                </div>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  {product.discountValue}% OFF
                </Badge>
              </div>
            ) : (
              <p className="text-xl font-bold text-primary dark:text-primary-foreground">
                {formatCurrency(product.price)}
              </p>
            )}
          </div>

          {/* Tags de Categoria, Departamento e Origem */}
          <div className="flex flex-row flex-wrap gap-2 pt-2">
            {product.category && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-200">
                {product.category}
              </span>
            )}
            {product.department && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full dark:bg-green-900 dark:text-green-200">
                {product.department}
              </span>
            )}
            {product.source && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full dark:bg-purple-900 dark:text-purple-200">
                Origem: {product.source}
              </span>
            )}
            {product.material && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full dark:bg-yellow-900 dark:text-yellow-200">
                {product.material}
              </span>
            )}
            {product.adjective && (
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full dark:bg-gray-900 dark:text-gray-200">
                {product.adjective}
              </span>
            )}
            {product.hasDiscount && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full dark:bg-red-900 dark:text-red-200">
                Oferta!
              </span>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
