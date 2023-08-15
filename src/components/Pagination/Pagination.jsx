import Link from "next/link";
import styles from "@/components/Pagination/Pagnination.module.scss";

const Pagination = ({ currentPage, totalPages }) => {
  const pages = [...Array(totalPages).keys()].map((page) => page + 1);

  return (
    <nav className={styles.pagination}>
      <ul>
        {currentPage !== 1 && (
          <li key={`pre-${currentPage}`}>
            <Link href={`/works/${currentPage - 1}`} passHref legacyBehavior>
              <a className={styles.pageLink}>Prev</a>
            </Link>
          </li>
        )}
        {currentPage !== 1 && (
          <li key={1}>
            <Link href="/works" passHref legacyBehavior>
              <a className={styles.pageLink}>1</a>
            </Link>
          </li>
        )}
        {pages.map((page) => {
          if (page === 1) return null;
          return (
            <li
              key={page}
              className={currentPage === page ? styles.active : ""}
            >
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
        {currentPage !== totalPages && (
          <li key={`next-${currentPage}`}>
            <Link href={`/works/${currentPage + 1}`} passHref legacyBehavior>
              <a className={styles.pageLink}>Next</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
