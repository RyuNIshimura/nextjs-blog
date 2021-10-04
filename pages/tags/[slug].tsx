import { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import InfiniteScroll from 'react-infinite-scroller';
import ArticleCard from '@/components/molecules/article-card';
import Breadcrumbs from '@/components/molecules/breadcrumbs';
import client from '@/lib/contentful';
import { PER_PAGE, CONTENT_TYPE, BASE_URL } from '@/lib/constants';
import { BreadcrumbPage } from '@/@types/index';

function IndexPage({ initialArticles, total, tag, pages }: any) {
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
        <title>{tag.fields.name}</title>
        <meta property="og:title" content={tag.fields.name} key="og_title" />
        <meta
          property="og:url"
          content={`${BASE_URL}/tags/${tag.fields.slug}`}
          key="og_url"
        />
      </Head>
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs pages={pages} />
        <InfiniteScroll
          pageStart={1}
          loadMore={getArticles}
          hasMore={articles.length < total}
          loader={<div key={1}>Loading ...</div>}
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
      href: `/categories/${tag.fields.type.fields.slug}`,
      current: false,
    },
    {
      name: tag.fields.name,
      href: `/tags/${tag.fields.slug}`,
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
