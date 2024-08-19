"use client";

import { useAuthContext } from "contexts/AuthContext";
import styles from "./page.module.css";
import React from "react";
import CategoriesFilter from "@/components/Shop/CategoriesFilter";
import OfferCard from "@/components/Shop/OfferCard";
import OfferTypeFilter from "@/components/Shop/OfferTypeFilter";
import Header from "@/components/Shop/Header";

export default function ShopPage() {
  const { user } = useAuthContext();
  return (
    <div className={styles.offersContainer}>
      <Header />
      <OfferTypeFilter />
      <CategoriesFilter />
      <div className={styles.offerCards}>
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
  );
}
