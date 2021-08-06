import Link from 'next/link'
import { HomeIcon } from '@heroicons/react/solid'

export default function Breadcrumbs({ pages }: any) {
  return (
    <nav className="my-5 bg-white dark:bg-gray-900 flex" aria-label="Breadcrumb">
      <ol className="max-w-full w-full mx-auto px-4 flex space-x-4 sm:px-6 lg:px-8">
        <li className="flex">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-gray-700 dark:text-white hover:text-gray-400">
                <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </a>
            </Link>
          </div>
        </li>
        {pages.map((page: any) => (
          <li key={page.name} className="flex">
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 w-6 h-full text-gray-300"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <Link href={page.href}>
                <a
                  className="ml-4 font-bold text-gray-700 dark:text-white hover:text-gray-400"
                  aria-current={page.current ? 'page' : undefined}
                >
                  {page.name}
                </a>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}