import Head from "next/head";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Sidenavi } from "@/components/Sidebar/Sidebar";
import styles from "@/components/Layout/Layout.module.scss";

export const Layout = ({ children, showSidebar, category, tag, works }) => {
  return (
    <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>NAOTO SAKUMA Portfolio SITE</title>
      <link rel="icon" href="/images/favicon.ico" />
    </Head>
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
    </>
  );
};
