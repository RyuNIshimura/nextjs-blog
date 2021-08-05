import { useState } from 'react'
import Head from 'next/head'
import InfiniteScroll from 'react-infinite-scroller'
import ArticleCard from '@/components/molecules/article-card.js'
import Breadcrumbs from '@/components/molecules/breadcrumbs.js'
import client from '@/lib/contentful'
import { APP_NAME, META_DESCRIPTION, PER_PAGE } from '@/lib/constants'

function IndexPage({ initialArticles, total, category, pages }) {
  const [articles, setArticles] = useState(initialArticles)

  const getArticles = async (page) => {
    const res = await client.getEntries({
      content_type: 'article',
      'fields.type.sys.id': category.sys.id,
      order: '-sys.updatedAt',
      limit: PER_PAGE,
      skip: PER_PAGE * (page - 1)
    })

    setArticles(articles.concat(res.items))
  }

  return (
    <>
      <Head>
        <title>{ `${APP_NAME} - ${category.fields.name}` }</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={ META_DESCRIPTION } />
        <meta property="og:title" content={ `${APP_NAME} - ${category.fields.name}` } />
        <meta property="og:description" content={ META_DESCRIPTION } />
        <meta property="og:image" content="https://nishimura.club/ogp.png" />
        <meta name="twitter:image" content="https://nishimura.club/ogp.png"/>
        <meta name="twitter:card" content="summary"/>
      </Head>
      <Breadcrumbs pages={pages} />
      <InfiniteScroll
        className="m-0 sm:m-8 grid grid-cols-1 gap-6 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5"
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
    </>
  )
}

export async function getServerSideProps({ params }) {
  const category = await client
    .getEntries({
      content_type: 'types',
      'fields.slug': params.slug
    })
    .then((res) => res.items[0])
    .catch(console.error)


  const articles = await client.getEntries({
    content_type: 'article',
    'fields.type.sys.id': category.sys.id,
    order: '-sys.updatedAt',
    limit: PER_PAGE
  })

  return {
    props: {
      initialArticles: articles.items,
      total: articles.total,
      category: category,
      pages: [
        { name: category.fields.name, href: `/category/${category.fields.slug}`, current: true },
      ]
    }
  }
}

export default IndexPage
