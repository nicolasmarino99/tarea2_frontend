import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>MERU</h1>
      <nav>
        <ul className={styles.navLinks}>
          <li>Categorías</li>
          <li>Ofertas</li>
          <li>Historial</li>
          <li>Supermercado</li>
          <li>Moda</li>
          <li>
            <a href="/store">Vender</a>
          </li>
          <li>Ayuda / PQR</li>
        </ul>
      </nav>
    </header>
  );
}
