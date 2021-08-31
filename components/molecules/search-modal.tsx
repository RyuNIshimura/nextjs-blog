import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import ArticleCard from '@/components/molecules/article-card';
import client from '@/lib/contentful';
import { PER_SEARCH, CONTENT_TYPE } from '@/lib/constants';
import { IArticle } from '@/@types/generated/contentful';

export default function SearchModal({
  open,
  parentCallback,
}: {
  open: boolean;
  parentCallback: any;
}) {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    if (!open) {
      setSnippets([]);
    }
  }, [open]);

  const _handleChange = async (e: {
    preventDefault: any;
    target: { value: any };
  }) => {
    e.preventDefault;
    if (!e.target.value) {
      setSnippets([]);
      return;
    }
    const response = await client.getEntries({
      content_type: CONTENT_TYPE.ARTICLE,
      order: '-sys.updatedAt',
      query: e.target.value,
      limit: PER_SEARCH,
    });
    setSnippets(response.items);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-50 overflow-y-auto"
        open={open}
        onClose={parentCallback}
      >
        <div className="flex justify-center px-4 pt-4 pb-20 text-center sm:items-end sm:min-h-screen sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0"
          >
            <div className="inline-block overflow-hidden overflow-y-scroll text-left align-bottom transition-all transform bg-gray-100 rounded-sm shadow-xl max-h-96 dark:bg-gray-900 sm:align-middle sm:max-w-3xl sm:w-full">
              <div id="search-container" className="w-full px-8 py-4">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative text-gray-400">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none dark:text-white">
                    <SearchIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    className="block w-full py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 bg-gray-100 border-b border-gray-400 sm:text-base dark:bg-gray-900 dark:text-white focus:outline-none"
                    placeholder="Search"
                    type="search"
                    name="search"
                    autoComplete="off"
                    onChange={_handleChange}
                  />
                </div>
                {!!snippets.length && (
                  <div className="max-w-full mt-5 bg-gray-100 rounded-sm dark:bg-gray-900">
                    {snippets.map((article: IArticle, i: number) => (
                      <div key={`${article.fields.slug}-${i}`} className="mb-5">
                        <ArticleCard article={article} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
