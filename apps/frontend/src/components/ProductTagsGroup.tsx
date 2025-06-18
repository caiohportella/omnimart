
import { Product } from "@shared/types/domain";
import { ProductTag } from "./ProductTag";


interface ProductTagsGroupProps {
  product: Product;
}

export function ProductTagsGroup({ product }: ProductTagsGroupProps) {
  return (
    <div className="flex flex-row flex-wrap gap-1">
      {/* Tags de BR */}
      {product.category && (
        <ProductTag tagType="category" label={product.category} />
      )}
      {product.department && (
        <ProductTag tagType="department" label={product.department} />
      )}

      {/* Tags de EU */}
      {product.material && (
        <ProductTag tagType="material" label={product.material} />
      )}
      {product.adjective && (
        <ProductTag tagType="adjective" label={product.adjective} />
      )}

      {/* Tag sempre presente */}
      {product.source && <ProductTag tagType="source" label={product.source} />}

      {/* Tag de desconto (se aplicável) */}
      {product.hasDiscount && <ProductTag tagType="discount" label="Oferta!" />}
    </div>
  );
}
