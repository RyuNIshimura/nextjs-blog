import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';
import EditGitHubButton from '@/components/atoms/edit-github-button';
import { BASE_URL } from '@/lib/constants';

export default function Reference({ slug, posts }: any) {
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
                    <EditGitHubButton filepath={`docs/reference/${slug}`} />
                  </div>
                </div>
                <h2 className="pb-2 my-12 text-4xl font-bold text-black border-b">
                  {title}
                </h2>
                <div className="markdown-body">
                  <ul>
                    {posts.map((post: any, i: number) => (
                      <li key={`${post.slug}-${i}`}>
                        <Link href={`/reference/${slug}/${post.slug}`}>
                          <a>{post.meta.title}</a>
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

export const getStaticPaths = async () => {
  const path = `./docs/reference/`;
  const directories = fs.readdirSync(path, 'utf-8');
  const paths = directories.map((dir) => {
    return {
      params: {
        slug: dir,
      },
    };
  });

  return { paths, fallback: false };
};

export async function getStaticProps({ params }: any) {
  const path = `./docs/reference/${params.slug}`;
  const files = fs.readdirSync(path, 'utf-8');
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const content = fs.readFileSync(`${path}/${filename}`, 'utf-8');
    const data = matter(content);

    return {
      slug,
      meta: data.data,
    };
  });

  return {
    props: {
      slug: params.slug,
      posts: posts || [],
    },
  };
}
