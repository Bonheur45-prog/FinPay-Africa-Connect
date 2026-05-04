import logo from "../../assets/logo.png";
import styles from "./Header.module.css";

export default function LogoIcon() {
  return (
    <div>
      <img src={logo} width={140} height={50} alt="FinPay Africa Logo" />
    </div>
  );
}
