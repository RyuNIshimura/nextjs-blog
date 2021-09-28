export default function Category({ category }: { category: any }) {
  return (
    <a
      href={`/category/${category.fields.slug}`}
      className="inline-flex items-center px-2 py-2 pr-2 mr-2 text-xs font-bold text-gray-800 bg-gray-100 hover:bg-gray-200"
      style={{
        backgroundColor: category.fields.backgroundColor,
        color: category.fields.color,
      }}
    >
      {category.fields.name}
    </a>
  );
}
