import { getAllProducts } from "./productsService";

export async function getAvailableFilters() {
  const products = await getAllProducts();

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );
  const departments = Array.from(
    new Set(products.map((p) => p.department).filter(Boolean))
  );
  const materials = Array.from(
    new Set(products.map((p) => p.material).filter(Boolean))
  );
  const adjectives = Array.from(
    new Set(products.map((p) => p.adjective).filter(Boolean))
  );

  return {
    categories,
    departments,
    materials,
    adjectives,
  };
}
