import { useState } from 'react';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import client from '@/lib/contentful';
import { PER_PAGE, CONTENT_TYPE } from '@/lib/constants';
import popularPaths from '@/ga.json';
import AdSense from '@/components/molecules/adsense';

const ArticleCard = dynamic(
  () => import('@/components/molecules/article-card'),
  // eslint-disable-next-line react/display-name
  { loading: () => <p>Loading ...</p> }
);
const InfiniteScroll = dynamic(
  () => import('react-infinite-scroller'),
  // eslint-disable-next-line react/display-name
  { loading: () => <p>Loading ...</p> }
);

function IndexPage({ initialArticles, total, popularArticles }: any) {
  const [articles, setArticles] = useState(initialArticles);

  const getArticles = async (page: number) => {
    const res = await client.getEntries({
      content_type: CONTENT_TYPE.ARTICLE,
      order: '-sys.updatedAt',
      limit: PER_PAGE,
      skip: PER_PAGE * (page - 1),
    });
    setArticles(articles.concat(res.items));
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="my-8 text-2xl font-bold text-center text-gray-700 underline">
          Featured Posts ✅
        </div>
        <div className="m-0">
          {popularArticles.map((article: any) => (
            <ArticleCard key={article.fields.slug} article={article} />
          ))}
        </div>
        <AdSense
          styles={{ display: 'block', textAlign: 'center', height: 250 }}
          format=""
          responsive="true"
          client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || ''}
          slot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SQUARE_SLOT || ''}
        />
        <div className="my-8 text-2xl font-bold text-center text-gray-700 underline">
          All Posts 📜
        </div>
        <InfiniteScroll
          className="m-0"
          pageStart={1}
          loadMore={getArticles}
          hasMore={articles.length < total}
          loader={
            <div className="mx-5 my-2 lg:mx-auto" key={1}>
              Loading ...
            </div>
          }
          useWindow={true}
        >
          {articles.map((article: any, i: number) =>
            !(i == 0) && i % 10 == 0 ? (
              <>
                <AdSense
                  styles={{
                    display: 'block',
                    textAlign: 'center',
                    height: 250,
                  }}
                  format=""
                  responsive="true"
                  client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || ''}
                  slot={
                    process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SQUARE_SLOT || ''
                  }
                />
                <ArticleCard key={article.fields.slug} article={article} />
              </>
            ) : (
              <ArticleCard key={article.fields.slug} article={article} />
            )
          )}
        </InfiniteScroll>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // 👇 `ga.json`から人気の記事を取得する
  let popularArticles = await Promise.all(
    popularPaths.map(async (path: string) => {
      let remakePath = path.replace('/', ''); // 👈 先頭の`/`を削除する
      console.log('✅ PATH:', path.replace('/', ''));

      if (remakePath) {
        let article = await client.getEntries({
          content_type: CONTENT_TYPE.ARTICLE,
          'fields.slug': remakePath,
        });
        if (article?.total === 1) {
          return article.items[0];
        }
      }
    })
  );
  popularArticles = popularArticles.filter(Boolean); // 👈 Falseな要素を削除
  if (popularArticles.length > 10) popularArticles.length = 10; // 👈 11個目の要素から全て削除

  const articles = await client.getEntries({
    content_type: CONTENT_TYPE.ARTICLE,
    order: '-sys.updatedAt',
    limit: PER_PAGE,
  });

  return {
    props: {
      initialArticles: articles.items,
      total: articles.total,
      popularArticles: popularArticles,
    },
  };
};

export default IndexPage;
