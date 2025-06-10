"use client";

import { useState, useEffect, useMemo, useCallback } from "react"; // Importe o useCallback
import { Product, ProductFilter } from "@/lib/types";
import { getAllProducts } from "@/actions/getProducts";
import { ProductCard } from "@/components/ProductCard";
import { SidebarFilters } from "@/components/SidebarFilters";
import { PaginationControls } from "@/components/PaginationControls";

const PRODUCTS_PER_PAGE = 12;

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<ProductFilter>({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadInitialProducts() {
      setIsLoading(true);
      const products = await getAllProducts();
      setAllProducts(products);
      setIsLoading(false);
    }
    loadInitialProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesFilter =
        (!filter.category || p.category === filter.category) &&
        (!filter.department || p.department === filter.department) &&
        (!filter.source || p.source === filter.source) &&
        (!filter.priceMin || p.price >= filter.priceMin) &&
        (!filter.priceMax || p.price <= filter.priceMax) &&
        (!filter.onSale || p.hasDiscount);
      const matchesSearch =
        !filter.searchTerm ||
        [p.name, p.description]
          .filter(Boolean)
          .some((value) =>
            value?.toLowerCase().includes(filter.searchTerm!.toLowerCase())
          );
      return matchesFilter && matchesSearch;
    });
  }, [allProducts, filter]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  // Use useCallback para memorizar a função e evitar recriações desnecessárias
  const handleFilterChange = useCallback((newFilter: ProductFilter) => {
    setCurrentPage(1);
    setFilter(newFilter);
  }, []); // O array de dependências vazio significa que a função nunca será recriada

  // Também é uma boa prática aplicar ao handlePageChange
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-1">
      <SidebarFilters
        products={allProducts}
        onFilter={handleFilterChange}
        isMobileView={false}
      />
      <main className="flex-1 p-4 md:p-6">
        <div className="flex justify-end mb-4 md:hidden">
          <SidebarFilters
            products={allProducts}
            onFilter={handleFilterChange}
            isMobileView={true}
          />
        </div>
        {isLoading ? (
          <div className="text-center text-gray-500 py-10">
            Carregando produtos...
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center text-gray-500 py-10">
            Nenhum produto encontrado com os filtros aplicados.
          </div>
        )}
      </main>
    </div>
  );
}
