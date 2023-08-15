import { CustomHead } from "@/components/Head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaChevronDown } from "react-icons/fa";
import { Layout } from "@/components/Layout/Layout";
import { Pagination } from "@/components/Pagination/Pagination";
import { getWorksData, getUniqueDates } from "@/utils/getWorksData";
import styles from "@/components/WorksList/WorksList.module.scss";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function WorksPage({
  works,
  category,
  tag,
  totalCount,
  currentPage,
  uniqueDates,
}) {
  const postsPerPage = 5;
  const totalPages = Math.ceil(totalCount / postsPerPage);
  const router = useRouter();

  return (
    <Layout showSidebar={true} category={category} tag={tag} works={works}>
      <CustomHead title="WORKS TOP" />
      <section className={`${styles.works} section`}>
        <div className="box">
          <h2 className="title">WORKS</h2>
          <div className={styles.selectWrapper}>
            <select
              name=""
              id="monthly-archive"
              onChange={(e) => {
                const selectedDate = e.target.value;
                if (selectedDate) {
                  const year = selectedDate.split("年")[0];
                  const month = selectedDate
                    .split("年")[1]
                    .replace("月", "")
                    .padStart(2, "0");
                  const formattedDate = `${year}_${month}`;
                  router.push(`/works/archive/${formattedDate}`);
                }
              }}
            >
              <option value="">年月から絞り込む</option>
              {uniqueDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <div className={styles.selectIcon}>
              <FaChevronDown />
            </div>
          </div>
          <ul className={styles.worksList}>
            {works.map((work) => (
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
                        <span className={styles.worksCategory}>
                          {work.category.name}
                        </span>
                      )}
                    </div>

                    <h3 className={styles.worksName}>{work.title}</h3>
                    <p className={styles.publishedAt}>
                      {dayjs
                        .utc(work.publishedAt)
                        .tz("Asia/Tokyo")
                        .format("YYYY" + "年" + "MM" + "月" + "DD" + "日")}
                    </p>
                    <p className={styles.worksTag}>
                      {work.tag.map((tag) => (
                        <span key={tag.id}>{tag.tag || ""}</span>
                      ))}
                    </p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </section>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const page = parseInt(params.page || 1, 10);
  const { works, category, tag, totalCount } = await getWorksData(page);
  const uniqueDates = await getUniqueDates();

  return {
    props: {
      works,
      category,
      tag,
      totalCount,
      currentPage: page,
      uniqueDates,
    },
  };
}

export async function getStaticPaths() {
  const { totalCount } = await getWorksData();

  const paths = [];
  const postsPerPage = 5; // ページ表示件数
  const totalPages = Math.ceil(totalCount / postsPerPage);

  for (let page = 1; page <= totalPages; page++) {
    paths.push({
      params: {
        page: page.toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
}
