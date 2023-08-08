import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/WorksList/WorksList.module.scss";
import Layout from "@/components/Layout/Layout";
import { getWorksData, getUniqueDates } from "@/utils/getWorksData";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

import Pagination from "@/components/Pagination/Pagination";

export default function TagWorksPage({
  works,
  category,
  tag,
  totalCount,
  uniqueDates,
}) {
  const router = useRouter();
  const { slug } = router.query;

  const postsPerPage = 5;
  const totalPages = Math.ceil(totalCount / postsPerPage);

  // タグ名を取得する関数
  const getTagName = (tagId) => {
    const targetTag = tag.find((t) => t.id === tagId);
    return targetTag ? targetTag.tag : "";
  };

  return (
    <Layout showSidebar={true} category={category} tag={tag} works={works}>
      <section className={`${styles.works} section`}>
        <div className="box">
          <h2 className="title">タグ: {getTagName(slug)}</h2>
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
          <Pagination currentPage={1} totalPages={totalPages} />
        )}
      </section>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const { works, category, tag, totalCount } = await getWorksData(1, "", slug);
  const uniqueDates = await getUniqueDates();

  return {
    props: {
      works,
      category,
      tag,
      totalCount,
      currentPage: 1,
      uniqueDates,
    },
  };
}

export async function getStaticPaths() {
  const { tag } = await getWorksData();
  const paths = tag.map((t) => ({
    params: {
      slug: t.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
