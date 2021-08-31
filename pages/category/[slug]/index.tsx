import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import InfiniteScroll from 'react-infinite-scroller';
import ArticleCard from '@/components/molecules/article-card';
import Breadcrumbs from '@/components/molecules/breadcrumbs';
import client from '@/lib/contentful';
import {
  APP_NAME,
  BASE_URL,
  META_DESCRIPTION,
  PER_PAGE,
  CONTENT_TYPE,
} from '@/lib/constants';
import { BreadcrumbPage } from '@/lib/types';
import { IArticle, ITypes } from '@/@types/generated/contentful';

interface Props {
  initialArticles: IArticle[];
  total: number;
  category: ITypes;
  pages: BreadcrumbPage[];
}

function IndexPage({ initialArticles, total, category, pages }: Props) {
  const [articles, setArticles] = useState(initialArticles);

  const getArticles = async (page: number) => {
    const res = await client.getEntries({
      content_type: CONTENT_TYPE.ARTICLE,
      'fields.type.sys.id': category.sys.id,
      order: '-sys.updatedAt',
      limit: PER_PAGE,
      skip: PER_PAGE * (page - 1),
    });

    setArticles(articles.concat(res.items));
  };

  return (
    <>
      <Head>
        <title>{`${APP_NAME} - ${category.fields.name}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={META_DESCRIPTION} />
        <meta
          property="og:title"
          content={`${APP_NAME} - ${category.fields.name}`}
        />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={`${BASE_URL}/ogp.png`} />
        <meta name="twitter:image" content={`${BASE_URL}/ogp.png`} />
        <meta name="twitter:card" content="summary" />
      </Head>
      <Breadcrumbs pages={pages} />
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

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const category = await client
    .getEntries({
      content_type: CONTENT_TYPE.CATEGORY,
      'fields.slug': params?.slug,
    })
    .then((res: any) => res.items[0])
    .catch(console.error);

  const articles = await client.getEntries({
    content_type: CONTENT_TYPE.ARTICLE,
    'fields.type.sys.id': category.sys.id,
    order: '-sys.updatedAt',
    limit: PER_PAGE,
  });

  const pages: BreadcrumbPage[] = [
    {
      name: category.fields.name,
      href: `/category/${category.fields.slug}`,
      current: true,
    },
  ];

  return {
    props: {
      initialArticles: articles.items,
      total: articles.total,
      category: category,
      pages: pages,
    },
  };
};

export default IndexPage;
