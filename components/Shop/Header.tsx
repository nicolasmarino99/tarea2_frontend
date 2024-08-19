import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <img src="/logo.png" alt="Mercado Libre Logo" className={styles.logo} />
      <nav>
        <ul className={styles.navLinks}>
          <li>Categorías</li>
          <li>Ofertas</li>
          <li>Historial</li>
          <li>Supermercado</li>
          <li>Moda</li>
          <li>Vender</li>
          <li>Ayuda / PQR</li>
        </ul>
      </nav>
    </header>
  );
}
