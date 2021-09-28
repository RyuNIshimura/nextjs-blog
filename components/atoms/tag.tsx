export default function Tag({ tag }: { tag: any }) {
  return (
    <a
      href={`/tag/${tag.fields.slug}`}
      className="inline-flex items-center px-2 py-2 pr-2 mr-2 text-xs font-bold text-gray-800 bg-gray-100 hover:bg-gray-200"
      style={{
        backgroundColor: tag.fields.backgroundColor,
        color: tag.fields.color,
      }}
    >
      {tag.fields.name}
    </a>
  );
}
