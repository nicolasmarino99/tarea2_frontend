import { useAuthContext } from "contexts/AuthContext";
import styles from "./Header.module.css";
import Logout from "../Auth/Logout";

export default function Header() {
  const { user } = useAuthContext();
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
            <a href={`/store/${user}`}>Vender</a>
          </li>
          <Logout />
        </ul>
      </nav>
    </header>
  );
}
