"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  getProductsApi,
  createProductApi,
  getProductByIdApi,
  updateProductApi,
  deleteProductApi,
  getProductByIdUsernameApi,
} from "../lib/api/product";
import { Attributes, Product } from "types";
import useAuthCookie from "contexts/hooks/useAuthCookie";

type ProductsContextType = {
  products: Product[];
  userProducts: Product[];
  getProducts: (page?: number) => Promise<void>;
  createProduct: (product: Attributes) => Promise<void>;
  getProductById: (id: string) => Promise<Product | undefined>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductByIdUsername: (username: string) => Promise<void>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const authCookie = useAuthCookie();

  const [products, setProducts] = useState<any>([]);
  const [userProducts, setUserProducts] = useState<any>([]);

  const getProducts = useCallback(async (page: number = 1) => {
    try {
      const { products } = await getProductsApi(page);
      setProducts(products.data);
    } catch (error) {
      console.error("Failed to get products", error);
    }
  }, []);

  const getProductByIdUsername = useCallback(async (username: string) => {
    try {
      const { data } = await getProductByIdUsernameApi(username);
      setUserProducts(data);
    } catch (error) {
      console.error("Failed to get products", error);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const createProduct = useCallback(
    async (product: Attributes) => {
      try {
        const { data } = await createProductApi(product, authCookie.token);
        console.log(data);
        setProducts((prevProducts: any) => [...prevProducts, data.data]);
      } catch (error) {
        console.error("Failed to create product", error);
      }
    },
    [setProducts]
  );

  const getProductById = async (id: string) => {
    try {
      const response = await getProductByIdApi(id);
      return response.product;
    } catch (error) {
      console.error("Failed to get product", error);
      return undefined;
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    try {
      const response = await updateProductApi(id, product);
      setProducts((prevProducts: any) =>
        prevProducts.map((p: any) =>
          String(p.id) === String(id) ? response.product : p
        )
      );
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteProductApi(id);
      setProducts((prevProducts: any) =>
        prevProducts.filter((product: any) => String(product.id) !== id)
      );
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        userProducts,
        getProducts,
        createProduct,
        getProductById,
        updateProduct,
        deleteProduct,
        getProductByIdUsername,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error(
      "useProductsContext must be used within a ProductsProvider"
    );
  }
  return context;
};
