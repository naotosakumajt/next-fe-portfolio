import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import { client } from "@/libs/client";
import Link from "next/link";

// SSGです
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blog",
  });

  return {
    props: {
      blog: data.contents,
    },
  };
};

export default function blog({ blog }) {
  return (
    <div className={styles.container}>
      {blog.map((blog) => (
        <li key={blog.id}>
          <Link href={`blog/detail/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
    </div>
  );
}
