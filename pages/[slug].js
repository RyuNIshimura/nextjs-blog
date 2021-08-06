import { useState } from 'react'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import InfiniteScroll from 'react-infinite-scroller'
import gfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css' 
import dayjs from 'dayjs'
import { PaperClipIcon } from '@heroicons/react/outline'
import { ClockIcon, RefreshIcon } from '@heroicons/react/solid'
import TableOfContents from '@/components/molecules/table-of-contents'
import ArticleCard from '@/components/molecules/article-card'
import { customComponents } from '@/components/atoms/custom-components'
import Tag from '@/components/atoms/tag'
import { TwitterIcon } from '@/components/svg'
import client from '@/lib/contentful'
import generateTableOfContents from '@/lib/generate-table-of-contents'
import { tweet } from '@/lib/tweet'
import { BASE_URL, PER_PAGE, RELATED_ARTICLES_LIMIT } from '@/lib/constants'

function copy(text) {
  navigator.clipboard.writeText(text)
}

function ArticlePage({ 
  article,
  tableOfContents,
  description,
  initialArticles,
  total,
  relatedTag
}) {
  const [articles, setArticles] = useState(initialArticles)

  const getArticles = async (page) => {
    const res = await client.getEntries({
      content_type: 'article',
      'fields.tag.sys.id': relatedTag.sys.id,
      order: '-sys.updatedAt',
      limit: RELATED_ARTICLES_LIMIT,
      skip: RELATED_ARTICLES_LIMIT * (page - 1)
    })

    setArticles(articles.concat(res.items))
  }

  return (
    <>
      <Head>
        <title>{article.fields.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content={article.fields.keywords} />
        <meta
          name="description"
          hid="description"
          content={description}
        />
        <meta hid="og:type" property="og:type" content="website" />
        <meta hid="og:site_name" property="og:site_name" content="nishimura.club" />
        <meta
          hid="og:url"
          property="og:url"
          content={`https://nishimura.club/${article.fields.slug}`}
        />
        <meta hid="og:title" property="og:title" content={article.fields.title} />
        <meta
          hid="og:description"
          property="og:description"
          content={description}
        />
        <meta
          hid="og:image"
          property="og:image"
          content={`https:${article.fields.image.fields.file.url}`}
        />
        <meta
          hid="twitter:image"
          property="twitter:image"
          content={`https:${article.fields.image.fields.file.url}`}
        />
        <meta hid="twitter:card" content="summary" />
      </Head>
      <div className="lg:mx-auto mx-3 sm:mx-5 my-2 max-w-screen-xl">
        <div className="grid lg:grid-cols-4 grid-cols-1">
          <div className="article lg:col-span-3 col-span-2">
            <h1>
              {article.fields.title}
              <PaperClipIcon 
                className="title-clip cursor-pointer relative bottom-1 inline-flex h-6 w-6 ml-1 text-gray-500 hover:text-gray-300"
                onClick={() => copy(`${BASE_URL}/${article.fields.slug}`)}
              />
            </h1>
            <div className="flex flex-nowrap items-center justify-between">
              <div>
                {article.fields.tag.map((t, i) => (
                  <Tag key={`${t.fields.slug}-${i}`} tag={t} />
                ))}
              </div>
              <div className="ml-2 sm:flex-shrink-0 sm:flex sm:items-center">
                <div
                  onClick={() => tweet(article)}
                  className="cursor-pointer mr-2 inline-flex items-center px-2 py-1 text-blue-500 text-sm font-medium bg-blue-100 hover:bg-blue-200 border border-blue-100 rounded-full"
                >
                  <TwitterIcon className="h-4 w-4 mr-1"/>
                  ツイート
                </div>
              </div>
            </div>
            <div className="flex mt-5">
              <div className="flex">
                <ClockIcon className="h-5 text-gray-400 text-md" />
                <span className="ml-1 text-gray-400 text-md">{dayjs(article.fields.publishDate).format('YYYY年MM月DD日')}</span>
              </div>
              <div className="flex ml-2">
                <RefreshIcon className="h-5 text-gray-400 text-md" />
                <span className="ml-1 text-gray-400 text-md">{dayjs(article.sys.updatedAt).format('YYYY年MM月DD日')}</span>
              </div>
            </div>
            <ReactMarkdown
              className="markdown-body"
              components={customComponents}
              linkTarget="_blank"
              // eslint-disable-next-line react/no-children-prop
              children={article.fields.body}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              remarkPlugins={[gfm, remarkMath]}
            />
            <div className="mt-10">
              <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-gray-200">関連記事</h2>
              <InfiniteScroll
                className="m-0 grid grid-cols-1 gap-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-3"
                pageStart={1}
                loadMore={getArticles}
                hasMore={articles.length < total}
                loader={<div className="lg:mx-auto mx-5 my-2" key={1}>ロード中 ...</div>}
                useWindow={true}
              >
                {articles.map((article) => (
                  <ArticleCard key={article.fields.slug} article={article} />
                ))}
              </InfiniteScroll>
            </div>
          </div>
          <div className="lg:block hidden lg:col-span-1 col-span-2 h-screen sticky top-16 ml-5">
            <TableOfContents tableOfContents={tableOfContents} />
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  let articles = await client.getEntries({
    content_type: 'article',
    limit: 1
  })
  const total = articles.total
  const maxPage = Math.ceil(total / PER_PAGE)
  const maxPageArray = [...Array(maxPage).keys()].map((i) => ++i)

  const paths = []
  for (const l of maxPageArray) {
    articles = await client.getEntries({
      content_type: 'article',
      order: '-fields.publishDate',
      limit: PER_PAGE,
      skip: PER_PAGE * (l - 1)
    })
    for (const article of articles.items) {
      paths.push({ params: { slug: article.fields.slug } })
    }
  }

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const article = await client.getEntries({
    content_type: 'article',
    'fields.slug': params.slug
  })
  const { tableOfContents, description } = await generateTableOfContents(article.items[0].fields.body)

  const relatedTag = article.items[0].fields.tag[0]

  const initialArticles = await client.getEntries({
    content_type: 'article',
    'fields.tag.sys.id': relatedTag.sys.id,
    order: '-sys.updatedAt',
    limit: RELATED_ARTICLES_LIMIT
  })

  return { props: 
    { 
      article: article.items[0],
      tableOfContents,
      description,
      initialArticles: initialArticles.items,
      total: initialArticles.total,
      relatedTag
    }
  }
}

export default ArticlePage
