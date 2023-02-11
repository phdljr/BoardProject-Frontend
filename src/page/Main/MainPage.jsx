import { ReactComponent as Clipboard } from "@public/clipboard.svg";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./MainPage.module.scss";

export default function MainPage() {
  return (
    <div className={`${styles.page} center vertical`}>
      <h1 className={`${styles.title} font-title`}>Soup Board</h1>
      <LinkContainer to="/board">
        <Clipboard className={styles.clipboard} width="400" />
      </LinkContainer>
    </div>
  );
}
