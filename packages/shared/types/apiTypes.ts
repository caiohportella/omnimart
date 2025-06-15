import { OrderInput } from "@shared/schemas/order";

export type BRProductAPI = {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  categoria: string;
  departamento: string;
};

export type EUProductAPI = {
  id: string;
  name: string;
  description: string;
  price: string;
  gallery: string[];
  details: {
    material: string;
    adjective: string;
  };
  hasDiscount: boolean;
  discountValue: string;
};

export interface Order extends OrderInput {
  id: string;
  total: number;
  createdAt: string;
}