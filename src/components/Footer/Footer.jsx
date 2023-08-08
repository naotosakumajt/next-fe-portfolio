import Link from "next/link";
import styles from "@/components/Footer/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>&copy;NAOTO SAKUMA</div>
    </footer>
  );
};

export default Footer;
