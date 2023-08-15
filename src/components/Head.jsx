import Head from "next/head";

export const CustomHead = ({ title }) => {
  return (
    <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title} | NAOTO SAKUMA</title>
      <link rel="icon" href="/images/favicon.ico" />
    </Head>
  );
};
