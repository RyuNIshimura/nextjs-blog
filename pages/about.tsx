/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import { GetStaticProps } from 'next';
import WorkCard from '@/components/molecules/work-card';
import client from '@/lib/contentful';
import { APP_NAME, BASE_URL, SNS_ITEMS } from '@/lib/constants';

const favoStacks = ['Next.js', 'Nest.js'];
const favoLangs = ['JavaScript'];

export default function About({ works }: any) {
  return (
    <>
      <Head>
        <title>About 🙋‍♂️</title>
        <meta property="og:title" content="About 🙋‍♂️" key="og_title" />
        <meta property="og:url" content={`${BASE_URL}/about`} key="og_url" />
      </Head>
      <div className="max-w-4xl mx-3 my-2 lg:mx-auto sm:mx-5">
        <div className="relative py-16 overflow-hidden bg-white">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-xl mx-auto text-lg">
              <div className="max-w-screen-xl mb-8">
                <h1>
                  <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
                    Profile
                  </span>
                </h1>
                <img
                  className="w-auto h-12 mx-auto my-8 sm:h-12"
                  src="/icon.png"
                  alt={APP_NAME}
                />
                <p className="max-w-screen-md mx-auto mt-8 text-xl leading-8 text-center text-gray-500">
                  <span>I'm a front-end developer 🙋‍♂️</span>
                </p>
              </div>
              <div className="my-12">
                <h1>
                  <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
                    Works
                  </span>
                </h1>
                <div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                  {works.map((work: any) => (
                    <WorkCard key={work.fields.name} work={work} />
                  ))}
                </div>
              </div>
              <div className="my-12">
                <h1>
                  <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
                    Skills
                  </span>
                </h1>
                <p className="max-w-screen-md mx-auto mt-8 text-xl leading-8 text-center text-gray-500">
                  <strong>好きな技術: </strong>{' '}
                  {favoStacks.map((stack) => (
                    <span className="mr-1" key={stack}>
                      {`${stack},`}
                    </span>
                  ))}
                  <br />
                  <strong>好きな言語: </strong>
                  {favoLangs.map((lang) => (
                    <span className="mr-1" key={lang}>
                      {`${lang},`}
                    </span>
                  ))}
                </p>
              </div>
              <div className="my-8">
                <h1>
                  <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
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
                      className="text-gray-700 hover:text-gray-500"
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

export const getStaticProps: GetStaticProps = async () => {
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
