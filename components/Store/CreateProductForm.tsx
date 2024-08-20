// components/store/CreateProductForm.tsx

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Product } from "types";
import styles from "./Forms.module.css"; // Import the styles

interface CreateProductFormProps {
  onCreate: (product: Omit<Product, "id">) => void;
}

type FormValues = {
  name: string;
  description: string;
  photo: string;
  price: number;
};

export default function CreateProductForm({
  onCreate,
}: CreateProductFormProps) {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newProduct = {
      name: data.name,
      photo: data.photo,
      description: data.description,
      price: parseFloat(data.price.toString()),
    };
    // onCreate(newProduct);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Name:</label>
        <input
          type="text"
          className={styles.input}
          {...register("name", { required: true })}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Photo URL:</label>
        <input
          type="text"
          className={styles.input}
          {...register("photo", { required: true })}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Price:</label>
        <input
          type="number"
          step="0.01"
          className={styles.input}
          {...register("price", { required: true, valueAsNumber: true })}
        />
      </div>
      <button type="submit" className={styles.button}>
        Create Product
      </button>
    </form>
  );
}
