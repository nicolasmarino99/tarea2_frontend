import styles from "./Filters.module.css";

export default function CategoriesFilter() {
  return (
    <div className={styles.categoriesContainer}>
      <h3>Categorías</h3>
      <ul>
        <li>Accesorios para Vehículos</li>
        <li>Alimentos y Bebidas</li>
        <li>Animales y Mascotas</li>
        <li>Antigüedades y Colecciones</li>
        <li>Arte, Papelería y Mercería</li>
      </ul>
    </div>
  );
}
