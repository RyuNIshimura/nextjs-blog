import React from 'react';
import Head from 'next/head';
import fs from 'fs';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { BASE_URL } from '@/lib/constants';

export default function Tos({ content, meta }: any) {
  const title = '📃 Terms';
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="og_title" />
        <meta property="og:url" content={`${BASE_URL}/tos`} key="og_url" />
      </Head>
      <div className="max-w-4xl mx-auto my-10">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="overflow-hidden shadow-xl sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="my-6">
                <h2 className="text-2xl font-bold">{meta.title}</h2>
                <ReactMarkdown
                  className="markdown-body"
                  linkTarget="_blank"
                  // eslint-disable-next-line react/no-children-prop
                  children={content}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const path = `./docs/tos.md`;
  const content = fs.readFileSync(path, 'utf-8');
  const data = matter(content);

  return {
    props: {
      content: data.content,
      meta: data.data,
    },
  };
}
