import { getProductById } from "apps/frontend/src/actions/getProducts";
import { ProductDetails } from "apps/frontend/src/components/ProductDetails";
import { ProductDetailsSkeleton } from "apps/frontend/src/components/ProductsDetailsSkeleton";

import React, { Suspense } from "react";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <div className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </div>
    </Suspense>
  );
}
