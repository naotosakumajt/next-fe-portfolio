import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Sidenavi } from "@/components/Sidebar/Sidebar";
import styles from "@/components/Layout/Layout.module.scss";

export const Layout = ({ children, showSidebar, category, tag, works }) => {
  return (
    <div className={`${styles.container}`}>
      <Header />
      <div
        className={`${styles.layout} ${
          showSidebar ? styles["two-column"] : styles["one-column"]
        }`}
      >
        <main className={styles.main}>{children}</main>
        {showSidebar && (
          <Sidenavi posts={works} category={category} tag={tag} />
        )}
      </div>
      <Footer />
    </div>
  );
};
