"use client";

import React from "react";

import { Product, ProductFilter } from "packages/shared/types/domain";

import { useState, useMemo, useCallback } from "react";
import { SidebarFilters } from "./SidebarFilters";
import { PaginationControls } from "./PaginationControls";
import { ProductCard } from "./ProductCard";
import { SidebarFiltersSkeleton } from "./SidebarFiltersSkeleton";

type ProductsContentProps = {
  allProducts: Product[];
  categories: string[];
  departments: string[];
};

const PRODUCTS_PER_PAGE = 12;

export function ProductsContent({
  allProducts,
  categories,
  departments,
}: ProductsContentProps) {
  const [filter, setFilter] = useState<ProductFilter>({});
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesFilter =
        (!filter.category || p.category === filter.category) &&
        (!filter.department || p.department === filter.department) &&
        (!filter.source || p.source === filter.source) &&
        (!filter.priceMin || p.price >= filter.priceMin) &&
        (!filter.priceMax || p.price <= filter.priceMax) &&
        (!filter.hasDiscount || p.hasDiscount);
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

  const handleFilterChange = useCallback((newFilter: ProductFilter) => {
    setCurrentPage(1);
    setFilter(newFilter);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-1">
      <SidebarFilters
        categories={categories}
        departments={departments}
        onFilter={handleFilterChange}
        isMobileView={false}
      />

      <main className="flex-1 p-4 md:p-6">
        <div className="flex justify-end mb-4 md:hidden">
          <SidebarFilters
            categories={categories}
            departments={departments}
            onFilter={handleFilterChange}
            isMobileView={true}
          />
        </div>
        {filteredProducts.length > 0 ? (
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
