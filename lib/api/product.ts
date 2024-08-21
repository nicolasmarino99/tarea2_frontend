import axiosInstance from "../axios";
import { Attributes, Product } from "types";

interface PaginatedResponse<T> {
  products: {data: T[]};
  meta: {
    current_page: number;
    total_pages: number;
    total_entries: number;
  };
}

interface ProductData {
  id: string;
  type: "product";
  attributes: Product;
}

interface ProductResponse {
  success: boolean;
  product: Product;
}
interface ProductResponseByName<T> {
  data: T[];
  meta: {
    current_page: number;
    total_pages: number;
    total_entries: number;
  };
}

interface ApiResponse {
  status: {
    code: number;
    message: string;
  };
  data: {
    data: Attributes;
  };
}

export const getProductsApi = async (page: number = 1) => {
  const response = await axiosInstance.get<PaginatedResponse<ProductData>>(`/products`, {
    params: { page },
  });
  return response.data;
};

export const createProductApi = async (product: Attributes, token:string) => {
  console.log(token)
  const response = await axiosInstance.post<ApiResponse>(`/products`, { product }, {
    headers: {
      Authorization: token,
    },
  });
  console.log(response.data)
  return response.data;
};

export const getProductByIdApi = async (id: string) => {
  const response = await axiosInstance.get<ProductResponse>(`/products/${id}`);
  return response.data;
};

export const getProductByIdUsernameApi = async (username: string) => {
  const response = await axiosInstance.get<ProductResponseByName<ProductData>>(`/products/by_user/${username}`);
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
