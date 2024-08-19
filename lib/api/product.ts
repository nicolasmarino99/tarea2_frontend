import axiosInstance from "../axios";
import { Product } from "types";

interface PaginatedResponse<T> {
  success: boolean;
  products: T[];
}

interface ProductResponse {
  success: boolean;
  product: Product;
}

export const getProductsApi = async (page: number = 1) => {
  const response = await axiosInstance.get<PaginatedResponse<Product[]>>(`/products`, {
    params: { page },
  });
  return response.data;
};

export const createProductApi = async (product: Product) => {
  const response = await axiosInstance.post<ProductResponse>(`/products`, { product });
  return response.data;
};

export const getProductByIdApi = async (id: string) => {
  const response = await axiosInstance.get<ProductResponse>(`/products/${id}`);
  return response.data;
};

export const updateProductApi = async (id: string, product: Partial<Product>) => {
  const response = await axiosInstance.patch<ProductResponse>(`/products/${id}`, { product });
  return response.data;
};

export const deleteProductApi = async (id: string) => {
  const response = await axiosInstance.delete<{
    success: boolean;
    message: string;
  }>(`/products/${id}`);
  return response.data;
};
