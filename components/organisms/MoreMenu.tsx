import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { ADDITIONAL_NAVIGATION } from '@/lib/constants';

export default function MoreMenu() {
  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <Menu.Button className="inline-flex justify-center px-3 py-2 text-base font-bold text-gray-800 border border-transparent rounded-lg hover:bg-gray-200 hover:bg-opacity-75">
          💎 More
          <ChevronDownIcon
            className="items-center justify-center w-5 h-5 mt-0.5"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {ADDITIONAL_NAVIGATION.map((item: any, i: number) => (
              <Menu.Item key={`header-${item.name}-${i}`}>
                <a
                  href={item.href}
                  className="block w-full px-3 py-2 text-base font-bold text-gray-800 border border-transparent rounded-lg hover:bg-gray-200 hover:bg-opacity-75"
                  target={item?.target}
                  rel={item?.rel}
                >
                  {item.name}
                </a>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
