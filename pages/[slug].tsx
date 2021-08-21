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
import { MarkdownComponents } from '@/components/organisms/markdown-components'
import TableOfContents from '@/components/molecules/table-of-contents'
import ArticleCard from '@/components/molecules/article-card'
import Tag from '@/components/atoms/tag'
import { TwitterIcon } from '@/components/svg'
import client from '@/lib/contentful'
import generateTableOfContents from '@/lib/generate-table-of-contents'
import { tweet } from '@/lib/tweet'
import { BASE_URL, PER_PAGE, RELATED_ARTICLES_LIMIT } from '@/lib/constants'

function copy(text: string) {
  navigator.clipboard.writeText(text)
}

function ArticlePage({ 
  article,
  tableOfContents,
  description,
  initialArticles,
  total,
  relatedTag
}: any) {
  const [articles, setArticles] = useState(initialArticles)

  const getArticles = async (page: number) => {
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
      {/* TODO: hid が エラーになるので修正する */}
      <Head>
        <title>{article.fields.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content={article.fields.keywords} />
        <meta
          name="description"
          content={description}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="nishimura.club" />
        <meta
          property="og:url"
          content={`https://nishimura.club/${article.fields.slug}`}
        />
        <meta property="og:title" content={article.fields.title} />
        <meta
          property="og:description"
          content={description}
        />
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
      <div className="max-w-screen-xl mx-3 my-2 lg:mx-auto sm:mx-5">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="col-span-2 article lg:col-span-3">
            <h1>
              {article.fields.title}
              <PaperClipIcon 
                className="relative inline-flex w-6 h-6 ml-1 text-gray-500 cursor-pointer title-clip bottom-1 hover:text-gray-300"
                onClick={() => copy(`${BASE_URL}/${article.fields.slug}`)}
              />
            </h1>
            <div className="flex items-center justify-between flex-nowrap">
              <div>
                {article.fields.tag.map((tag: any, i: number) => (
                  <Tag key={`${tag.fields.slug}-${i}`} tag={tag} />
                ))}
              </div>
              <div className="ml-2 sm:flex-shrink-0 sm:flex sm:items-center">
                <div
                  onClick={() => tweet(article)}
                  className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-500 bg-blue-100 border border-blue-100 rounded-full cursor-pointer hover:bg-blue-200"
                >
                  <TwitterIcon className="w-4 h-4 mr-1"/>
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
              components={MarkdownComponents}
              linkTarget="_blank"
              // eslint-disable-next-line react/no-children-prop
              children={article.fields.body}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              remarkPlugins={[gfm, remarkMath]}
            />
            <div className="mt-10">
              <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-gray-200">関連記事</h2>
              <InfiniteScroll
                className="grid grid-cols-1 gap-4 m-0 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-3"
                pageStart={1}
                loadMore={getArticles}
                hasMore={articles.length < total}
                loader={<div className="mx-5 my-2 lg:mx-auto" key={1}>ロード中 ...</div>}
                useWindow={true}
              >
                {articles.map((article: any) => (
                  <ArticleCard key={article.fields.slug} article={article} />
                ))}
              </InfiniteScroll>
            </div>
          </div>
          <div className="sticky hidden h-screen col-span-2 ml-5 lg:block lg:col-span-1 top-16">
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

export async function getStaticProps({ params }: any) {
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
