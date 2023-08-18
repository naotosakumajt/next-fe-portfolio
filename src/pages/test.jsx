import { createClient } from "contentful";

export default function Home({ articles }) {
  console.log(articles);
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: "works" });

  return {
    props: {
      articles: res.items,
    },
  };
}
