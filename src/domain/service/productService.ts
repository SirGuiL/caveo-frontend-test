import { api } from "@/domain/api/fakeStore";
import { product } from "@/domain/types/product";

export const fetchProducts = async (): Promise<product[]> => {
  const response = await api.get("/products");
  return response.data;
};

export const fetchProductById = async (id: number): Promise<product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const fetchProductsByCategory = async (
  category: string
): Promise<product[]> => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};
