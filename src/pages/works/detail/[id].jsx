import CustomHead from "@/components/Head";
import { client } from "libs/client";
import { getWorksData, getUniqueDates } from "@/utils/getWorksData";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import styles from "@/components/WorksList/WorksList.module.scss";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function worksId({ works, category, tag, specificWork }) {
  const work = specificWork;
  return (
    <Layout showSidebar={true} category={category} tag={tag} works={works}>
      <CustomHead title="WORKS DETAIL" />
      <section className={`${styles.worksDetail} section`}>
        <article className={styles.article}>
          <div className={styles.inner}>
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
            <div
              className={styles.articleText}
              dangerouslySetInnerHTML={{
                __html: `${work.body}`,
              }}
            />
          </div>
        </article>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { works, category, tag } = await getWorksData(1, "", "");
  const uniqueDates = await getUniqueDates();

  const specificWork = await client.get({
    endpoint: "works",
    contentId: params.id,
  });

  return {
    props: {
      works,
      category,
      tag,
      uniqueDates,
      specificWork,
    },
  };
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "works" });

  const paths = data.contents.map((content) => ({
    params: { id: content.id.toString() },
  }));

  return { paths, fallback: false };
};
