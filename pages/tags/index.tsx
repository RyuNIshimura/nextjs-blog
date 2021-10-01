import { GetStaticProps } from 'next';
import Head from 'next/head';
import Tag from '@/components/atoms/tag';
import Category from '@/components/atoms/category';
import client from '@/lib/contentful';
import { BASE_URL, CONTENT_TYPE } from '@/lib/constants';

export default function TagList({ tags, categories }: any) {
  return (
    <>
      <Head>
        <title>🦸‍♂️ Tags</title>
        <meta property="og:title" content="🦸‍♂️ Tags" key="og_title" />
        <meta property="og:url" content={`${BASE_URL}/tags`} key="og_url" />
      </Head>
      <div className="max-w-4xl mx-3 my-2 lg:mx-auto sm:mx-5">
        <div className="relative py-16 overflow-hidden bg-white">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-xl mx-auto text-lg">
              <div className="max-w-screen-xl mb-8">
                <h1 className="text-2xl font-bold text-center">Tags 🧗</h1>
                <div className="my-8">
                  {tags.map((tag: any, i: number) => (
                    <span
                      className="leading-10"
                      key={`${tag.fields.slug}-${i}`}
                    >
                      <Tag tag={tag} />
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-center">
                  Categories 🤸‍♀️
                </h1>
                <div className="my-8">
                  {categories.map((category: any, i: number) => (
                    <span
                      className="leading-10"
                      key={`${category.fields.slug}-${i}`}
                    >
                      <Category category={category} />
                    </span>
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
  const tags = await client.getEntries({
    content_type: CONTENT_TYPE.TAG,
    order: 'fields.name',
  });

  const categories = await client.getEntries({
    content_type: CONTENT_TYPE.CATEGORY,
    order: 'fields.name',
  });

  return {
    props: {
      tags: tags.items,
      categories: categories.items,
    },
  };
};
