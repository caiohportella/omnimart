import { Product } from "../types";
import { SUPPLIER_BR } from "../constants";

type BRProductRaw = {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  imagem: string;
  preco: string;
  material: string;
  departamento: string;
};

export function normalizeBRProduct(item: BRProductRaw): Product {
    if (!item || !item.id || !item.nome || !item.preco) {
    throw new Error("Dados do produto inválidos");
  }

  if (typeof item.preco !== "string" || isNaN(parseFloat(item.preco))) {
    throw new Error("Formato de preço inválido");
  }

  return {
    id: `BR-${item.id}`,
    name: item.nome,
    description: item.descricao,
    imageUrl: item.imagem,
    price: parseFloat(item.preco),
    category: item.categoria,
    department: item.departamento,
    material: item.material,
    source: SUPPLIER_BR.ID,
  };
}
