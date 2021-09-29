export default function Tag({ tag }: { tag: any }) {
  return (
    <a
      href={`/tag/${tag.fields.slug}`}
      className="inline-flex items-center px-2 py-3 m-1 text-sm font-bold text-gray-800 bg-gray-100 rounded-sm hover:bg-gray-200"
      style={{
        backgroundColor: tag.fields.backgroundColor,
        color: tag.fields.color,
      }}
    >
      {tag.fields.name}
    </a>
  );
}
