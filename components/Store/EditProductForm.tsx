// store/EditProductForm.tsx

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Product } from "types";

interface EditProductFormProps {
  product: Product;
  onUpdate: (product: Product) => void;
}

type FormValues = {
  name: string;
  photo: string;
  price: number;
};

export default function EditProductForm({
  product,
  onUpdate,
}: EditProductFormProps) {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: product.name,
      photo: product.photo,
      price: product.price,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const updatedProduct = {
      ...product,
      name: data.name,
      photo: data.photo,
      price: parseFloat(data.price.toString()),
    };
    onUpdate(updatedProduct);
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
      <button type="submit">Update Product</button>
    </form>
  );
}
