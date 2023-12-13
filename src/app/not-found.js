import styles from "./notFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.error}>404 Not Found</h1>
      <p className={styles.description}>This page does not exist. Plese check the URL and try again.</p>
    </div>
  );
}
