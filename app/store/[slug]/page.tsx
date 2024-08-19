"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { Product } from "types";
import EditProductForm from "@/components/Store/EditProductForm";
import CreateProductForm from "@/components/Store/CreateProductForm";
import { withAuth } from "@/components/withAuth";
import useAuth from "contexts/hooks/useAuth";
import { useAuthContext } from "contexts/AuthContext";

type Params = {
  params: {
    slug: string;
  };
};

const toCapitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const Page = ({ params }: Params) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Restaurants",
      photo: "/images/restaurants.jpg",
      price: 50.0,
    },
    {
      id: 2,
      name: "Coffee Shops",
      photo: "/images/coffee-shops.jpg",
      price: 20.0,
    },
    { id: 3, name: "Shopping", photo: "/images/shopping.jpg", price: 75.0 },
    // ... other products
  ]);
  const { user } = useAuthContext();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleCreate = (newProduct: Omit<Product, "id">) => {
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
  };

  const handleUpdate = (updatedProduct: Product) => {
    setProducts(
      products.map((prod) =>
        prod.id === updatedProduct.id ? updatedProduct : prod
      )
    );
    setEditingProduct(null);
  };

  return (
    <div className={styles.container}>
      <h2>Crear nuevo producto</h2>
      <CreateProductForm onCreate={handleCreate} />

      {editingProduct && (
        <div>
          <h2>Edit Product</h2>
          <EditProductForm product={editingProduct} onUpdate={handleUpdate} />
        </div>
      )}

      <h2>Productos de {toCapitalize(params.slug)}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Photo</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                <img
                  src={product.photo}
                  alt={product.name}
                  className={styles.photo}
                />
              </td>
              <td>${product.price.toFixed(2)}</td>
              <td className={styles.actions}>
                <button
                  className={styles.edit}
                  onClick={() => setEditingProduct(product)}
                >
                  Edit
                </button>
                <button
                  className={styles.delete}
                  onClick={() =>
                    setProducts(
                      products.filter((prod) => prod.id !== product.id)
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withAuth(Page);
