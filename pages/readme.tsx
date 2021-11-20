import { BASE_URL } from '@/lib/constants';
import Head from 'next/head';
import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import { CustomMarkdown } from '@/components/organisms/custom-markdown';

export default function Tos({ content, meta }: any) {
  const title = '📃 README';
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="og_title" />
        <meta property="og:url" content={`${BASE_URL}/privacy`} key="og_url" />
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
                  components={CustomMarkdown}
                  // eslint-disable-next-line react/no-children-prop
                  children={content}
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[gfm]}
                />
              </div>
              <div className="mx-auto"></div>
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
