import { PaperClipIcon } from '@heroicons/react/outline';
import { IBook, ITags } from '@/@types/generated/contentful';

export default function BookCard({ book }: { book: IBook }) {
  return (
    <div
      key={book.fields.title}
      className="flex flex-col col-span-1 bg-white rounded-sm shadow dark:bg-gray-800"
    >
      <div className="flex flex-col flex-1 p-4 sm:p-6">
        <div className="flex items-center sm:block">
          <div className="w-20 mr-4 sm:w-auto sm:mr-0">
            <a
              href={`${book.fields.link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="object-contain w-full h-36"
                src={book.fields.image.fields.file.url}
                alt=""
              />
            </a>
          </div>
          <div className="flex-1 mt-0 sm:block sm:mt-5">
            <a
              href={`${book.fields.link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gray-700 dark:text-gray-200 hover:text-gray-400 lg:text-base 2xl:text-lg"
            >
              {book.fields.title}
            </a>
            <div className="flex mt-2 text-sm text-gray-600 flex-nowrap dark:text-gray-200">
              {book.fields.description.substr(0, 100) + '...'}
            </div>
            <div className="flex mt-2 flex-nowrap">
              {book.fields.tags &&
                book.fields.tags.map((tag: ITags, i: number) => (
                  <a
                    key={`${tag.fields.slug}-${i}`}
                    href={`/tag/${tag.fields.slug}`}
                    className="inline-flex items-center py-1 pl-1 pr-2 mr-2 text-xs font-bold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-300 hover:bg-gray-200"
                  >
                    <PaperClipIcon className="w-4 h-4 mr-1" />
                    {tag.fields.name}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
