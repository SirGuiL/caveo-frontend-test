import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import ClientProvider from "@/providers/clientProvider";
import { ProductStoreProvider } from "@/providers/productStoreProvider";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

const RobotoSans = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Caveo Store",
  description:
    "Caveo Store is a dynamic e-commerce platform designed to streamline product browsing and shopping cart management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen w-screen">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta charSet="UTF-8" />
      </head>

      <body className={`${RobotoSans.className} antialiased overflow-hidden`}>
        <ProductStoreProvider>
          <ClientProvider>
            <div className="h-screen w-screen overflow-hidden flex">
              <Sidebar />

              <div className="bg-gray-200 w-full h-full flex flex-col overflow-y-hidden">
                <Header />

                {children}

                <Footer />
              </div>
            </div>
          </ClientProvider>
        </ProductStoreProvider>
      </body>
    </html>
  );
}
