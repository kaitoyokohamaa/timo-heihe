import Head from "next/head";

interface Props {
  title: string;
  description: string;
  keyword: string;
  image: string;
  url: string;
}

export default function head({
  title,
  description,
  keyword,
  image,
  url,
}: Props) {
  return (
    <Head>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keyword} />
      {/* website,blog,articleの中から抜粋*/}
      <meta property="og:type" content={`article`} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:card" content={"summary_large_image"} />
      <meta name="twitter:site" content="@test" />
      <meta name="twitter:url" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Head>
  );
}
