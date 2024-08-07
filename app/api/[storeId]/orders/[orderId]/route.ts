import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { storeId: string; orderId: string } }
) {
  const { storeId, orderId } = params;
  const { isPaid } = await request.json();

  try {
    const updatedOrder = await prismadb.order.update({
      where: {
        id: orderId,
        storeId: storeId,
      },
      data: {
        isPaid,
      },
    });
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.error();
  }
}
