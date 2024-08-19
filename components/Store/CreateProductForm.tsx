// store/CreateProductForm.tsx

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Product } from "types";

interface CreateProductFormProps {
  onCreate: (product: Omit<Product, "id">) => void;
}

type FormValues = {
  name: string;
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
      price: parseFloat(data.price.toString()),
    };
    onCreate(newProduct);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "20px" }}>
      <div>
        <label>Name:</label>
        <input type="text" {...register("name", { required: true })} />
      </div>
      <div>
        <label>Photo URL:</label>
        <input type="text" {...register("photo", { required: true })} />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          {...register("price", { required: true, valueAsNumber: true })}
        />
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
}
