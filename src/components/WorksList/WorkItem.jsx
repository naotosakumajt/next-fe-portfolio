import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

import styles from "@/components/WorksList/WorksList.module.scss";

export const WorkItem = ({ work }) => {
  return (
    <li className={styles.worksItem} key={work.id}>
      <Link href={`/works/detail/${work.id}`} passHref legacyBehavior>
        <a>
          <div className={styles.worksImg}>
            <Image
              src={work.thumbnail.url}
              alt={work.title}
              width={400}
              height={300}
            />
            {work.category && (
              <span className={styles.worksCategory}>{work.category.name}</span>
            )}
          </div>
          <div className={styles.worksInner}>
            <h3 className={styles.worksName}>{work.title}</h3>
            <p className={styles.publishedAt}>
              {dayjs
                .utc(work.publishedAt)
                .tz("Asia/Tokyo")
                .format("YYYY年MM月DD日")}
            </p>
            <p className={styles.worksTag}>
              {work.tag.map((tag) => (
                <span key={tag.id}>{tag.tag || ""}</span>
              ))}
            </p>
          </div>
        </a>
      </Link>
    </li>
  );
};
