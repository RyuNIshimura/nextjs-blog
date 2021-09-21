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
import popularPaths from '@/ga.json';
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
  popularArticles: IArticle[];
}

function IndexPage({ initialArticles, total, popularArticles }: Props) {
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
      <div className="my-8 text-2xl font-bold text-center text-gray-700 underline dark:text-gray-200">
        人気記事
      </div>
      <div className="grid grid-cols-1 gap-6 m-0 sm:m-8 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5">
        {popularArticles.map((article: IArticle) => (
          <ArticleCard key={article.fields.slug} article={article} />
        ))}
      </div>
      <div className="my-8 text-2xl font-bold text-center text-gray-700 underline dark:text-gray-200">
        新着記事
      </div>
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
  // 👇 `ga.json`から人気の記事を取得する
  let popularArticles = await Promise.all(
    popularPaths.map(async (path: string) => {
      let remakePath = path.replace('/', ''); // 👈 先頭の`/`を削除する
      console.log('✅ PATH:', path.replace('/', ''));

      if (remakePath) {
        let article = await client.getEntries({
          content_type: CONTENT_TYPE.ARTICLE,
          'fields.slug': remakePath,
        });
        if (article?.total === 1) {
          return article.items[0];
        }
      }
    })
  );
  popularArticles = popularArticles.filter(Boolean); // 👈 Falseな要素を削除
  if (popularArticles.length > 10) popularArticles.length = 10; // 👈 11個目の要素から全て削除

  const articles = await client.getEntries({
    content_type: CONTENT_TYPE.ARTICLE,
    order: '-sys.updatedAt',
    limit: PER_PAGE,
  });

  return {
    props: {
      initialArticles: articles.items,
      total: articles.total,
      popularArticles: popularArticles,
    },
  };
};

export default IndexPage;
