"use client";

import { Home, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { useProductStore } from "@/providers/productStoreProvider";

const Footer = () => {
  const cart = useProductStore((state) => state.cart);

  return (
    <div className="flex md:hidden items-center justify-around w-full min-h-16 max-h-16 bg-primary text-gray-200">
      <motion.button
        className="text-white p-2 rounded-md"
        whileTap={{ scale: 0.85 }}
      >
        <Link href="/">
          <Home className="h-8 w-8 text-white" />
        </Link>
      </motion.button>

      <motion.button
        className="text-white p-2 rounded-md relative"
        whileTap={{ scale: 0.85 }}
      >
        <Link href="/cart">
          <ShoppingCart className="h-8 w-8 text-white" />

          {cart.length > 0 && (
            <div className="absolute top-0 right-0 rounded-full min-w-6 min-h-6 bg-orange-500 flex items-center justify-center">
              <span className="text-sm text-white">{cart.length}</span>
            </div>
          )}
        </Link>
      </motion.button>
    </div>
  );
};

export { Footer };
