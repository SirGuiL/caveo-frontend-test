"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchProductById } from "@/domain/service/productService";
import { product } from "@/domain/types/product";
import { Star } from "lucide-react";
import { RelatedItems } from "@/components/RelatedItems";
import Skeleton from "react-loading-skeleton";
import { useProductStore } from "@/providers/productStoreProvider";
import { CartStorage } from "@/storage/cartStorage";
import Link from "next/link";

export default function ProductsPage() {
  const searchParams = useParams();
  const id = Number(searchParams.id);

  const { data, isLoading, isError } = useQuery<product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const addItemToCart = useProductStore((state) => state.addItemToCart);

  const handleAddInCard = () => {
    addItemToCart(data as product);

    const cartStorage = new CartStorage();
    cartStorage.addItemToCart({ ...(data as product), quantity: 1 });
  };

  if (isLoading)
    return (
      <div className="flex flex-col gap-20 p-10 overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="relative min-w-96 max-w-96 min-h-96 max-h-96 rounded-md">
            <Skeleton
              baseColor="#6b7280"
              highlightColor="#374151"
              width={384}
              height={384}
              className="rounded-md"
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Skeleton
                height={24}
                baseColor="#6b7280"
                highlightColor="#374151"
              />

              <Skeleton
                height={28}
                width={200}
                baseColor="#6b7280"
                highlightColor="#374151"
              />

              <Skeleton
                height={16}
                width={100}
                baseColor="#6b7280"
                highlightColor="#374151"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton
                height={40}
                baseColor="#6b7280"
                highlightColor="#374151"
              />

              <Skeleton
                height={40}
                baseColor="#6b7280"
                highlightColor="#374151"
              />
            </div>

            <Skeleton
              height={40}
              baseColor="#6b7280"
              highlightColor="#374151"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xl font-bold">Itens relacionados</span>

          <div className="flex">
            <RelatedItems category="" isLoading />
          </div>
        </div>
      </div>
    );

  if (isError) return <h1>Error</h1>;

  return (
    <div className="flex flex-col gap-20 p-10 overflow-y-auto">
      <div className="flex flex-col md:flex-row items-center gap-10 w-full">
        <div className="relative min-w-96 max-w-96 min-h-96 max-h-96 bg-white rounded-md lg:flex-1 lg:max-w-full">
          <Image
            src={data?.image || ""}
            alt={data?.title || ""}
            layout="fill"
            objectFit="contain"
            className="absolute inset-0"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-0">
              <span className="font-bold">{data?.title}</span>
              <span className="text-xs">{data?.category}</span>
            </div>

            <span className="font-bold text-lg">
              {data?.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>

            <div className="flex gap-1 items-center">
              <span className="text-sm leading-none">{`${data?.rating.rate}/5`}</span>

              <Star size={14} className="text-yellow-600 mb-0.5" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link href="/checkout" className="w-full">
              <motion.button
                className="bg-blue-600 text-white p-2 rounded-md w-full"
                whileTap={{ scale: 0.95 }}
              >
                Comprar
              </motion.button>
            </Link>

            <motion.button
              className="ring-1 ring-gray-700 text-gray-700 p-2 rounded-md"
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddInCard()}
            >
              Adicionar ao carrinho
            </motion.button>
          </div>

          <p className="text-sm text-gray-500">{data?.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xl font-bold">Itens relacionados</span>

        <div className="flex">
          <RelatedItems category={data?.category || ""} />
        </div>
      </div>
    </div>
  );
}
