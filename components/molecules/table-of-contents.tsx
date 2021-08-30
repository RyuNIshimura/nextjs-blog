export default function TableOfContents(props: any) {
  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {props.tableOfContents.map((content: any) => (
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
