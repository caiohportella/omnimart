

import { getProductById } from "@/actions/getProducts";
import { ProductDetails } from "@/components/ProductDetails";
import { ProductDetailsSkeleton } from "@/components/ProductsDetailsSkeleton";
import React, { Suspense } from "react";

type paramsType = Promise<{ id: string }>;

export default async function ProductPage(props: { params: paramsType }) {
  const { id } = await props.params;
  const product = await getProductById(id);

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <div className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </div>
    </Suspense>
  );
}
