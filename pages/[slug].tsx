import { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import InfiniteScroll from 'react-infinite-scroller';
import gfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import dayjs from 'dayjs';
import { PaperClipIcon } from '@heroicons/react/outline';
import { ClockIcon, RefreshIcon } from '@heroicons/react/solid';
import { MarkdownComponents } from '@/components/organisms/markdown-components';
import TableOfContents from '@/components/molecules/table-of-contents';
import ArticleCard from '@/components/molecules/article-card';
import Tag from '@/components/atoms/tag';
import { TwitterIcon } from '@/components/svg';
import client from '@/lib/contentful';
import { generateTableOfContents } from '@/lib/markdown-utils';
import { tweet, copyText } from '@/lib/share-utils';
import {
  APP_NAME,
  BASE_URL,
  PER_PAGE,
  RELATED_ARTICLES_LIMIT,
  CONTENT_TYPE,
} from '@/lib/constants';
import { IArticle, ITags } from '@/@types/generated/contentful';
import { ITableOfContent } from '@/@types/index';
import AdSense from '@/components/molecules/adsense';

interface Props {
  article: IArticle;
  tableOfContents: ITableOfContent[];
  description: string;
  initialArticles: IArticle[];
  total: number;
  relatedTag: ITags;
}

function ArticlePage({
  article,
  description,
  initialArticles,
  total,
  relatedTag,
}: Props) {
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
      {/* TODO: hid が エラーになるので修正する */}
      <Head>
        <title>{article.fields.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content={article.fields.keyword} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={APP_NAME} />
        <meta
          property="og:url"
          content={`${BASE_URL}/${article.fields.slug}`}
        />
        <meta property="og:title" content={article.fields.title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`https:${article.fields.image.fields.file.url}`}
        />
        <meta
          property="twitter:image"
          content={`https:${article.fields.image.fields.file.url}`}
        />
        <meta content="summary" />
      </Head>
      <div className="max-w-3xl mx-3 my-2 lg:mx-auto sm:mx-5">
        <div className="">
          <div className="mt-10">
            <h1 className="text-center">
              <span className="px-3 py-4 text-2xl text-white bg-gray-900 sm:text-4xl article-title text-bold">
                {article.fields.title}
              </span>
            </h1>
            <div className="flex justify-center my-6 text-center">
              <div>
                <span className="mx-2 text-sm text-gray-600 text-bold sm:text-base">
                  {`updated ${dayjs(article.sys.createdAt).format(
                    'MMM D, YYYY'
                  )}`}
                </span>
                <span className="mx-2 text-sm text-gray-600 text-bold sm:text-base">
                  {`created ${dayjs(article.sys.updatedAt).format(
                    'MMM D, YYYY'
                  )}`}
                </span>
              </div>
            </div>
            <ReactMarkdown
              className="markdown-body"
              components={MarkdownComponents}
              linkTarget="_blank"
              // eslint-disable-next-line react/no-children-prop
              children={article.fields.body}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              remarkPlugins={[gfm, remarkMath]}
            />
            <div className="mt-10">
              <div className="my-8 text-2xl font-bold text-center text-gray-700 underline">
                Related Posts ✅
              </div>
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
          </div>
          {/* <div className="sticky hidden h-screen col-span-2 ml-5 lg:block lg:col-span-1 top-16">
            <AdSense
              styles={{ display: 'block', textAlign: 'center', height: 250 }}
              format=""
              responsive="true"
              client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || ''}
              slot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SQUARE_SLOT || ''}
            />
            <TableOfContents tableOfContents={tableOfContents} />
          </div> */}
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const article = await client.getEntries({
    content_type: CONTENT_TYPE.ARTICLE,
    'fields.slug': params.slug,
  });
  const { tableOfContents, description } = await generateTableOfContents(
    article.items[0].fields.body
  );

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
