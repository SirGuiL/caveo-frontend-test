import { cartProduct, product } from "@/domain/types/product";
import { createStore, StoreApi } from "zustand/vanilla";

export type ProductState = {
  categories: string[];
  products: product[];
  page: number;
  cart: cartProduct[];
};

export type ProductActions = {
  setCategories: (categories: string[]) => void;
  setProducts: (products: product[]) => void;
  goToNextPage: () => void;
  setPage: (page: number) => void;
  addItemToCart: (product: product) => void;
  removeItemToCart: (id: number) => void;
  deleteItemToCart: (id: number) => void;
  setCart: (cart: cartProduct[]) => void;
  clearCart: () => void;
};

export type ProductStore = StoreApi<ProductState & ProductActions>;

export const defaultInitState: ProductState = {
  categories: [],
  products: [],
  page: 1,
  cart: [],
};

export const createProductStore = (
  initState: ProductState = defaultInitState
): ProductStore => {
  return createStore<ProductState & ProductActions>((set) => ({
    ...initState,
    setCategories: (categories: string[]) =>
      set((state) => ({ ...state, categories })),
    setProducts: (products: product[]) =>
      set((state) => ({ ...state, products })),
    addProductToCart: (product: cartProduct) =>
      set((state) => ({ ...state, cart: [...state.cart, product] })),
    goToNextPage: () => set((state) => ({ ...state, page: state.page + 1 })),
    setPage: (page: number) => set((state) => ({ ...state, page })),
    addItemToCart: (product: product) =>
      set((state) => {
        const existingProductIndex = state.cart.findIndex(
          (item) => item.id === product.id
        );

        if (existingProductIndex !== -1) {
          const updatedCart = state.cart.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );

          return { ...state, cart: updatedCart };
        } else {
          return {
            ...state,
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        }
      }),
    removeItemToCart: (id: number) =>
      set((state) => {
        const existingProductIndex = state.cart.findIndex(
          (item) => item.id === id
        );

        if (
          existingProductIndex !== -1 &&
          state.cart[existingProductIndex].quantity > 1
        ) {
          const updatedCart = state.cart.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );

          return { ...state, cart: updatedCart };
        } else {
          return {
            ...state,
            cart: state.cart.filter((item) => item.id !== id),
          };
        }
      }),
    deleteItemToCart: (id: number) =>
      set((state) => ({
        ...state,
        cart: state.cart.filter((item) => item.id !== id),
      })),
    setCart: (cart: cartProduct[]) => set((state) => ({ ...state, cart })),
    clearCart: () => set((state) => ({ ...state, cart: [] })),
  }));
};
