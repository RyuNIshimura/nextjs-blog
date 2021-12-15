import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import EditGitHubButton from '@/components/atoms/edit-github-button';
import { BASE_URL } from '@/lib/constants';

export default function Reference({ topics }: { topics: string[] }) {
  const title = '📃 Reference';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="og_title" />
        <meta
          property="og:url"
          content={`${BASE_URL}/reference`}
          key="og_url"
        />
      </Head>
      <div className="max-w-4xl mx-auto my-10">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="overflow-hidden shadow-xl sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="my-2">
                <div className="items-center block">
                  <div className="flex flex-row-reverse flex-wrap mt-5">
                    <EditGitHubButton filepath="docs/reference" />
                  </div>
                </div>
                <h2 className="pb-2 my-12 text-4xl font-bold text-black border-b">
                  {title}
                </h2>
                {/* <h2 className="flex items-center pb-2 my-12 text-4xl font-bold text-black border-b">
                  <img
                    alt="完全に理解した"
                    src="./gif/catjam.gif"
                    className="w-8 h-8"
                  />
                  <span className="ml-1">完全に理解した</span>
                </h2> */}
                <div className="markdown-body">
                  <ul>
                    {topics.map((topic: string, i: number) => (
                      <li key={`${topic}-${i}`}>
                        <Link href={`/reference/${topic}`}>
                          <a>{topic}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const path = `./docs/reference/`;
  const directories = fs.readdirSync(path, 'utf-8');

  return {
    props: {
      topics: directories || [],
    },
  };
}
