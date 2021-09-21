import { ITableOfContent } from '@/@types/index';

export default function TableOfContents({
  tableOfContents,
}: {
  tableOfContents: ITableOfContent[];
}) {
  return (
    <nav className="mt-2 space-y-1" aria-label="Sidebar">
      {tableOfContents.map((content: ITableOfContent) => (
        <a
          key={content.name}
          href={`#${content.id}`}
          className={
            'flex items-center px-3 py-2 text-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 font-bold rounded-lg'
          }
        >
          <span className="truncate">{content.name}</span>
        </a>
      ))}
    </nav>
  );
}
