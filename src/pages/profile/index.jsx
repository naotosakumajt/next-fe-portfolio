import CustomHead from "@/components/Head";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import styles from "@/styles/Profile.module.scss";

const profile = () => {
  return (
    <Layout>
      <CustomHead title="PROFILE" />
      <section className="section">
        <div className="box">
          <h2 className="title">PROFILE</h2>
          <div className={styles.innerBox}>
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
                <h3>NAOTO SAKUMA</h3>
                <dl className={styles.profileDetail}>
                  <dt>職 種：</dt>
                  <dd>フロントエンジニア</dd>
                </dl>
                <dl className={styles.profileDetail}>
                  <dt>スキル：</dt>
                  <dd>
                    HTML、CSS（SASS）、JavaScript、CMS構築（WordPress）、Laravel(blade)、
                  </dd>
                </dl>
                <dl className={styles.profileDetail}>
                  <dt>作業ツール：</dt>
                  <dd>VS Code、Git、Node.js、Adobe XD、Adobe PhotoShop</dd>
                </dl>
              </div>
            </div>
            <p className={styles.txtBox}>
              大学時代にアルバイトにてWEB制作を始める。
              <br />
              大学卒業後に、WEB制作の会社に入社しコーダーとして業務を行う。
              <br />
              キャリアを積み、フリーランスなども経て、現在はフロントエンジニアとして制作に携わる。
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default profile;
