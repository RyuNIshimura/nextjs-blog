import React from 'react';
import Head from 'next/head';
import fs from 'fs';
import matter from 'gray-matter';
import Markdown from '@/components/organisms/markdown';
import EditGitHubButton from '@/components/atoms/edit-github-button';
import { BASE_URL } from '@/lib/constants';

export default function Readme({ content, meta }: any) {
  const title = '📃 Readme';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="og_title" />
        <meta property="og:url" content={`${BASE_URL}/readme`} key="og_url" />
      </Head>
      <div className="max-w-4xl mx-auto my-10">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="overflow-hidden shadow-xl sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="my-2">
                <div className="items-center block">
                  <div className="flex flex-row-reverse flex-wrap mt-5">
                    <EditGitHubButton filepath="README.md" />
                  </div>
                </div>
                <h2 className="pb-2 my-12 text-4xl font-bold text-black border-b">
                  {meta.title}
                </h2>
                <Markdown source={content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const path = `./README.md`;
  const content = fs.readFileSync(path, 'utf-8');
  const data = matter(content);

  return {
    props: {
      content: data.content,
      meta: data.data,
    },
  };
}
