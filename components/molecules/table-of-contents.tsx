export default function TableOfContents(props: any) {
  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {props.tableOfContents.map((content: any) => (
        <a
          key={content.name}
          href={`#${content.id}`}
          className={'flex items-center px-3 py-2 text-md text-gray-700 dark:text-gray-200 hover:text-gray-400 font-bold rounded-sm'}>
          <span className="truncate">{content.name}</span>
        </a>
      ))}
    </nav>
  )
}
