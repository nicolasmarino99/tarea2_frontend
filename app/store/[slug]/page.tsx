"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { Product } from "types";
import EditProductForm from "@/components/Store/EditProductForm";
import CreateProductForm from "@/components/Store/CreateProductForm";
import { withAuth } from "@/components/withAuth";
import { useProductsContext } from "../../../contexts/ProductContext";

type Params = {
  params: {
    slug: string;
  };
};

const toCapitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const Page = ({ params }: Params) => {
  const {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByIdUsername,
  } = useProductsContext();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProductByIdUsername(params.slug);
  }, [getProductByIdUsername]);

  const handleCreate = async (newProduct: Omit<Product, "id">) => {
    await createProduct(newProduct);
  };

  const handleUpdate = async (updatedProduct: Product) => {
    await updateProduct(updatedProduct.id, updatedProduct);
    setEditingProduct(null);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
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
              <td>{product.attributes.name}</td>
              <td>
                <img
                  src={product.attributes.photo}
                  alt={product.attributes.name}
                  className={styles.photo}
                />
              </td>
              <td>${product.attributes.price}</td>
              <td className={styles.actions}>
                <button
                  className={styles.edit}
                  onClick={() => setEditingProduct(product)}
                >
                  Edit
                </button>
                <button
                  className={styles.delete}
                  onClick={() => handleDelete(product.id)}
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
