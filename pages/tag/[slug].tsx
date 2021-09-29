import { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
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
import { BreadcrumbPage } from '@/@types/index';
import { IArticle, ITags } from '@/@types/generated/contentful';

interface Props {
  initialArticles: IArticle[];
  total: number;
  tag: ITags;
  pages: BreadcrumbPage[];
}

function IndexPage({ initialArticles, total, tag, pages }: Props) {
  const [articles, setArticles] = useState(initialArticles);

  const getArticles = async (page: number) => {
    const res = await client.getEntries({
      content_type: CONTENT_TYPE.ARTICLE,
      'fields.tag.sys.id': tag.sys.id,
      order: '-sys.updatedAt',
      limit: PER_PAGE,
      skip: PER_PAGE * (page - 1),
    });

    setArticles(articles.concat(res.items));
  };

  return (
    <>
      <Head>
        <title>{`${APP_NAME} - ${tag.fields.name}`}</title>
        <meta
          property="og:title"
          content={`${APP_NAME} - ${tag.fields.name}`}
        />
      </Head>
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs pages={pages} />
        <InfiniteScroll
          className="m-0"
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
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let tags = await client.getEntries({
    content_type: CONTENT_TYPE.TAG,
    limit: 1,
  });
  const total = tags.total;
  const maxPage = Math.ceil(total / PER_PAGE);
  const maxPageArray = [...Array(maxPage).keys()].map((i) => ++i);

  const paths = [];
  for (const l of maxPageArray) {
    tags = await client.getEntries({
      content_type: CONTENT_TYPE.TAG,
      limit: PER_PAGE,
      skip: PER_PAGE * (l - 1),
    });
    for (const tag of tags.items) {
      paths.push({ params: { slug: tag.fields.slug } });
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const tag = await client
    .getEntries({
      content_type: CONTENT_TYPE.TAG,
      'fields.slug': params?.slug,
    })
    .then((res: any) => res.items[0])
    .catch(console.error);

  const articles = await client.getEntries({
    content_type: CONTENT_TYPE.ARTICLE,
    'fields.tag.sys.id': tag.sys.id,
    order: '-sys.updatedAt',
    limit: PER_PAGE,
  });

  const pages: BreadcrumbPage[] = [
    {
      name: tag.fields.type.fields.name,
      href: `/category/${tag.fields.type.fields.slug}`,
      current: false,
    },
    {
      name: tag.fields.name,
      href: `/tag/${tag.fields.slug}`,
      current: true,
    },
  ];

  return {
    props: {
      initialArticles: articles.items,
      total: articles.total,
      tag: tag,
      pages: pages,
    },
  };
};

export default IndexPage;
