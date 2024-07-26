import axios from "axios";

const bkash = axios.create({
  baseURL: "https://checkout.sandbox.bka.sh/v1.2.0-beta",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.BKASH_API_KEY}`,
  },
});

export const createBkashSession = async (amount: number, orderId: string) => {
  const response = await bkash.post("/checkout/payment", {
    amount,
    currency: "BDT",
    intent: "sale",
    merchantInvoiceNumber: orderId,
  });
  return response.data;
};
