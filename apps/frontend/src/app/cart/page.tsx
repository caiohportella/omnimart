import React, { Suspense } from "react";
import { getAllProducts } from "../../actions/getProducts";
import { CartView } from "../../components/CartView";
import { CartViewSkeleton } from "../../components/CartViewSkeleton";

export default async function CartPage() {
  const allProducts = await getAllProducts();

  return (
    <Suspense fallback={<CartViewSkeleton />}>
      <div className="container mx-auto px-4 py-8">
        <CartView allProducts={allProducts} />
      </div>
    </Suspense>
  );
}
