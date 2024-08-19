import styles from "./OfferCard.module.css";

export default function OfferCard({
  image,
  title,
  price,
  discount,
}: {
  image: string;
  title: string;
  price: string;
  discount: string;
}) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h4>{title}</h4>
        <p className={styles.price}>${price}</p>
        <p className={styles.discount}>{discount}</p>
      </div>
    </div>
  );
}
