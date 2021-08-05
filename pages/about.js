import Head from 'next/head'
import WorkCard from '@/components/molecules/work-card'
import client from '@/lib/contentful'
import { APP_NAME, META_DESCRIPTION, SNS_ITEMS } from '@/lib/constants'

export default function About({ works }) {
  return (
    <>
      <Head>
        <title>{ `${APP_NAME} - About` }</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={ META_DESCRIPTION } />
        <meta property="og:title" content={ `${APP_NAME} - About` } />
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
                <h1>
                  <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
                    Profile
                  </span>
                </h1>
                <img
                  className="my-8 h-12 w-auto sm:h-12 mx-auto"
                  src="/icon.png"
                  alt={ APP_NAME }
                />
                <p className="mt-8 mx-auto text-xl text-center text-gray-500 dark:text-gray-200 leading-8 max-w-screen-md">
                  フロントエンドの開発者で、JAMStackやサーバレスアーキテクチャが好きです。
                  <br/>
                  UIUXと機械学習に焦点を当てています。
                </p>
              </div>
              <div className="my-12">
                <h1>
                  <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
                    Works
                  </span>
                </h1>
                <div 
                  className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
                >
                  {works.map((work) => (
                    <WorkCard key={work.fields.slug} work={work} />
                  ))}
                </div>
              </div>
              <div className="my-12">
                <h1>
                  <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
                    Skills
                  </span>
                </h1>
                <p className="mx-auto mt-8 text-center text-xl text-gray-500 dark:text-gray-200 leading-8 max-w-screen-md">
                  <strong>好きな技術: </strong> Firebase, Next.js, Contentful, Stripe
                  <br/>
                  <strong>好きな言語: </strong> JavaScript, Python
                </p>
              </div>
              <div className="my-8">
                <h1>
                  <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
                  Contact
                  </span>
                </h1>
                <div className="mt-8 flex justify-center space-x-6 md:order-2">
                  {/* {SNS_ITEMS.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-200 hover:text-gray-500">
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-10 w-10" aria-hidden="true" />
                    </a>
                  ))} */}
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
  const works = await client.getEntries({
    content_type: 'work',
    order: '-sys.updatedAt'
  })

  return {
    props: {
      works: works.items
    }
  }
}
