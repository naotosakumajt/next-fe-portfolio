// components/Sidebar/Sidebar.jsx（サイドバーコンポーネント用）
import Link from "next/link";
import styles from "@/components/Sidebar/Sidebar.module.scss";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

// 日付を'YYYY_MM'形式に変換
function formatDateToYYYY_MM(date) {
  if (!date) {
    return "";
  }

  console.log("元の日付:", date);

  const regex = /^(\d{4})年(\d{1,2})月$/;
  const match = date.match(regex);
  if (!match) {
    console.error("無効な日付形式です。'YYYY年M月' 形式を期待します。");
    return "";
  }

  const [, year, month] = match;

  const parsedDate = dayjs
    .utc(`${year}-${month}-01`, "YYYY-M-D")
    .tz("Asia/Tokyo");

  console.log("解析された日付:", parsedDate.format());

  return parsedDate.isValid() ? parsedDate.format("YYYY_MM") : "";
}

export const Sidenavi = ({ posts, category, tag, uniqueDates }) => {
  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    return null;
  }

  const postsByMonth = posts.reduce((acc, post) => {
    const date = dayjs
      .utc(post.publishedAt)
      .tz("Asia/Tokyo")
      .format("YYYY年M月");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(post);
    return acc;
  }, {});

  return (
    <aside className={styles.aside}>
      {/* 年月アーカイブ */}
      <div className={styles.sideBox}>
        <h2 className={styles.pageTitle}>年月アーカイブ</h2>
        <ul className={styles.listCate}>
          {Object.keys(postsByMonth).map((date) => (
            <li key={date}>
              <Link
                href={`/works/date/${encodeURIComponent(
                  formatDateToYYYY_MM(date)
                )}`}
                passHref
                legacyBehavior
              >
                <a>{`${date} (${postsByMonth[date].length})`}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* カテゴリー */}
      <div className={styles.sideBox}>
        <h2 className={styles.pageTitle}>カテゴリー</h2>
        <ul className={styles.listCate}>
          {category.map((category) => (
            <li key={category.id}>
              <Link href={`/works/category/${category.id}`} legacyBehavior>
                <a>{category.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* タグ */}
      <div className={styles.sideBox}>
        <h2 className={styles.pageTitle}>タグ</h2>
        <ul className={styles.listTag}>
          {tag.map((tag) => (
            <li key={tag.id}>
              <Link href={`/works/tag/${tag.id}`} legacyBehavior>
                <a>{tag.tag}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidenavi;
