"use client";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";
import axios from "axios";

interface OrderClientProps {
  data: OrderColumn[];
  storeId: string; // Add storeId prop
}

const OrderClient: React.FC<OrderClientProps> = ({ data, storeId }) => {
  const [orders, setOrders] = useState(data);

  const updateOrderStatus = async (orderId: string, isPaid: boolean) => {
    try {
      await axios.patch(`/api/${storeId}/orders/${orderId}`, { isPaid });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, isPaid } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return (
    <>
      <Heading
        title={`Orders (${orders.length})`}
        description="Manage orders for your store."
      />
      <Separator />
      <DataTable
        searchKey="products"
        columns={[
          ...columns,
          {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => {
              const { id, isPaid } = row.original;
              return (
                <button
                  onClick={() => updateOrderStatus(id, !isPaid)}
                  className={`px-4 py-2 rounded w-20 ${
                    isPaid ? "bg-red-500" : "bg-green-500"
                  } text-white`}
                >
                  {isPaid ? "Unpaid" : "Paid"}
                </button>
              );
            },
          },
        ]}
        data={orders}
      />
    </>
  );
};

export default OrderClient;
