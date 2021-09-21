import { SNS_ITEMS } from '@/lib/constants';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap justify-center -mx-5 -my-2"
          aria-label="Footer"
        >
          <div className="px-5 py-2">
            <Link href="/">
              <a className="text-base text-gray-500 hover:text-gray-900">
                ホーム
              </a>
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link href="/about">
              <a className="text-base text-gray-500 hover:text-gray-900">
                About
              </a>
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link href="/privacy">
              <a className="text-base text-gray-500 hover:text-gray-900">
                プライバシーポリシー
              </a>
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link href="/tos">
              <a className="text-base text-gray-500 hover:text-gray-900">
                利用規約
              </a>
            </Link>
          </div>
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
          {SNS_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-200 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="w-6 h-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-base text-center text-gray-400">
          &copy; {`$2020 ${APP_NAME}. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}
