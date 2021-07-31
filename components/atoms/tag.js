import { PaperClipIcon } from '@heroicons/react/outline'

export default function Tag({ tag }) {
  return (
    <a 
      href={`/tag/${tag.fields.slug}`}
      className="mr-2 inline-flex items-center pl-1 pr-2 py-2 text-gray-800 text-xs font-bold bg-gray-100 hover:bg-gray-200 rounded-full">
      <PaperClipIcon className="h-4 w-4 mr-1"/>
      {tag.fields.name}
    </a>
  )
}

