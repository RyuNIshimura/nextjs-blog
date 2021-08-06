import Head from 'next/head'
import Tag from '@/components/atoms/tag'
import client from '@/lib/contentful'
import { APP_NAME, META_DESCRIPTION } from '@/lib/constants'

export default function TagList({ tags, categories }: any) {
  return (
    <>
      <Head>
        <title>{ `${APP_NAME} - タグ一覧` }</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={ META_DESCRIPTION } />
        <meta property="og:title" content={ `${APP_NAME} - タグ一覧` } />
        <meta property="og:description" content={ META_DESCRIPTION } />
        <meta property="og:image" content="https://nishimura.club/ogp.png" />
        <meta name="twitter:image" content="https://nishimura.club/ogp.png"/>
        <meta name="twitter:card" content="summary"/>
      </Head>
      <div className="lg:mx-auto mx-3 sm:mx-5 my-2 max-w-screen-2xl">
        <div className="relative py-16 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-screen-xl mx-auto">
              <div className="mb-8 max-w-screen-xl">
                <h1 className="font-bold text-2xl text-center">
                  タグ一覧
                </h1>
                <div className="my-8">
                  {tags.map((tag: any, i: number) => (
                    <span className="leading-10" key={`${tag.fields.slug}-${i}`}>
                      <Tag tag={tag} />
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h1 className="font-bold text-2xl text-center">
                  カテゴリ一覧
                </h1>
                <div className="my-8">
                  {categories.map((category: any, i: number) => (
                    <span className="leading-10" key={`${category.fields.slug}-${i}`}>
                      <Tag tag={category} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const tags = await client
    .getEntries({
      content_type: 'tags'
    })
    .then((res: any) => res.items)
    .catch(console.error)


  const categories = await client
    .getEntries({
      content_type: 'types'
    })
    .then((res: any) => res.items)
    .catch(console.error)

  return {
    props: {
      tags,
      categories
    }
  }
}
