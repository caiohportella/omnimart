import React from "react";

import { Suspense } from "react";
import { ProductsContent } from "../components/ProductsContent";
import { getAllProducts } from "../actions/getProducts";
import { getFilters } from "../actions/getFilters";
import { ProductsContentSkeleton } from "../components/ProductsContentSkeleton";

export default async function HomePage() {
  const [allProducts, filters] = await Promise.all([
    getAllProducts(),
    getFilters(),
  ]);

  const { categories, departments } = filters;

  return (
    <Suspense
      fallback={
        <div className="items-center justify-center text-primary-foreground">
          <ProductsContentSkeleton />
        </div>
      }
    >
      <ProductsContent
        allProducts={allProducts}
        categories={categories}
        departments={departments}
      />
    </Suspense>
  );
}
