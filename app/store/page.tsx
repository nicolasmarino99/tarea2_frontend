import Products from "@/components/store/Products";
import { useState } from "react";
import { Product } from "types";

export default function StorePage() {
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
  const props = {
    handleCreate,
    editingProduct,
    products,
    setEditingProduct,
    setProducts,
    handleUpdate,
  };
  return (
    <div>
      <h1>Mis products</h1>
      <Products />
    </div>
  );
}
