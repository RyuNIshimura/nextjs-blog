// import Link from 'next/link'
// import dayjs from 'dayjs'
import { PaperClipIcon } from '@heroicons/react/outline'

export default function BookCard({ book }: any) {
  return (
    <div
      key={book.fields.title}
      className="col-span-1 shadow flex flex-col bg-white dark:bg-gray-800 rounded-sm">
      <div className="flex-1 flex flex-col p-4 sm:p-6">
        <div className="flex sm:block items-center">
          <div className="w-20 sm:w-auto mr-4 sm:mr-0">
            <a 
              href={`${book.fields.link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="object-contain h-36 w-full"
                src={book.fields.image.fields.file.url}
                alt=""
              />
            </a>
          </div>
          <div className="flex-1 sm:block mt-0 sm:mt-5">
            <a 
              href={`${book.fields.link}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-400 lg:text-base 2xl:text-lg font-bold">
              {book.fields.title}
            </a>
            <div className="flex flex-nowrap text-gray-600 dark:text-gray-200 mt-2 text-sm">
              {book.fields.description.substr(0, 100) + '...'}
            </div>
            <div className="flex flex-nowrap mt-2">
              {book.fields.tags.map((tag, i) => (
                <a key={`${tag.fields.slug}-${i}`} href={`/tag/${tag.fields.slug}`}
                  className="mr-2 inline-flex items-center pl-1 pr-2 py-1 text-gray-800 text-xs font-bold bg-gray-100 dark:bg-gray-300 hover:bg-gray-200 rounded-full">
                  <PaperClipIcon className="h-4 w-4 mr-1"/>
                  {tag.fields.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}