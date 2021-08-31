import { PaperClipIcon } from '@heroicons/react/outline';
import { ITypes } from '@/@types/generated/contentful';

export default function Category({ category }: { category: ITypes }) {
  return (
    <a
      href={`/category/${category.fields.slug}`}
      className="inline-flex items-center py-2 pl-1 pr-2 mr-2 text-xs font-bold text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200"
    >
      <PaperClipIcon className="w-4 h-4 mr-1" />
      {category.fields.name}
    </a>
  );
}
