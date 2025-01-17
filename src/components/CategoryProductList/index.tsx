"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchProductsByCategory } from "@/domain/service/productService";
import { product } from "@/domain/types/product";

import { useProductStore } from "@/providers/productStoreProvider";
import { ProductItem } from "../ProductItem";
import { useParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const CategoryProductList = () => {
  const searchParams = useParams();
  const category = searchParams.id as string;

  const setProducts = useProductStore((state) => state.setProducts);
  const products = useProductStore((state) => state.products);

  const { data, isLoading, isError, isSuccess } = useQuery<product[]>({
    queryKey: ["categories", category],
    queryFn: () => fetchProductsByCategory(category),
  });

  useEffect(() => {
    setProducts([]);
  }, [setProducts]);

  useEffect(() => {
    const getProductsFromData = () => {
      if (data && products.length === 0) {
        setProducts(data);
      }
    };

    const getProducts = () => {
      getProductsFromData();
    };

    getProducts();
  }, [isSuccess, data, products, setProducts]);

  if (isLoading && products.length === 0)
    return (
      <div className="h-full flex items-center md:items-start">
        <div className="flex justify-center md:pt-20 w-full">
          <div className="animate-spin">
            <LoaderCircle size={64} className="text-blue-600" />
          </div>
        </div>
      </div>
    );
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className="h-full items-start overflow-y-auto p-10">
      <div className="flex flex-wrap gap-3">
        {products.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export { CategoryProductList };
