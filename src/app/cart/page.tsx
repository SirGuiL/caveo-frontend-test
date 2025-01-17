"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { CartItem } from "@/components/CartItem";
import { EmptyCart } from "@/components/EmptyCart";

import { useProductStore } from "@/providers/productStoreProvider";

export default function Cart() {
  const cart = useProductStore((state) => state.cart);

  if (cart.length == 0) return <EmptyCart />;

  return (
    <>
      <div className="flex flex-col">
        {cart.map((product) => (
          <CartItem key={product.id} {...product} />
        ))}
      </div>

      <div className="flex justify-end">
        <Link href="/checkout?cart=true">
          <motion.button
            className="bg-blue-500 text-gray-800 py-2 px-5 rounded-md"
            whileTap={{ scale: 0.85 }}
          >
            <span className="font-normal text-white text-base">
              Finalizar compra
            </span>
          </motion.button>
        </Link>
      </div>
    </>
  );
}
