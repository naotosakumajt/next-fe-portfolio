import CustomHead from "@/components/Head";
import Image from "next/image";
import Link from "next/link";
import { getWorksData } from "@/utils/getWorksData";
import Layout from "@/components/Layout/Layout";
import styles from "@/styles/Home.module.scss";
import worksList from "@/components/WorksList/WorksList.module.scss";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function home({ latestWorks }) {
  return (
    <Layout showSidebar={false}>
      <CustomHead title="TOP" />
      {/* MV */}
      <div className={styles.mv}>
        <div className={styles.mvbox}>
          <p className={styles.mvTitle}>NAOTO SAKUMA</p>
          <p className={styles.mvSubtitle}>Portfolio</p>
          <p className={styles.mvText}>
            ユーザーとお客様が心から
            <br className="util-sp-indention" />
            満足できるサイトを構築します。
            <br />
            クリエイティブなビジョンを実現する
            <br className="util-sp-indention" />
            フロントエンジニア。
          </p>
        </div>
      </div>
      {/* /MV */}

      {/* works */}
      <section className="section">
        <div className="box">
          <h2 className="title">WORKS</h2>
          {/* 最新3件を表示 */}
          <ul className={worksList.worksList}>
            {latestWorks.map((work) => (
              <li className={worksList.worksItem} key={work.id}>
                <Link href={`/works/detail/${work.id}`} passHref legacyBehavior>
                  <a>
                    <div className={worksList.worksImg}>
                      <Image
                        src={work.thumbnail.url}
                        alt={work.title}
                        width={400}
                        height={300}
                      />
                      {work.category && (
                        <span className={worksList.worksCategory}>
                          {work.category.name}
                        </span>
                      )}
                    </div>

                    <h3 className={worksList.worksName}>{work.title}</h3>
                    <p className={worksList.publishedAt}>
                      {dayjs
                        .utc(work.publishedAt)
                        .tz("Asia/Tokyo")
                        .format("YYYY" + "年" + "MM" + "月" + "DD" + "日")}
                    </p>
                    <p className={worksList.worksTag}>
                      {work.tag.map((tag) => (
                        <span key={tag.id}>{tag.tag || ""}</span>
                      ))}
                    </p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles["btn-more"]}>
            <Link href="/works/">WORKS一覧へ</Link>
          </div>
        </div>
      </section>
      {/* /works */}

      {/* profile */}
      <section className="section">
        <div className="box">
          <h2 className="title">PROFILE</h2>
          <div className={styles.profile}>
            <p className={styles.profileImg}>
              <Image
                src="/images/profile.png"
                alt=""
                width={400}
                height={400}
              />
            </p>
            <div className={styles.profileBody}>
              <p>
                テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入ります。
              </p>
            </div>
          </div>
          <div className={styles["btn-more"]}>
            <Link href="/profile/">PROFILE詳細へ</Link>
          </div>
        </div>
      </section>
      {/* /profile */}

      {/* contact */}
      <section className={`${styles.contact} section`}>
        <div className="box">
          <h2 className="title">CONTACT</h2>
          <p className={styles.lead}>
            お問い合わせは、
            <br className="util-sp-indention" />
            下記フォームからお願いいたします。
          </p>
          <div className={styles["btn-more"]}>
            <Link href="/contact/">お問い合わせはこちら</Link>
          </div>
        </div>
      </section>
      {/* /contact */}
    </Layout>
  );
}

export async function getStaticProps() {
  const { works } = await getWorksData(1, "", "", 3);
  return {
    props: {
      latestWorks: works,
    },
  };
}
