import Link from 'next/link';
import { APP_NAME, SNS_ITEMS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer>
      <div className="px-4 py-12 mx-auto overflow-hidden max-w-4xl sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link href="/">
              <a className="text-gray-500 hover:text-gray-900">🏠 Home</a>
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link href="/about">
              <a className="text-gray-500 hover:text-gray-900">🙋‍♂️ About</a>
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link href="/privacy">
              <a className="text-gray-500 hover:text-gray-900">📜 Privacy</a>
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link href="/tos">
              <a className="text-gray-500 hover:text-gray-900">📃 Terms</a>
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
              className="text-gray-600 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="w-6 h-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-base text-center text-gray-500">
          &copy; {`2020 ${APP_NAME}. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}
