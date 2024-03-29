import { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import InfiniteScroll from 'react-infinite-scroller';
import Markdown from '@/components/organisms/markdown';
import ArticleCard from '@/components/molecules/article-card';
import AdSense from '@/components/molecules/adsense';
import client from '@/lib/contentful';
import { getMetaDescription } from '@/lib/markdown';
import {
  BASE_URL,
  PER_PAGE,
  RELATED_ARTICLES_LIMIT,
  CONTENT_TYPE,
} from '@/lib/constants';
import { isOneYearPassed, dateFormat } from '@/lib/date';
import ArticleAlert from '@/components/molecules/article-alert';

function ArticlePage({
  article,
  description,
  initialArticles,
  total,
  relatedTag,
}: any) {
  const [articles, setArticles] = useState(initialArticles);

  const getArticles = async (page: number) => {
    const res = await client.getEntries({
      content_type: CONTENT_TYPE.ARTICLE,
      'fields.tag.sys.id': relatedTag.sys.id,
      order: '-sys.updatedAt',
      limit: RELATED_ARTICLES_LIMIT,
      skip: RELATED_ARTICLES_LIMIT * (page - 1),
    });

    setArticles(articles.concat(res.items));
  };

  return (
    <>
      <Head>
        <title>{article.fields.title}</title>
        <meta name="description" content={description} key="description" />
        <meta
          property="og:url"
          content={`${BASE_URL}/${article.fields.slug}`}
          key="og_url"
        />
        <meta
          property="og:title"
          content={article.fields.title}
          key="og_title"
        />
        <meta
          property="og:description"
          content={description}
          key="og_description"
        />
      </Head>
      <div className="max-w-3xl mx-3 mt-10 lg:mx-auto">
        {isOneYearPassed(article.sys.updatedAt) && (
          <div className="my-6">
            <ArticleAlert />
          </div>
        )}
        <h1 className="text-center">
          <span className="px-3 py-4 text-2xl font-bold text-white bg-gray-900 sm:text-4xl article-title">
            {article.fields.title}
          </span>
        </h1>
        <div className="flex justify-center my-6">
          <div>
            <span className="mx-2 text-sm text-gray-600 text-bold sm:text-base">
              {`created ${dateFormat(article.sys.createdAt)}`}
            </span>
            <span className="mx-2 text-sm text-gray-600 text-bold sm:text-base">
              {`updated ${dateFormat(article.sys.updatedAt)}`}
            </span>
          </div>
        </div>
        <Markdown source={article.fields.body} />
        <div className="mt-10">
          <AdSense
            styles={{ display: 'block', textAlign: 'center', height: 250 }}
            format=""
            responsive="true"
            client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || ''}
            slot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SQUARE_SLOT || ''}
          />
          <div className="my-10 text-2xl font-bold text-center text-black underline">
            Related Posts ✅
          </div>
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
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let articles = await client.getEntries({
    content_type: CONTENT_TYPE.ARTICLE,
    limit: 1,
  });
  const total = articles.total;
  const maxPage = Math.ceil(total / PER_PAGE);
  const maxPageArray = [...Array(maxPage).keys()].map((i) => ++i);

  const paths = [];
  for (const l of maxPageArray) {
    articles = await client.getEntries({
      content_type: CONTENT_TYPE.ARTICLE,
      order: '-fields.publishDate',
      limit: PER_PAGE,
      skip: PER_PAGE * (l - 1),
    });
    for (const article of articles.items) {
      paths.push({ params: { slug: article.fields.slug } });
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const article = await client.getEntries({
    content_type: CONTENT_TYPE.ARTICLE,
    'fields.slug': params.slug,
  });

  const description = await getMetaDescription({
    text: article.items[0].fields.body,
  });
  const relatedTag = article.items[0].fields.tag[0];

  const initialArticles = await client.getEntries({
    content_type: CONTENT_TYPE.ARTICLE,
    'fields.tag.sys.id': relatedTag.sys.id,
    order: '-sys.updatedAt',
    limit: RELATED_ARTICLES_LIMIT,
  });

  return {
    props: {
      article: article.items[0],
      description,
      initialArticles: initialArticles.items,
      total: initialArticles.total,
      relatedTag,
    },
  };
};

export default ArticlePage;
