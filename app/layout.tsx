import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/providers/modal-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Dashboard",
  description: "Customized dashboard CMS build with NEXT.JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {" "}
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}