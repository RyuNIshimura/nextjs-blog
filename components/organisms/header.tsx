import { useState, Fragment } from 'react'
import Link from 'next/link'
import { Popover, Transition, Disclosure } from '@headlessui/react'
import { SearchIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import SearchModal from '@/components/molecules/search-modal'
import Switch from '@/components/atoms/switch'
import { APP_NAME, SNS_ITEMS } from '@/lib/constants'

const navigation = [
  { name: 'ホーム', href: '/' }
]

const options = [
  {
    name: 'JavaScript',
    href: '/tag/javascript'
  },
  {
    name: 'TypeScript',
    href: '/tag/typescript'
  },
  {
    name: 'ReactJS',
    href: '/tag/reactjs'
  },
  {
    name: 'NextJS',
    href: '/tag/nextjs'
  },
  {
    name: 'NestJS',
    href: '/tag/nestjs'
  },
  {
    name: 'Prisma',
    href: '/tag/prisma'
  },
]

export default function Header() {
  const [openSearchModal, setOpenSearchModal] = useState(false)

  if (typeof window !== 'undefined') {
    const keyboardJS = require('keyboardjs')
    keyboardJS.bind('command + k', () => {
      setOpenSearchModal(!openSearchModal)
    })
  }

  const _handleSearchModal = (bool: boolean | ((prevState: boolean) => boolean)) => {
    setOpenSearchModal(bool)
  }

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-white border-opacity-25 dark:bg-gray-900 shadow-0 sm:shadow lg:border-none">
        {({ open }) => (
          <>
            <div className="max-w-full px-2 mx-auto sm:px-4 lg:px-8">
              <div className="relative flex items-center justify-between h-16 lg:border-gray-400 lg:border-opacity-25">
                <div className="flex items-center px-2 lg:px-0">
                  <div className="flex-shrink-0">
                    <Link href="/">
                      <a className="flex">
                        <span className="sr-only">{ APP_NAME }</span>
                        <img
                          className="w-auto h-6 sm:h-6"
                          src="/icon.png"
                          alt={ APP_NAME }
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="hidden lg:block lg:ml-4">
                    <div className="flex space-x-4">
                      {navigation.map((item, itemIdx) => (
                        <a
                          key={`${item.name}-${itemIdx}`} href={item.href}
                          className="px-3 py-2 text-base font-bold text-gray-800 border border-transparent rounded-full dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 hover:bg-opacity-75">
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
                            className='inline-flex items-center px-3 py-2 ml-2 text-base font-bold text-gray-800 border border-transparent rounded-full dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 hover:bg-opacity-75 group'
                          >
                            <span>WEB開発</span>
                            <ChevronDownIcon
                              className='w-5 h-5 ml-2 text-gray-800 dark:text-white'
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
                              className="absolute z-10 w-screen max-w-md px-2 mt-3 -ml-4 transform sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                            >
                              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative grid grid-cols-2 gap-6 p-4 bg-white dark:bg-gray-800">
                                  {options.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      className="flex items-start px-1 py-3 -m-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
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
                <div className="flex justify-center flex-1 px-2 lg:ml-6 lg:justify-end">
                  <div className="hidden my-auto lg:flex">
                    {SNS_ITEMS.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden mx-2 my-auto text-gray-600 lg:block dark:text-white hover:text-gray-400">
                        <span className="sr-only">{item.name}</span>
                        <item.icon className="w-6 h-6" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                  <div className="hidden mx-3 my-auto lg:block">
                    <Switch />
                  </div>
                  <div id="search-container" className="w-full max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <div className="relative mr-2 text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div
                        className="block w-full py-2 pl-10 pr-3 leading-5 text-gray-500 bg-gray-100 border border-transparent rounded-full cursor-pointer sm:text-sm"
                        onClick={() => setOpenSearchModal(true)}
                      >
                          Search
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
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
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-800 bg-white rounded-sm dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 dark:focus:ring-offset-white focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="px-2 pt-2 pb-3 m-1 space-y-1 bg-white border-gray-800 rounded-md shadow dark:bg-gray-800 border-1">
                {navigation.map((item) =>
                  <Fragment key={item.name}>
                    <a
                      href={item.href}
                      className="block px-3 py-2 font-bold text-gray-800 bg-white rounded-sm dark:bg-gray-800 dark:text-white text-md">
                      {item.name}
                    </a>
                  </Fragment>
                )}
                <Fragment>
                  <div
                    className="flex px-3 py-2 bg-white dark:bg-gray-800"
                  >
                    {SNS_ITEMS.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-4 text-gray-600 dark:text-white hover:text-gray-400">
                        <span className="sr-only">{item.name}</span>
                        <item.icon className="w-6 h-6" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </Fragment>
                <Fragment>
                  <div
                    className="block px-3 py-2 bg-white dark:bg-gray-800"
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
