import Link from 'next/link'
import dayjs from 'dayjs'
import { PaperClipIcon } from '@heroicons/react/outline'
import { RefreshIcon } from '@heroicons/react/solid'

export default function ArticleCard({ article }: any) {
  return (
    <div
      key={article.fields.title}
      className="col-span-1 shadow flex flex-col bg-white dark:bg-gray-800 rounded-sm">
      <div className="flex-1 flex flex-col p-4 sm:p-6">
        <div className="flex sm:block items-center">
          <div className="w-20 sm:w-auto mr-4 sm:mr-0 hover:bg-gray-100 hover:opacity-80 rounded-lg">
            <Link href={`/${article.fields.slug}`}>
              <a>
                <img
                  className="h-10 sm:h-16 mx-auto"
                  src={article.fields.image.fields.file.url}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="flex-1 sm:block mt-0 sm:mt-5">
            <Link href={`/${article.fields.slug}`}>
              <a className="text-gray-700 dark:text-gray-200 hover:text-gray-400 lg:text-base 2xl:text-lg font-bold">
                {article.fields.title}
              </a>
            </Link>
            <div className="flex flex-nowrap mt-2">
              {article.fields.tag.map((t, i) => (
                <a key={`${t.fields.slug}-${i}`} href={`/tag/${t.fields.slug}`}
                  className="mr-2 inline-flex items-center pl-1 pr-2 py-1 text-gray-800 text-xs font-bold bg-gray-100 dark:bg-gray-300 hover:bg-gray-200 rounded-full">
                  <PaperClipIcon className="h-4 w-4 mr-1"/>
                  {t.fields.name}
                </a>
              ))}
            </div>
            <div className="mt-3 flex flex-nowrap">
              <RefreshIcon className="h-5 text-gray-500 dark:text-gray-400 text-sm" />
              <span className="ml-1 text-gray-500 dark:text-gray-400 text-sm">{dayjs(article.sys.updatedAt).format('YYYY年MM月DD日')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}