import { APP_NAME } from '@/lib/constants';
import Head from 'next/head';
import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export default function Tos({ content, meta }: any) {
  return (
    <>
      <Head>
        <title>{`${APP_NAME} - プライバシーポリシー`}</title>
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
              <div className="mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const path = `./docs/privacy.md`;
  const content = fs.readFileSync(path, 'utf-8');
  const data = matter(content);

  return {
    props: {
      content: data.content,
      meta: data.data,
    },
  };
}
