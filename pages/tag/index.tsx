import { GetStaticProps } from 'next';
import Head from 'next/head';
import Tag from '@/components/atoms/tag';
import Category from '@/components/atoms/category';
import client from '@/lib/contentful';
import {
  APP_NAME,
  BASE_URL,
  META_DESCRIPTION,
  CONTENT_TYPE,
} from '@/lib/constants';
import { ITags, ITypes } from '@/@types/generated/contentful';

interface Props {
  tags: ITags[];
  categories: ITypes[];
}

export default function TagList({ tags, categories }: Props) {
  return (
    <>
      <Head>
        <title>{`${APP_NAME} - タグ一覧`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={META_DESCRIPTION} />
        <meta property="og:title" content={`${APP_NAME} - タグ一覧`} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={`${BASE_URL}/ogp.png`} />
        <meta name="twitter:image" content={`${BASE_URL}/ogp.png`} />
        <meta name="twitter:card" content="summary" />
      </Head>
      <div className="mx-3 my-2 lg:mx-auto sm:mx-5 max-w-screen-2xl">
        <div className="relative py-16 overflow-hidden bg-white">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-xl mx-auto text-lg">
              <div className="max-w-screen-xl mb-8">
                <h1 className="text-2xl font-bold text-center">Tags 🧗</h1>
                <div className="my-8">
                  {tags.map((tag: ITags, i: number) => (
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
                  {categories.map((category: ITypes, i: number) => (
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tags = await client.getEntries({ content_type: CONTENT_TYPE.TAG });

  const categories = await client.getEntries({
    content_type: CONTENT_TYPE.CATEGORY,
  });

  return {
    props: {
      tags: tags.items,
      categories: categories.items,
    },
  };
};
