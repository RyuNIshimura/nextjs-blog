export default function Category({ category }: { category: any }) {
  return (
    <a
      href={`/category/${category.fields.slug}`}
      className="inline-flex items-center px-2 py-3 m-1 text-sm font-bold text-gray-800 bg-gray-100 rounded-sm hover:bg-gray-200"
      style={{
        backgroundColor: category.fields.backgroundColor,
        color: category.fields.color,
      }}
    >
      {category.fields.name}
    </a>
  );
}
