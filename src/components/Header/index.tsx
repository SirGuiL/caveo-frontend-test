"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logo.svg";
import { MenuToggle } from "@/components/MenuToggle";
import { motion, useCycle } from "framer-motion";
import { MobileSidebar } from "@/components/MobileSidebar";
import { useProductStore } from "@/providers/productStoreProvider";
import { CartStorage } from "@/storage/cartStorage";
import { useEffect } from "react";

const Header = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const setCart = useProductStore((state) => state.setCart);
  const cart = useProductStore((state) => state.cart);

  useEffect(() => {
    const cartStorage = new CartStorage();
    const cart = cartStorage.getCart();

    setCart(cart);
  }, [setCart]);

  return (
    <div className="flex justify-between items-center w-full bg-primary min-h-16 max-h-16 md:h-16 px-5">
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom="100%"
        className="flex md:hidden"
      >
        <MenuToggle toggle={toggleOpen} />

        <motion.div
          className="absolute top-0 right-0 bottom-0 left-0 bg-primary"
          variants={{
            open: { opacity: 1, scale: 1, left: 0, zIndex: 1 },
            closed: { opacity: 0, scale: 1, left: "100%", zIndex: 1 },
          }}
          transition={{ duration: 0.2 }}
        >
          <MobileSidebar onPressLink={toggleOpen} />
        </motion.div>
      </motion.nav>

      <div className="z-50">
        <Image
          src={Logo}
          alt="logo"
          className="h-10 w-auto"
          draggable="false"
        />
      </div>

      <div className="hidden md:flex md:gap-2 relative">
        <motion.button whileTap={{ scale: 0.85 }}>
          <Link href="/cart">
            <ShoppingCart size={20} className="text-white" />

            {cart.length > 0 && (
              <div className="absolute -top-3 -right-3 rounded-full min-w-5 min-h-5 bg-orange-500 flex items-center justify-center">
                <span className="text-xs text-white">{cart.length}</span>
              </div>
            )}
          </Link>
        </motion.button>
      </div>
    </div>
  );
};

export { Header };
