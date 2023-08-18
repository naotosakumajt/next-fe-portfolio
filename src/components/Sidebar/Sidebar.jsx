import Link from "next/link";
import styles from "@/components/Sidebar/Sidebar.module.scss";

export const Sidenavi = ({ category, tag }) => {
  return (
    <aside className={styles.aside}>
      {/* カテゴリーリスト */}
      <div className={styles.sideBox}>
        <h2 className={styles.pageTitle}>カテゴリー</h2>
        <ul className={styles.listCate}>
          {category.map((category) => (
            <li key={category.sys.id}>
              <Link href={`/works/category/${category.sys.id}`} legacyBehavior>
                <a>{category.fields.categories}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* タグリスト */}
      <div className={styles.sideBox}>
        <h2 className={styles.pageTitle}>タグ</h2>
        <ul className={styles.listTag}>
          {tag.map((tag) => (
            <li key={tag.sys.id}>
              <Link href={`/works/tag/${tag.sys.id}`} legacyBehavior>
                <a>{tag.fields.tags}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
