import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Tag from '@/components/atoms/tag'
import client from '@/lib/contentful'
import { APP_NAME, META_DESCRIPTION, TAG_TYPE, CATEGORY_TYPE } from '@/lib/constants'

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
      <div className="mx-3 my-2 lg:mx-auto sm:mx-5 max-w-screen-2xl">
        <div className="relative py-16 overflow-hidden bg-white dark:bg-gray-900">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-xl mx-auto text-lg">
              <div className="max-w-screen-xl mb-8">
                <h1 className="text-2xl font-bold text-center">
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
                <h1 className="text-2xl font-bold text-center">
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

export const getServerSideProps: GetServerSideProps = async () => {
  const tags = await client
    .getEntries({ content_type: TAG_TYPE })
    .then((res: any) => res.items)
    .catch(console.error)


  const categories = await client
    .getEntries({ content_type: CATEGORY_TYPE })
    .then((res: any) => res.items)
    .catch(console.error)

  return {
    props: {
      tags,
      categories
    }
  }
}
