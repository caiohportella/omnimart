import { z } from "zod";

export const OrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1, "Quantidade deve ser pelo menos 1"),
      })
    )
    .min(1, "O pedido deve ter pelo menos 1 item"),
});

export type OrderInput = z.infer<typeof OrderSchema>;
