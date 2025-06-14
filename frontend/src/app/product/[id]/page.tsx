import { getAllProducts } from "@/actions/getProducts";
import { ProductDetails } from "@/components/ProductDetails";
import { SimilarProducts } from "@/components/SimilarProducts";
import { Product } from "@/lib/types";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps) {
    const products = await getAllProducts();
    const product = products.find((p) => p.id === params.id);

    if (!product) {
        return {
            title: "Produto não encontrado",
        };
    }

    return {
        title: `${product.name} | Omnimart`,
        description: product.description,
    };
}


export default async function ProductPage({ params }: ProductPageProps) {
  const products = await getAllProducts();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const similarProducts = products.filter(
    (p) =>
      p.id !== product.id &&
      (p.category === product.category || p.department === product.department)
  ).slice(0, 10); // Pega até 10 produtos similares

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        <ProductDetails product={product} />
        <SimilarProducts products={similarProducts} />
      </div>
    </div>
  );
}

// Opcional: Gerar rotas estáticas para todos os produtos no momento da build
export async function generateStaticParams() {
    const products = await getAllProducts();

    return products.map((product) => ({
        id: product.id,
    }));
}