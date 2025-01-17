import { api } from "@/domain/api/fakeStore";

export const fetchCategories = async (): Promise<string[]> => {
  const response = await api.get("/products/categories");

  return response.data;
};
