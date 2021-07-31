import RSS from 'rss'
import client from '@/lib/contentful.js'
import { BASE_URL, PER_PAGE } from '@/lib/constants.js'

async function generateFeedXml() {
  const feed = new RSS({
    title: 'タイトル',
    description: '説明',
    site_url: 'サイトのURL',
    feed_url: 'フィードページのURL',
    language: 'ja',
  })

  // 例としてpostsを含めるイメージ
  // このあたりの書き方はライブラリのドキュメントを参考にしてください
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
      order: '-sys.updatedAt',
      limit: PER_PAGE,
      skip: PER_PAGE * (l - 1)
    })
    for (const article of articles.items) {
      paths.push({ params: { slug: article.fields.slug } })
      feed.item({
        title: article.fields.title,
        description: article.fields.description,
        date: new Date(article.sys.updatedAt),
        url: `${BASE_URL}/${article.fields.slug}`,
      })
    }
  }
  
  // XML形式の文字列にする
  return feed.xml()
}

export const getServerSideProps = async ({ res }) => {
  const xml = await generateFeedXml() // フィードのXMLを生成する（後述）

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate') // 24時間キャッシュする
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)

  return {
    props: {},
  }
}

const Page = () => null
export default Page

