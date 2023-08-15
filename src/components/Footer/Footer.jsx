import React from "react";
import { PiArrowLineUp } from "react-icons/pi";
import { animateScroll as scroll } from "react-scroll";
import styles from "@/components/Footer/Footer.module.scss";

export const Footer = () => {
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.scrollButton} onClick={scrollToTop}>
        <PiArrowLineUp size={40} />
      </div>
      <div className={styles.inner}>
        <div className={styles.copyright}>&copy; NAOTO SAKUMA</div>
      </div>
    </footer>
  );
};
