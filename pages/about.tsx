import Head from 'next/head';
import { GetServerSideProps } from 'next';
import WorkCard from '@/components/molecules/work-card';
import client from '@/lib/contentful';
import {
  APP_NAME,
  BASE_URL,
  META_DESCRIPTION,
  SNS_ITEMS,
} from '@/lib/constants';
import { IWork } from '@/@types/generated/contentful';

export default function About({ works }: { works: IWork[] }) {
  return (
    <>
      <Head>
        <title>{`${APP_NAME} - About`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={META_DESCRIPTION} />
        <meta property="og:title" content={`${APP_NAME} - About`} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={`${BASE_URL}/ogp.png`} />
        <meta name="twitter:image" content={`${BASE_URL}/ogp.png`} />
        <meta name="twitter:card" content="summary" />
      </Head>
      <div className="mx-3 my-2 lg:mx-auto sm:mx-5 max-w-screen-2xl">
        <div className="relative py-16 overflow-hidden bg-white dark:bg-gray-900">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-xl mx-auto text-lg">
              <div className="max-w-screen-xl mb-8">
                <h1>
                  <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 dark:text-gray-200 sm:text-4xl">
                    Profile
                  </span>
                </h1>
                <img
                  className="w-auto h-12 mx-auto my-8 sm:h-12"
                  src="/icon.png"
                  alt={APP_NAME}
                />
                <p className="max-w-screen-md mx-auto mt-8 text-xl leading-8 text-center text-gray-500 dark:text-gray-200">
                  フロントエンドの開発者です
                </p>
              </div>
              <div className="my-12">
                <h1>
                  <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 dark:text-gray-200 sm:text-4xl">
                    Works
                  </span>
                </h1>
                <div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                  {works.map((work: IWork) => (
                    <WorkCard key={work.fields.name} work={work} />
                  ))}
                </div>
              </div>
              <div className="my-12">
                <h1>
                  <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 dark:text-gray-200 sm:text-4xl">
                    Skills
                  </span>
                </h1>
                <p className="max-w-screen-md mx-auto mt-8 text-xl leading-8 text-center text-gray-500 dark:text-gray-200">
                  <strong>好きな技術: </strong> Next.js, Contentful
                  <br />
                  <strong>好きな言語: </strong> JavaScript
                </p>
              </div>
              <div className="my-8">
                <h1>
                  <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 dark:text-gray-200 sm:text-4xl">
                    Contact
                  </span>
                </h1>
                <div className="flex justify-center mt-8 space-x-6 md:order-2">
                  {SNS_ITEMS.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-200 hover:text-gray-500"
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="w-10 h-10" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const works = await client.getEntries({
    content_type: 'work',
    order: '-sys.updatedAt',
  });

  return {
    props: {
      works: works.items,
    },
  };
};
