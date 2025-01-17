import Image from "next/image";
import { motion } from "framer-motion";

import { cartProduct } from "@/domain/types/product";
import { Minus, Plus, Trash } from "lucide-react";
import { useProductStore } from "@/providers/productStoreProvider";
import { CartStorage } from "@/storage/cartStorage";

const CartItem = ({
  image,
  title,
  price,
  quantity,
  id,
  category,
  description,
  rating,
}: cartProduct) => {
  const removeItemToCart = useProductStore((state) => state.removeItemToCart);
  const addItemToCart = useProductStore((state) => state.addItemToCart);
  const deleteItemToCart = useProductStore((state) => state.deleteItemToCart);

  const cartStorage = new CartStorage();

  const handleDecreaseOrRemoveItem = () => {
    removeItemToCart(id);

    cartStorage.removeItemFromCart(id);
  };

  const handleRemoveItem = () => {
    deleteItemToCart(id);
  };

  const handleIncreaseItem = () => {
    addItemToCart({
      category,
      description,
      id,
      image,
      price,
      rating,
      title,
    });

    cartStorage.addItemToCart({
      category,
      description,
      id,
      image,
      price,
      rating,
      title,
      quantity: 1,
    });
  };

  return (
    <div className="flex justify-start items-start gap-6 border-b-[1px] border-gray-400 w-full py-4">
      <div className="relative min-w-40 max-w-40 min-h-40 max-h-40 bg-white rounded-md lg:flex-1">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="contain"
          className="absolute inset-0"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-medium text-lg text-gray-700">{title}</span>

        <span className="font-normal text-base text-gray-500">
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>

        <div className="border-2 border-gray-400 rounded-lg self-start flex gap-2 items-center">
          <motion.button
            className="text-gray-800 p-2 rounded-md"
            whileTap={{ scale: 0.85 }}
            onClick={() => handleDecreaseOrRemoveItem()}
          >
            <Minus size={16} />
          </motion.button>

          <span className="text-gray-500 text-sm">{quantity}</span>

          <motion.button
            className="text-gray-800 p-2 rounded-md"
            whileTap={{ scale: 0.85 }}
            onClick={() => handleIncreaseItem()}
          >
            <Plus size={16} />
          </motion.button>
        </div>
      </div>

      <motion.button
        className="text-red-500 p-2 rounded-md ml-auto"
        whileTap={{ scale: 0.85 }}
        onClick={() => handleRemoveItem()}
      >
        <Trash size={24} />
      </motion.button>
    </div>
  );
};

export { CartItem };
