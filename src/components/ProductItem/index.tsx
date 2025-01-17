import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { product } from "@/domain/types/product";

interface ProductItemProps extends product {
  isLoading?: boolean;
}

const ProductItem = ({
  image,
  title,
  rating,
  id,
  price,
  category,
  isLoading,
}: ProductItemProps) => {
  if (isLoading)
    return (
      <div className="flex flex-col gap-2 w-full md:w-48 cursor-pointer">
        <div className="relative min-w-full max-w-full md:min-w-48 md:max-w-48 h-48 bg-white rounded-md">
          <Skeleton
            baseColor="#6b7280"
            highlightColor="#374151"
            className="max-w-full md:min-w-48 md:max-w-48 h-48"
          />
        </div>

        <Skeleton height={24} baseColor="#6b7280" highlightColor="#374151" />

        <div className="flex flex-col gap-1">
          <Skeleton height={20} baseColor="#6b7280" highlightColor="#374151" />

          <Skeleton height={16} baseColor="#6b7280" highlightColor="#374151" />

          <span className="h-0.5 w-full bg-gray-400"> </span>

          <div className="flex justify-between items-center">
            <Skeleton
              height={24}
              width={70}
              baseColor="#6b7280"
              highlightColor="#374151"
            />
          </div>
        </div>
      </div>
    );

  return (
    <Link href={`/products/${id}`} className="w-full md:w-48">
      <div className="flex flex-col gap-2 w-full md:w-48 cursor-pointer">
        <div className="relative min-w-full max-w-full md:min-w-48 md:max-w-48 h-48 bg-white rounded-md">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="contain"
            className="absolute inset-0"
          />
        </div>

        <div className="flex flex-col gap-0">
          <span className="font-bold text-ellipsis line-clamp-1">{title}</span>
          <span className="text-xs">{category}</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <div className="flex gap-1 items-center justify-center">
              <span className="text-sm leading-none">{`${rating.rate}/5`}</span>
              <Star size={20} className="text-yellow-600" />
            </div>
          </div>

          <span className="text-xs">{rating.count} compras realizadas</span>

          <span className="h-0.5 w-full bg-gray-400"> </span>

          <div className="flex justify-between items-center">
            <span className="text-md font-bold">
              {price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { ProductItem };
