import { SNS_ITEMS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {SNS_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-200 hover:text-gray-500">
              <span className="sr-only">{item.name}</span>
              <item.icon className="w-6 h-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-base text-center text-gray-600 dark:text-gray-200">
            &copy; 2020 Nishimura Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
