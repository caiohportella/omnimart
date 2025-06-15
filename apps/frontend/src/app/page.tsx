import React from "react";


import { Suspense } from "react";
import { ProductsContent } from "../components/ProductsContent";
import { getAllProducts } from "../actions/getProducts";
import { getFilters } from "../actions/getFilters";


export default async function HomePage() {
  const allProducts = await getAllProducts();
  const { categories, departments } = await getFilters();

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProductsContent
        allProducts={allProducts}
        categories={categories}
        departments={departments}
      />
    </Suspense>
  );
}
