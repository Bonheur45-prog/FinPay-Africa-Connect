import logo from "../../assets/logo.png";
import styles from "./Header.module.css";

export default function LogoIcon() {
  return (
    <div className={styles["logo__mark"]}>
      <div className={styles["logo__shine"]} />
      <img src={logo} width={38} height={38} alt="FinPay Africa Logo" />
    </div>
  );
}
