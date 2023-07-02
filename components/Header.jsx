import Link from "next/link";
import styles from "@/components/Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        <Link href="/">My portal site</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link href="/profile/">Profile</Link>
          </li>
          <li>
            <Link href="/works/">works</Link>
          </li>
          <li>
            <Link href="/blog/">blog</Link>
          </li>
          <li>
            <Link href="/contact/">contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
