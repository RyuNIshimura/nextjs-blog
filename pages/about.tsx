/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import { BASE_URL, SNS_ITEMS } from '@/lib/constants';

export default function About() {
  return (
    <>
      <Head>
        <title>About 🙋‍♂️</title>
        <meta property="og:title" content="About 🙋‍♂️" key="og_title" />
        <meta property="og:url" content={`${BASE_URL}/about`} key="og_url" />
      </Head>
      <div className="max-w-4xl mx-auto">
        <div className="mt-8">
          <h1>
            <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
              🙋‍♂️ Profile
            </span>
          </h1>
          <p className="mx-auto mt-8 text-xl leading-8 text-center text-gray-500">
            <span>フロントエンドの開発者です 🙋‍♂️</span>
            <br />
            <span>ほとんど毎日投稿しています ✏️</span>
            <br />
            <span>
              ブログの
              <a
                className="text-blue-400 underline"
                href="https://github.com/RyuNIshimura/nextjs-blog"
                target="_blank"
                rel="noopener noreferrer"
              >
                ソースコード
              </a>
              🍿
            </span>
          </p>
        </div>
        <div className="mt-8">
          <h1>
            <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
              📩 Contact
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
    </>
  );
}
