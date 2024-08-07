import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { productIds, quantities, address, phoneNumber, paymentMethod } =
      await req.json();

    // Log incoming request data for debugging
    console.log("Request Data:", {
      productIds,
      quantities,
      address,
      phoneNumber,
      paymentMethod,
    });

    // Check for missing or invalid fields
    if (
      !Array.isArray(productIds) ||
      productIds.length === 0 ||
      !Array.isArray(quantities) ||
      quantities.length === 0 ||
      !address ||
      !phoneNumber ||
      !paymentMethod ||
      productIds.length !== quantities.length
    ) {
      console.error("Validation Error: Missing or mismatched fields");
      return new NextResponse(
        JSON.stringify({ error: "Missing or mismatched fields!" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Retrieve the products
    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    // Check if all products exist
    if (products.length !== productIds.length) {
      console.error("Validation Error: Some products not found");
      return new NextResponse(
        JSON.stringify({ error: "Some products not found!" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create the order
    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        phone: phoneNumber,
        address,
        paymentMethod,
        orderItems: {
          create: productIds.map((productId: string, index: number) => ({
            product: {
              connect: {
                id: productId,
              },
            },
            quantity: quantities[index],
          })),
        },
      },
    });

    // Determine session URL based on payment method
    let sessionUrl = "";
    if (paymentMethod === "cod" || paymentMethod === "bkash") {
      sessionUrl = `${process.env.FRONTEND_STORE_URL}/cart?success=1`;
    }

    return new NextResponse(JSON.stringify({ url: sessionUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in checkout API:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
}
