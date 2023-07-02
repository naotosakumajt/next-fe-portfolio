import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Home.module.scss";

import Header from "@/components/Header";

import { client } from "@/libs/client";
import { Pagination } from "@/components/Pagination";

// SSG
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blog",
    queries: { offset: 0, limit: 5 },
  });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};

export default function blog({ blog, totalCount }) {
  return (
    <div className={styles.container}>
      <Header />
      {blog.map((blog) => (
        <li key={blog.id}>
          <Link href={`blog/detail/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
      <Pagination totalCount={totalCount} />
    </div>
  );
}
