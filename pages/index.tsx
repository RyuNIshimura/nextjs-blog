import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import client from '@/lib/contentful';
import {
  APP_NAME,
  BASE_URL,
  META_DESCRIPTION,
  PER_PAGE,
  CONTENT_TYPE,
} from '@/lib/constants';
import { IArticle } from '@/@types/generated/contentful';
const ArticleCard = dynamic(
  () => import('@/components/molecules/article-card'),
  // eslint-disable-next-line react/display-name
  { loading: () => <p>loading...</p> }
);
const InfiniteScroll = dynamic(
  () => import('react-infinite-scroller'),
  // eslint-disable-next-line react/display-name
  { loading: () => <p>loading...</p> }
);

interface Props {
  initialArticles: IArticle[];
  total: number;
}

function IndexPage({ initialArticles, total }: Props) {
  const [articles, setArticles] = useState(initialArticles);

  const getArticles = async (page: number) => {
    const res = await client.getEntries({
      content_type: CONTENT_TYPE.ARTICLE,
      order: '-sys.updatedAt',
      limit: PER_PAGE,
      skip: PER_PAGE * (page - 1),
    });

    setArticles(articles.concat(res.items));
  };

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={META_DESCRIPTION} />
        <meta property="og:title" content={APP_NAME} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={`${BASE_URL}/ogp.png`} />
        <meta name="twitter:image" content={`${BASE_URL}/ogp.png`} />
        <meta name="twitter:card" content="summary" />
      </Head>
      <InfiniteScroll
        className="grid grid-cols-1 gap-6 m-0 sm:m-8 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5"
        pageStart={1}
        loadMore={getArticles}
        hasMore={articles.length < total}
        loader={
          <div className="mx-5 my-2 lg:mx-auto" key={1}>
            ロード中 ...
          </div>
        }
        useWindow={true}
      >
        {articles.map((article: IArticle) => (
          <ArticleCard key={article.fields.slug} article={article} />
        ))}
      </InfiniteScroll>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const articles = await client.getEntries({
    content_type: CONTENT_TYPE.ARTICLE,
    order: '-sys.updatedAt',
    limit: PER_PAGE,
  });

  return {
    props: {
      initialArticles: articles.items,
      total: articles.total,
    },
  };
};

export default IndexPage;
