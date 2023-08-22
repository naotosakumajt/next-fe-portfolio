import { CustomHead } from "@/components/Head";
import { WorkItem } from "@/components/WorksList/WorkItem";
import { LinkButton } from "@/components/LinkButton";
import { useRouter } from "next/router";
import styles from "@/components/WorksList/WorksList.module.scss";
import { Layout } from "@/components/Layout/Layout";
import { getWorksData, getUniqueDates } from "@/utils/getWorksData";
import { Pagination } from "@/components/Pagination/Pagination";

export default function CategoryWorksPage({
  works,
  category,
  tag,
  totalCount,
}) {
  const router = useRouter();
  const { slug } = router.query;

  // カテゴリー名を取得する関数
  const getCategoryName = (categoryId) => {
    const targetCategory = category.find((cat) => cat.sys.id === categoryId);
    return targetCategory ? targetCategory.fields.categories : "";
  };

  const postsPerPage = 5;
  const totalPages = Math.ceil(totalCount / postsPerPage);

  return (
    <Layout showSidebar={true} category={category} tag={tag} works={works}>
      <CustomHead title="WORKS CATEGORY" />
      <section className={`${styles.works} section`}>
        <div className="box">
          <h2 className="title">{getCategoryName(slug)}</h2>
          <ul className={styles.worksList}>
            {works.map((work) => (
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
  const { slug } = params;
  const { works, category, tag, totalCount } = await getWorksData(1, slug);
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
  const { category } = await getWorksData();
  const paths = category.map((cat) => ({
    params: {
      slug: cat.sys.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
