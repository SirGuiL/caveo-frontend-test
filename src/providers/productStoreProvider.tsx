"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  ProductActions,
  type ProductState,
  createProductStore,
} from "@/stores/productsStore";

export type ProductStoreApi = ReturnType<typeof createProductStore>;

export const ProductStoreContext = createContext<ProductStoreApi | undefined>(
  undefined
);

export interface ProductStoreProviderProps {
  children: ReactNode;
}

export const ProductStoreProvider = ({
  children,
}: ProductStoreProviderProps) => {
  // eslint-disable-next-line
  // @ts-ignore
  const storeRef = useRef<ProductStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createProductStore();
  }

  return (
    <ProductStoreContext.Provider value={storeRef.current}>
      {children}
    </ProductStoreContext.Provider>
  );
};

export const useProductStore = <T,>(
  selector: (state: ProductState & ProductActions) => T
): T => {
  const productStoreContext = useContext(ProductStoreContext);

  if (!productStoreContext) {
    throw new Error(`useProductStore must be used within ProductStoreProvider`);
  }

  return useStore(productStoreContext, selector);
};
