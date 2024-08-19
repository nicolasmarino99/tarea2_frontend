"use client";

import Logout from "@/components/Logout";
import { useAuthContext } from "contexts/AuthContext";
import React from "react";

export default function Dashboard() {
  const { user } = useAuthContext();
  // return (
  //   <div className={styles.offersContainer}>
  //     <OfferTypeFilter />
  //     <CategoriesFilter />
  //     <div className={styles.offerCards}>
  //       <OfferCard
  //         image="/images/phone.png"
  //         title="Xiaomi Redmi Note 13"
  //         price="644.900"
  //         discount="46% OFF"
  //       />
  //       <OfferCard
  //         image="/images/ssd.png"
  //         title="Disco Sólido 1TB Crucial BX500"
  //         price="268.900"
  //         discount="20% OFF"
  //       />
  //       <OfferCard
  //         image="/images/fridge.png"
  //         title="Nevera No Frost 267 Lts Mabe"
  //         price="1.590.027"
  //         discount="32% OFF"
  //       />
  //     </div>
  //   </div>
  // );
}
