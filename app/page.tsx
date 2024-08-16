// app/page.tsx or pages/index.tsx (depending on your Next.js version)
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import styles from "./page.module.css"; // Import CSS module for styling

export const metadata = {
  title: "Welcome",
};

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <Signup />
        <Login />
      </div>
    </div>
  );
}
