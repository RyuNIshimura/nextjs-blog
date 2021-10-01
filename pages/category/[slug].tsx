import { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import InfiniteScroll from 'react-infinite-scroller';
import ArticleCard from '@/components/molecules/article-card';
import Breadcrumbs from '@/components/molecules/breadcrumbs';
import client from '@/lib/contentful';
import { PER_PAGE, CONTENT_TYPE, BASE_URL } from '@/lib/constants';
import { BreadcrumbPage } from '@/@types/index';

function IndexPage({ initialArticles, total, category, pages }: any) {
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
        <title>{category.fields.name}</title>
        <meta
          property="og:title"
          content={category.fields.name}
          key="og_title"
        />
        <meta
          property="og:url"
          content={`${BASE_URL}/tag/${category.fields.slug}`}
          key="og_url"
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
          {articles.map((article: any) => (
            <ArticleCard key={article.fields.slug} article={article} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let categories = await client.getEntries({
    content_type: CONTENT_TYPE.CATEGORY,
    limit: 1,
  });
  const total = categories.total;
  const maxPage = Math.ceil(total / PER_PAGE);
  const maxPageArray = [...Array(maxPage).keys()].map((i) => ++i);

  const paths = [];
  for (const l of maxPageArray) {
    categories = await client.getEntries({
      content_type: CONTENT_TYPE.CATEGORY,
      limit: PER_PAGE,
      skip: PER_PAGE * (l - 1),
    });
    for (const category of categories.items) {
      paths.push({ params: { slug: category.fields.slug } });
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
