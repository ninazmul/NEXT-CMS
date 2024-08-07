import prismadb from "@/lib/prismadb";
import OrderClient from "./components/client";
import { format } from "date-fns";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

export default async function OrdersPage({
  params,
}: {
  params: { storeId: string };
}) {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    paymentMethod: item.paymentMethod,
    products: item.orderItems
      .map(
        (orderItem) => `${orderItem.product.name} (Qty: ${orderItem.quantity})`
      )
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, orderItem) => {
        return total + Number(orderItem.product.price) * orderItem.quantity;
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}
