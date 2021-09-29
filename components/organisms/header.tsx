import { useState, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import SearchModal from '@/components/molecules/search-modal';
import { APP_NAME, SNS_ITEMS } from '@/lib/constants';

const navigation = [
  { name: '🏠 Home', href: '/' },
  { name: '🙋‍♂️ About', href: '/about' },
  { name: '🦸‍♂️ Map', href: '/tag' },
  {
    name: '🐦 Twitter',
    href: 'https://twitter.com/ryunishimura87',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];

export default function Header() {
  const [openSearchModal, setOpenSearchModal] = useState(false);

  if (typeof window !== 'undefined') {
    const keyboardJS = require('keyboardjs');
    keyboardJS.bind('command + k', () => {
      setOpenSearchModal(!openSearchModal);
    });
  }

  const _handleSearchModal = (
    bool: boolean | ((prevState: boolean) => boolean)
  ) => {
    setOpenSearchModal(bool);
  };

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-white border-opacity-25 shadow-0 sm:shadow lg:border-none"
      >
        {({ open }) => (
          <>
            <div className="px-2 mx-auto sm:px-4 lg:px-8 max-w-7xl">
              <div className="relative flex items-center justify-between h-16 lg:border-gray-400 lg:border-opacity-25">
                <div className="flex items-center px-2 lg:px-0">
                  <div className="flex-shrink-0">
                    <Link href="/">
                      <a className="flex">
                        <span className="sr-only">{APP_NAME}</span>
                        <Image
                          width="24"
                          height="24"
                          src="/icon.png"
                          alt={APP_NAME}
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="hidden lg:block lg:ml-4">
                    <div className="flex space-x-4">
                      {navigation.map((item, itemIdx) => (
                        <a
                          key={`${item.name}-${itemIdx}`}
                          href={item.href}
                          className="px-3 py-2 text-base font-bold text-gray-800 border border-transparent rounded-lg hover:bg-gray-200 hover:bg-opacity-75"
                          target={item?.target}
                          rel={item?.rel}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center flex-1 px-2 lg:ml-6 lg:justify-end">
                  <div
                    id="search-container"
                    className="w-full max-w-lg lg:max-w-xs"
                  >
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative mr-2 text-gray-600 border-b border-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div
                        className="block w-full py-2 pl-10 pr-3 leading-5 text-gray-600 rounded-lg cursor-pointer sm:text-sm"
                        onClick={() => setOpenSearchModal(true)}
                      >
                        Search
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <button
                          type="button"
                          className="hidden sm:inline-flex items-center px-2 py-1.5 text-sm leading-4 font-medium rounded-sm bg-gray-100 border-gray-200 border text-gray-600 focus:outline-none"
                        >
                          ⌘K
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 focus:ring-white">
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
              <div className="px-2 pt-2 pb-3 m-1 space-y-1 bg-white border-gray-800 rounded-md shadow border-1">
                {navigation.map((item) => (
                  <Fragment key={item.name}>
                    <a
                      href={item.href}
                      className="block px-3 py-2 font-bold text-gray-800 bg-white rounded-lg text-md"
                      target={item?.target}
                      rel={item?.rel}
                    >
                      {item.name}
                    </a>
                  </Fragment>
                ))}
                <Fragment>
                  <div className="flex px-3 py-2 bg-white">
                    {SNS_ITEMS.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-4 text-gray-600 hover:text-gray-400"
                      >
                        <span className="sr-only">{item.name}</span>
                        <item.icon className="w-6 h-6" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </Fragment>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <SearchModal open={openSearchModal} parentCallback={_handleSearchModal} />
    </>
  );
}
