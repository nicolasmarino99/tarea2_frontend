"use client";

import { useAuthContext } from "contexts/AuthContext";
import styles from "./page.module.css";
import React, { useEffect } from "react";
import CategoriesFilter from "@/components/Shop/CategoriesFilter";
import OfferCard from "@/components/Shop/OfferCard";
import OfferTypeFilter from "@/components/Shop/OfferTypeFilter";
import Header from "@/components/Shop/Header";
import SearchBar from "@/components/Shop/SearchBar";
import { withAuth } from "@/components/withAuth";
import { useProductsContext } from "contexts/ProductContext";

const ShopPage = () => {
  const { products } = useProductsContext();

  return (
    <div className={styles.offersContainer}>
      <Header />
      <SearchBar />
      <OfferTypeFilter />
      <div className={styles.productsContainer}>
        <CategoriesFilter />
        <div className={styles.offerCards}>
          {products.map(({ attributes }) => (
            <OfferCard
              image={attributes.photo}
              title={attributes.name}
              price={String(attributes.price)}
              discount="46% OFF"
            />
          ))}
          <OfferCard
            image="/images/phone.png"
            title="Xiaomi Redmi Note 13"
            price="644.900"
            discount="46% OFF"
          />
          <OfferCard
            image="/images/ssd.png"
            title="Disco Sólido 1TB Crucial BX500"
            price="268.900"
            discount="20% OFF"
          />
          <OfferCard
            image="/images/fridge.png"
            title="Nevera No Frost 267 Lts Mabe"
            price="1.590.027"
            discount="32% OFF"
          />
        </div>
      </div>
    </div>
  );
};

export default withAuth(ShopPage);
