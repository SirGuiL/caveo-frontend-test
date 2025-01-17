"use client";

import Lottie from "react-lottie";
import { useSearchParams } from "next/navigation";

import animationData from "@/assets/order.json";
import { useProductStore } from "@/providers/productStoreProvider";
import { CartStorage } from "@/storage/cartStorage";
import { useEffect } from "react";

export default function CheckoutPage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const clearCart = useProductStore((state) => state.clearCart);
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("cart") !== "true") return;

    const handleFinishCheckout = () => {
      clearCart();

      const cartStorage = new CartStorage();
      cartStorage.clearCart();
    };

    handleFinishCheckout();
  }, [clearCart, params]);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-1">
      <Lottie options={defaultOptions} height={300} width={300} />

      <div className="flex flex-col items-center">
        <span className="text-2xl text-gray-800">
          Compra realizada com sucesso!
        </span>

        <p className="text-gray-500 text-lg">
          Em breve entraremos em contato com o seu pedido
        </p>
      </div>
    </div>
  );
}
