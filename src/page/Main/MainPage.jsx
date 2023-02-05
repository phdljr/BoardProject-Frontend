import styles from "./MainPage.module.scss";

export default function MainPage() {
  return (
    <div className={`${styles.page} center korean-font`}>
      <h1 className={styles.slide}>여기는 메인 페이지다!</h1>
    </div>
  );
}
