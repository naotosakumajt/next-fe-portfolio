import Image from "next/image";
import Link from "next/link";
import { CustomHead } from "@/components/Head";
import { useRouter } from "next/router";
import { WorkItem } from "@/components/WorksList/WorkItem";
import { LinkButton } from "@/components/LinkButton";
import styles from "@/components/WorksList/WorksList.module.scss";
import { Layout } from "@/components/Layout/Layout";
import { getWorksData } from "@/utils/getWorksData";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function MonthlyArchive({ works, category, tag }) {
  const router = useRouter();
  const { date } = router.query;
  const formattedDate = date.replace("_", "-");
  const parsedDate = dayjs(`${formattedDate}-01`, "YYYY-MM").tz("Asia/Tokyo");

  // 指定した年月のみの投稿をフィルタリング
  const filteredWorks = works.filter((work) => {
    const workYearMonth = dayjs(work.publishedAt)
      .tz("Asia/Tokyo")
      .format("YYYY年M月");
    return workYearMonth === parsedDate.format("YYYY年M月");
  });

  return (
    <Layout showSidebar={true} category={category} tag={tag} works={works}>
      <CustomHead title="WORKS ARCHIVE" />
      <section className={`${styles.works} section`}>
        <div className="box">
          <h2 className="title">{parsedDate.format("YYYY年M月")}</h2>
          <ul className={styles.worksList}>
            {filteredWorks.map((work) => (
              <WorkItem key={work.id} work={work} />
            ))}
          </ul>
        </div>
        <LinkButton href="/works/" text="WORKS一覧へ" />
      </section>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { date } = params;
  const formattedDate = date.replace("_", "-");
  const parsedDate = dayjs(`${formattedDate}-01`, "YYYY-MM").tz("Asia/Tokyo");
  const formattedYearMonth = parsedDate.format();

  const { works, category, tag } = await getWorksData(
    1,
    "",
    "",
    formattedYearMonth
  );

  return {
    props: {
      works,
      category,
      tag,
    },
  };
}

export async function getStaticPaths() {
  const { works } = await getWorksData();

  const yearMonths = [
    ...new Set(
      works.map((work) =>
        dayjs(work.publishedAt).tz("Asia/Tokyo").format("YYYY-MM")
      )
    ),
  ];
  const paths = yearMonths.map((ym) => ({
    params: {
      date: ym.replace("-", "_"),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
