import { getAllOrders } from "../../actions/getOrders";
import { formatCurrency } from "../../lib/utils";
import { FallbackImage } from "../../components/FallbackImage";

export const revalidate = 60;

export default async function OrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Meus Pedidos</h1>

      {orders.length === 0 ? (
        <p className="text-muted-foreground">Nenhum pedido encontrado.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold text-lg">Pedido #{order.id}</h2>
                  <p className="text-sm text-muted-foreground">
                    Realizado em{" "}
                    {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total:</p>
                  <p className="text-lg font-bold">
                    {formatCurrency(order.total)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <FallbackImage
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(item.price)} x {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
