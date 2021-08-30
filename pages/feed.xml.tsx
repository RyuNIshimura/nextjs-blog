import { GetServerSidePropsContext } from 'next';
import RSS from 'rss';
import client from '@/lib/contentful';
import { BASE_URL, PER_PAGE, CONTENT_TYPE } from '@/lib/constants';

async function generateFeedXml() {
  const feed = new RSS({
    title: 'タイトル',
    description: '説明',
    site_url: 'サイトのURL',
    feed_url: 'フィードページのURL',
    language: 'ja',
  });

  let articles = await client.getEntries({
    content_type: CONTENT_TYPE.ARTICLE,
    limit: 1,
  });
  const total = articles.total;
  const maxPage = Math.ceil(total / PER_PAGE);
  const maxPageArray = [...Array(maxPage).keys()].map((i) => ++i);

  const paths = [];
  for (const l of maxPageArray) {
    articles = await client.getEntries({
      content_type: CONTENT_TYPE.ARTICLE,
      order: '-sys.updatedAt',
      limit: PER_PAGE,
      skip: PER_PAGE * (l - 1),
    });
    for (const article of articles.items) {
      paths.push({ params: { slug: article.fields.slug } });
      feed.item({
        title: article.fields.title,
        description: article.fields.description,
        date: new Date(article.sys.updatedAt),
        url: `${BASE_URL}/${article.fields.slug}`,
      });
    }
  }

  return feed.xml();
}

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const xml = await generateFeedXml();

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24時間キャッシュする
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;
