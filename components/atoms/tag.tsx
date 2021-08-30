import { PaperClipIcon } from '@heroicons/react/outline';

export default function Tag({ tag }: any) {
  return (
    <a
      href={`/tag/${tag.fields.slug}`}
      className="inline-flex items-center py-2 pl-1 pr-2 mr-2 text-xs font-bold text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200"
    >
      <PaperClipIcon className="w-4 h-4 mr-1" />
      {tag.fields.name}
    </a>
  );
}
