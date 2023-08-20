import Image from "next/image";
import { CustomHead } from "@/components/Head";
import { client } from "libs/client";
import { getWorksData, getUniqueDates } from "@/utils/getWorksData";
import { LinkButton } from "@/components/LinkButton";
import { Layout } from "@/components/Layout/Layout";
import styles from "@/components/WorksList/WorksList.module.scss";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function worksId({ works, category, tag, specificWork }) {
  const work = specificWork.fields;
  return (
    <Layout showSidebar={true} category={category} tag={tag} works={works}>
      <CustomHead title="WORKS DETAIL" />
      <section className={`${styles.worksDetail} section`}>
        <article className={styles.article}>
          <div className={styles.inner}>
            <div className={styles.worksImg}>
              <Image
                src={`http:${work.thumbnail.fields.file.url}`}
                alt={work.title}
                width={400}
                height={300}
              />
              {work.category && (
                <span className={styles.worksCategory}>
                  {work.category.fields.categories}
                </span>
              )}
            </div>
            <div className={styles.worksInner}>
              <h3 className={styles.worksName}>{work.title}</h3>
              <p className={styles.publishedAt}>
                {dayjs
                  .utc(work.publishedAt)
                  .tz("Asia/Tokyo")
                  .format("YYYY" + "年" + "MM" + "月" + "DD" + "日")}
              </p>
              <p className={styles.worksTag}>
                {work.tag.map((tag) => (
                  <span key={tag.id}>{tag.fields.tags}</span>
                ))}
              </p>
              <div className={styles.articleText}>
                {documentToReactComponents(work.body)}
              </div>
            </div>
          </div>
        </article>
        <LinkButton href="/works/" text="WORKS一覧へ" />
      </section>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { works, category, tag } = await getWorksData(1, "", "");
  const uniqueDates = await getUniqueDates();

  const specificWork = await client.getEntries({
    content_type: "works",
    "sys.id": params.id,
  });

  return {
    props: {
      works,
      category,
      tag,
      uniqueDates,
      specificWork: specificWork.items[0],
    },
  };
}

export const getStaticPaths = async () => {
  const data = await client.getEntries({ content_type: "works" });

  const paths = data.items.map((item) => ({
    params: { id: item.sys.id },
  }));

  return { paths, fallback: false };
};
