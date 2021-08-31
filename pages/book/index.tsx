import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import InfiniteScroll from 'react-infinite-scroller';
import BookCard from '@/components/molecules/book-card';
import client from '@/lib/contentful';
import {
  APP_NAME,
  BASE_URL,
  META_DESCRIPTION,
  PER_PAGE,
  CONTENT_TYPE,
} from '@/lib/constants';
import { IBook } from '@/@types/generated/contentful';

interface Props {
  initialBooks: IBook[];
  total: number;
}

function BookPage({ initialBooks, total }: Props) {
  const [books, setBooks] = useState(initialBooks);

  const getBooks = async (page: number) => {
    const res = await client.getEntries({
      content_type: CONTENT_TYPE.BOOK,
      order: '-sys.updatedAt',
      limit: PER_PAGE,
      skip: PER_PAGE * (page - 1),
    });

    setBooks(books.concat(res.items));
  };

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={META_DESCRIPTION} />
        <meta property="og:title" content={APP_NAME} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={`${BASE_URL}/ogp.png`} />
        <meta name="twitter:image" content={`${BASE_URL}/ogp.png`} />
        <meta name="twitter:card" content="summary" />
      </Head>
      <InfiniteScroll
        className="grid grid-cols-1 gap-6 m-0 sm:m-8 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5"
        pageStart={1}
        loadMore={getBooks}
        hasMore={books.length < total}
        loader={
          <div className="mx-5 my-2 lg:mx-auto" key={1}>
            ロード中 ...
          </div>
        }
        useWindow={true}
      >
        {books.map((book: IBook) => (
          <BookCard key={book.fields.title} book={book} />
        ))}
      </InfiniteScroll>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const books = await client.getEntries({
    content_type: CONTENT_TYPE.BOOK,
    order: '-sys.updatedAt',
    limit: PER_PAGE,
  });

  return {
    props: {
      initialBooks: books.items,
      total: books.total,
    },
  };
};

export default BookPage;
