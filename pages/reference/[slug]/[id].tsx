import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import fs from 'fs';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import { CustomMarkdown } from '@/components/organisms/custom-markdown';
import { BASE_URL } from '@/lib/constants';
import EditGitHubButton from '@/components/atoms/edit-github-button';

function ArticlePage({ slug, id, content, meta }: any) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta property="og:title" content={meta.title} key="og_title" />
        <meta property="og:url" content={`${BASE_URL}/markdown`} key="og_url" />
      </Head>
      <div className="max-w-4xl mx-auto my-10">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="overflow-hidden shadow-xl sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="my-2">
                <div className="items-center block">
                  <div className="flex flex-row-reverse flex-wrap mt-5">
                    <EditGitHubButton
                      filepath={`docs/reference/${slug}/${id}.md`}
                    />
                  </div>
                </div>
                <h2 className="pb-2 my-12 text-4xl font-bold text-black border-b">
                  {meta.title}
                </h2>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = [];
  const path = `./docs/reference/`;
  const directories = fs.readdirSync(path, 'utf-8');
  for (let dirName of directories) {
    let files = fs.readdirSync(`${path}/${dirName}`, 'utf-8');
    for (let filename of files) {
      let slug = filename.replace('.md', '');
      paths.push({ params: { slug: dirName, id: slug } });
    }
  }
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const slug = params.slug;
  const id = params.id;
  const path = `./docs/reference/${slug}/${id}.md`;
  const content = fs.readFileSync(path, 'utf-8');
  const data = matter(content);

  return {
    props: {
      slug: slug,
      id: id,
      content: data.content,
      meta: data.data,
    },
  };
};

export default ArticlePage;
