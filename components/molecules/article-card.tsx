import Link from 'next/link'
import dayjs from 'dayjs'
import { PaperClipIcon } from '@heroicons/react/outline'
import { RefreshIcon } from '@heroicons/react/solid'

export default function ArticleCard({ article }: any) {
  return (
    <div
      key={article.fields.title}
      className="flex flex-col col-span-1 bg-white rounded-sm shadow dark:bg-gray-800">
      <div className="flex flex-col flex-1 p-4 sm:p-6">
        <div className="flex items-center sm:block">
          <div className="w-20 mr-4 rounded-lg sm:w-auto sm:mr-0 hover:bg-gray-100 hover:opacity-80">
            <Link href={`/${article.fields.slug}`}>
              <a>
                <img
                  className="h-10 mx-auto sm:h-16"
                  src={article.fields.image.fields.file.url}
                  alt={article.fields.title}
                />
              </a>
            </Link>
          </div>
          <div className="flex-1 mt-0 sm:block sm:mt-5">
            <Link href={`/${article.fields.slug}`}>
              <a className="font-bold text-gray-700 dark:text-gray-200 hover:text-gray-400 lg:text-base 2xl:text-lg">
                {article.fields.title}
              </a>
            </Link>
            <div className="flex mt-2 flex-nowrap">
              {article.fields.tag.map((t: any, i: number) => (
                <a key={`${t.fields.slug}-${i}`} href={`/tag/${t.fields.slug}`}
                  className="flex items-center py-1 pl-1 pr-2 mr-2 text-xs font-bold text-gray-800 bg-gray-100 rounded-full flex-nowrap dark:bg-gray-300 hover:bg-gray-200">
                  <PaperClipIcon className="w-4 h-4 mr-1"/>
                  {t.fields.name}
                </a>
              ))}
            </div>
            <div className="flex mt-3 flex-nowrap">
              <RefreshIcon className="h-5 text-sm text-gray-500 dark:text-gray-400" />
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">{dayjs(article.sys.updatedAt).format('YYYY年MM月DD日')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}