import React from "react";
import { getAllProducts } from "../../actions/getProducts";
import { CartView } from "../../components/CartView";


export default async function CartPage() {
  const allProducts = await getAllProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <CartView allProducts={allProducts} />
    </div>
  );
}
