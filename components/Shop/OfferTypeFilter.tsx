import styles from "./Filters.module.css";

export default function OfferTypeFilter() {
  return (
    <div className={styles.filterContainer}>
      <button className={styles.filterButton}>Todas las ofertas</button>
      <button className={styles.filterButton}>Oferta del día</button>
      <button className={styles.filterButton}>Halloween 25% OFF</button>
      <button className={styles.filterButton}>Tellez y Bata 40%</button>
      <button className={styles.filterButton}>Liquidación</button>
      <button className={styles.filterButton}>Ofertas del día</button>
    </div>
  );
}
