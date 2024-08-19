import styles from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Buscar productos, marcas y más..."
        className={styles.searchInput}
      />
      <button className={styles.searchButton}>Buscar</button>
    </div>
  );
}
