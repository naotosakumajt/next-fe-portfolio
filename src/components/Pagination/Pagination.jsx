// components/Pagination/Pagination.jsx
import Link from "next/link";
import styles from "@/components/Pagination/Pagnination.module.scss";

const Pagination = ({ currentPage, totalPages }) => {
  const pages = [...Array(totalPages).keys()].map((page) => page + 1);

  return (
    <nav className={styles.pagination}>
      <ul>
        {currentPage !== 1 && ( // currentPageが1でない場合のみ1へのリンクを表示
          <li key={1}>
            <Link href="/works" passHref legacyBehavior>
              <a className={styles.pageLink}>1</a>
            </Link>
          </li>
        )}
        {pages.map((page) => {
          if (page === 1) return null; // ページ番号が1の場合は表示しない
          return (
            <li key={page} className={currentPage === page ? styles.active : ""}>
              {currentPage === page ? (
                <span className={styles.currentPage}>{page}</span>
              ) : (
                <Link href={`/works/${page}`} passHref legacyBehavior>
                  <a className={styles.pageLink}>{page}</a>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;