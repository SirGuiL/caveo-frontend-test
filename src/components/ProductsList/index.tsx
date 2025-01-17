"use client";

import { useEffect, UIEvent, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "@/domain/service/productService";
import { product } from "@/domain/types/product";

import { useProductStore } from "@/providers/productStoreProvider";
import { ProductItem } from "../ProductItem";
import { LoaderCircle } from "lucide-react";

const ProductsList = () => {
  const container = useRef<HTMLDivElement>(null);

  const page = useProductStore((state) => state.page);
  const goToNextPage = useProductStore((state) => state.goToNextPage);
  const setPage = useProductStore((state) => state.setPage);
  const setProducts = useProductStore((state) => state.setProducts);
  const products = useProductStore((state) => state.products);

  const { data, isLoading, isError, isSuccess } = useQuery<product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      loadMoreItems();
    }
  };

  const loadMoreItems = async () => {
    if (data && data.length === products.length) return;

    goToNextPage();

    if (data) {
      setProducts([...products, ...data.slice(page * 10, (page + 1) * 10)]);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [setProducts, setPage]);

  useEffect(() => {
    setTimeout(() => {
      if (container.current) {
        if (
          (container.current as unknown as HTMLDivElement).scrollHeight <=
          (container.current as unknown as HTMLDivElement).clientHeight
        ) {
          if (data && data.length === products.length) return;

          goToNextPage();

          if (data) {
            setProducts([
              ...products,
              ...data.slice(page * 10, (page + 1) * 10),
            ]);
          }
        }
      }
    }, 500);
  }, [container, data, products, page, goToNextPage, setProducts]);

  useEffect(() => {
    const getProductsFromData = () => {
      if (data && products.length === 0) {
        setProducts(data.slice((page - 1) * 10, page * 10));
      }
    };

    const getProducts = () => {
      getProductsFromData();
    };

    getProducts();
  }, [isSuccess, data, products, page, setProducts]);

  if (isLoading && products.length === 0) {
    return (
      <div className="h-full flex items-center md:items-start">
        <div className="flex justify-center md:pt-20 w-full">
          <div className="animate-spin">
            <LoaderCircle size={64} className="text-blue-600" />
          </div>
        </div>
      </div>
    );
  }
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div
      onScroll={handleScroll}
      ref={container}
      className="h-full items-start overflow-y-auto p-10"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start md:flex-wrap gap-10 md:gap-3">
        {products.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export { ProductsList };
