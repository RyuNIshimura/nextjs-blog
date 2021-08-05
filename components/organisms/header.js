import { useState, Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import SearchModal from '@/components/molecules/search-modal.js'
import Switch from '@/components/atoms/switch'
import { APP_NAME, SNS_ITEMS } from '@/lib/constants.ts'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

const navigation = [
  { name: 'ホーム', href: '/' },
  // { name: 'Works', href: '/works' },
  { name: 'About Me', href: '/about' },
  { name: 'タグ一覧', href: '/tag' },
  { name: 'オススメの本', href: '/book' },
]

const options = [
  {
    name: 'HTML',
    href: '/tag/html'
  },
  {
    name: 'CSS',
    href: '/tag/css'
  },
  {
    name: 'JavaScript',
    href: '/tag/javascript'
  },
  {
    name: 'JAMStack',
    href: '/tag/jamstack'
  },
  {
    name: 'UIUX',
    href: '/tag/uiux'
  },
  {
    name: 'SEO',
    href: '/tag/seo'
  },
]

const options2 = [
  {
    name: 'ReactJS',
    href: '/tag/react'
  },
  {
    name: 'NextJS',
    href: '/tag/nextjs'
  },
  {
    name: 'VueJS',
    href: '/tag/vuejs'
  },
  {
    name: 'NuxtJS',
    href: '/tag/nuxt'
  },
  {
    name: 'NodeJS',
    href: '/tag/nodejs'
  },
  {
    name: 'TypeScript',
    href: '/tag/typescript'
  },
]

const options3 = [
  {
    name: 'Firebase',
    href: '/tag/firebase'
  },
  {
    name: 'Vercel',
    href: '/tag/vercel'
  },
  {
    name: 'Netlify',
    href: '/tag/netlify'
  },
  {
    name: 'Hasura',
    href: '/tag/hasura'
  },
  {
    name: 'Heroku',
    href: '/tag/heroku'
  }
]

const options4 = [
  {
    name: 'Git',
    href: '/tag/git'
  },
  {
    name: 'GitHub',
    href: '/tag/github'
  },
  {
    name: 'Contentful',
    href: '/tag/contentful'
  },
  {
    name: 'Stripe',
    href: '/tag/stripe'
  },
  {
    name: 'Linux',
    href: '/tag/linux'
  },
  {
    name: 'Docker',
    href: '/tag/docker'
  },
  {
    name: 'プログラマーの習慣',
    href: '/tag/habits'
  }
]

export default function Header() {
  const [openSearchModal, setOpenSearchModal] = useState(false)

  if (typeof window !== 'undefined') {
    // キーボードショートカット
    const keyboardJS = require('keyboardjs')
    keyboardJS.bind('command + k', () => {
      setOpenSearchModal(!openSearchModal)
    })
  }

  const _handleSearchModal = (bool) => {
    setOpenSearchModal(bool)
  }

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-white dark:bg-gray-900 shadow-0 sm:shadow border-opacity-25 lg:border-none">
        {({ open }) => (
          <>
            <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8">
              <div className="relative h-16 flex items-center justify-between lg:border-gray-400 lg:border-opacity-25">
                <div className="px-2 flex items-center lg:px-0">
                  <div className="flex-shrink-0">
                    <a href="/" className="flex">
                      <span className="sr-only">{ APP_NAME }</span>
                      <img
                        className="h-6 w-auto sm:h-6"
                        src="/icon.png"
                        alt={ APP_NAME }
                      />
                    </a>
                  </div>
                  <div className="hidden lg:block lg:ml-4">
                    <div className="flex space-x-4">
                      {navigation.map((item, itemIdx) => (
                        <a
                          key={`${item.name}-${itemIdx}`} href={item.href}
                          className="text-gray-800 dark:text-white border border-transparent hover:bg-gray-200 dark:hover:bg-gray-700 hover:bg-opacity-75 rounded-full py-2 px-3 text-base font-bold">
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <Popover className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className='ml-2 text-gray-800 dark:text-white border border-transparent hover:bg-gray-200 dark:hover:bg-gray-700 hover:bg-opacity-75 group rounded-full inline-flex items-center rounded-full py-2 px-3 text-base font-bold'
                          >
                            <span>フロントエンド</span>
                            <ChevronDownIcon
                              className='text-gray-800 dark:text-white ml-2 h-5 w-5'
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel
                              static
                              className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                            >
                              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="relative grid grid-cols-1 gap-6 grid-cols-2 bg-white dark:bg-gray-800 p-4">
                                  {options.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      className="-m-3 px-1 py-3 flex items-start rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:bg-gray-600"
                                    >
                                      <div className="ml-4">
                                        <p className="text-sm font-bold text-gray-800 dark:text-white">{item.name}</p>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </div>
                  <div className="hidden sm:block">
                    <Popover className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className='ml-2 text-gray-800 dark:text-white border border-transparent hover:bg-gray-200 dark:hover:bg-gray-700 hover:bg-opacity-75 group rounded-full inline-flex items-center rounded-full py-2 px-3 text-base font-bold'
                          >
                            <span>More JS</span>
                            <ChevronDownIcon
                              className='text-gray-800 dark:text-white ml-2 h-5 w-5'
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel
                              static
                              className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                            >
                              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="relative grid grid-cols-1 gap-6 grid-cols-2 bg-white dark:bg-gray-800 p-4">
                                  {options2.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      className="-m-3 px-1 py-3 flex items-start rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:bg-gray-600"
                                    >
                                      <div className="ml-4">
                                        <p className="text-sm font-bold text-gray-800 dark:text-white">{item.name}</p>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </div>
                  <div className="hidden sm:block">
                    <Popover className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className='ml-2 text-gray-800 dark:text-white border border-transparent hover:bg-gray-200 dark:hover:bg-gray-700 hover:bg-opacity-75 group rounded-full inline-flex items-center rounded-full py-2 px-3 text-base font-bold'
                          >
                            <span>サーバレス</span>
                            <ChevronDownIcon
                              className='text-gray-800 dark:text-white ml-2 h-5 w-5'
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel
                              static
                              className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                            >
                              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="relative grid grid-cols-1 gap-6 grid-cols-2 bg-white dark:bg-gray-800 p-4">
                                  {options3.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      className="-m-3 px-1 py-3 flex items-start rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                                    >
                                      <div className="ml-4">
                                        <p className="text-sm font-bold text-gray-800 dark:text-white">{item.name}</p>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </div>
                  <div className="hidden sm:block">
                    <Popover className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className='ml-2 text-gray-800 dark:text-white border border-transparent hover:bg-gray-200 dark:hover:bg-gray-700 hover:bg-opacity-75 group rounded-full inline-flex items-center rounded-full py-2 px-3 text-base font-bold'
                          >
                            <span>Others</span>
                            <ChevronDownIcon
                              className='text-gray-800 dark:text-white ml-2 h-5 w-5'
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel
                              static
                              className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                            >
                              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="relative grid grid-cols-1 gap-6 grid-cols-2 bg-white dark:bg-gray-800 p-4">
                                  {options4.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      className="-m-3 px-1 py-3 flex items-start rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                                    >
                                      <div className="ml-4">
                                        <p className="text-sm font-bold text-gray-800 dark:text-white">{item.name}</p>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </div>
                </div>
                <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                  <div className="hidden lg:flex my-auto">
                    {/* {SNS_ITEMS.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden lg:block mx-2 my-auto text-gray-600 dark:text-white hover:text-gray-400">
                        <span className="sr-only">{item.name}</span>
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </a>
                    ))} */}
                  </div>
                  <div className="hidden lg:block mx-3 my-auto">
                    <Switch />
                  </div>
                  <div id="search-container" className="max-w-lg w-full lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <div className="relative text-gray-400 focus-within:text-gray-600 mr-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div
                        className="cursor-pointer block w-full bg-gray-100  py-2 pl-10 pr-3 border border-transparent rounded-full leading-5 text-gray-500 sm:text-sm"
                        onClick={() => setOpenSearchModal(true)}
                      >
                          Search
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          className="inline-flex items-center px-2 py-1.5 text-sm leading-4 font-medium rounded-sm text-gray-500 focus:outline-none"
                        >
                            ⌘K
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-white dark:bg-gray-900 p-2 rounded-sm inline-flex items-center justify-center text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 dark:focus:ring-offset-white focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="bg-white dark:bg-gray-800 m-1 px-2 pt-2 pb-3 shadow space-y-1 border-1 border-gray-800 rounded-md">
                {navigation.map((item) =>
                  <Fragment key={item.name}>
                    <a
                      href={item.href}
                      className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white block rounded-sm py-2 px-3 text-md font-bold">
                      {item.name}
                    </a>
                  </Fragment>
                )}
                <Fragment>
                  <div
                    className="bg-white dark:bg-gray-800 flex py-2 px-3"
                  >
                    {SNS_ITEMS.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-white mr-4 hover:text-gray-400">
                        <span className="sr-only">{item.name}</span>
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </Fragment>
                <Fragment>
                  <div
                    className="bg-white dark:bg-gray-800 block py-2 px-3"
                  >
                    <Switch />
                  </div>
                </Fragment>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <SearchModal open={ openSearchModal } parentCallback={ _handleSearchModal } />
    </>
  )
}
