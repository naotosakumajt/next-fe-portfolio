import React, { useState } from "react";
import Link from "next/link";
import { FaTimes, FaBars } from "react-icons/fa";
import styles from "@/components/header/Header.module.scss";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      {isMenuOpen && <div className={styles.mask} onClick={toggleMenu}></div>}
      <div className={`${styles.container} ${isMenuOpen ? "menuOpen" : ""}`}>
        <h1 className={styles.headerLogo}>
          <Link href="/" legacyBehavior>
            <a>NAOTO SAKUMA</a>
          </Link>
        </h1>

        <div className={styles.menuIcon} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`${styles.gnav} ${isMenuOpen ? styles.isOpen : ""}`}>
          <ul className={styles.gnavList}>
            <li className={styles.gnavItem}>
              <Link href="/works/" legacyBehavior>
                <a>WORKS</a>
              </Link>
            </li>
            <li className={styles.gnavItem}>
              <Link href="/profile/" legacyBehavior>
                <a>PROFILE</a>
              </Link>
            </li>
            <li className={styles.gnavItem}>
              <Link href="/contact/" legacyBehavior>
                <a>CONTACT</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
