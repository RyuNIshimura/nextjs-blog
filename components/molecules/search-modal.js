import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import ArticleCard from '@/components/molecules/article-card.js'
import client from '@/lib/contentful.js'
import { PER_SEARCH } from 'lib/constants.ts'

export default function SearchModal({ open, parentCallback }) {
  const [snippets, setSnippets] = useState([])

  useEffect(() => {
    if (!open) {
      setSnippets([])
    }
  }, [open])

  const _handleChange = async (e) => {
    e.preventDefault
    if (!e.target.value) {
      setSnippets([])
      return
    }
    const response = await client
      .getEntries({
        content_type: 'article',
        order: '-sys.updatedAt',
        query: e.target.value,
        limit: PER_SEARCH,
      })
    setSnippets(response.items)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="fixed z-50 inset-0 overflow-y-auto" open={open} onClose={parentCallback}>
        <div className="flex sm:items-end justify-center sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
            <div 
              className="max-h-96 overflow-y-scroll inline-block align-bottom bg-gray-100 dark:bg-gray-900 rounded-sm text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-3xl sm:w-full"
            >
              <div id="search-container" className="w-full px-8 py-4">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative text-gray-400">
                  <div className="dark:text-white pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    className="block w-full sm:text-base bg-gray-100 dark:bg-gray-900 border-b border-gray-400 py-2 pl-10 pr-3 leading-5 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none"
                    placeholder="Search"
                    type="search"
                    name="search"
                    autoComplete="off"
                    onChange={_handleChange}
                  />
                </div>
                {!!snippets.length && 
                  <div className="mt-5 max-w-full bg-gray-100 dark:bg-gray-900 rounded-sm">
                    {snippets.map((article, i) => (
                      <div key={`${article.fields.slug}-${i}`} className="mb-5">
                        <ArticleCard article={article} />
                      </div>
                    ))}
                  </div>
                }
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
