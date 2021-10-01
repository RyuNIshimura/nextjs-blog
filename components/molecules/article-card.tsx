import dayjs from 'dayjs';

export default function ArticleCard({ article }: { article: any }) {
  return (
    <div
      key={article.fields.title}
      className="flex flex-col col-span-1 bg-white border-b border-dotted"
    >
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center">
          <div className="flex-1 mt-0">
            <a
              href={`/${article.fields.slug}`}
              className="text-xl font-bold text-gray-900 hover:text-gray-600 sm:text-2xl"
            >
              {article.fields.title}
            </a>
            <div className="flex items-center sm:block">
              <div className="flex flex-wrap mt-5 sm:flex-row-reverse">
                {article.fields.tag.map((t: any, i: number) => (
                  <a
                    key={`${t.fields.slug}-${i}`}
                    href={`/tags/${t.fields.slug}`}
                    className="inline-flex items-center px-3 py-3 mt-2 mr-2 text-sm font-bold text-gray-800 bg-gray-100 rounded-sm hover:bg-gray-200"
                    style={{
                      backgroundColor: t.fields.backgroundColor,
                      color: t.fields.color,
                    }}
                  >
                    {t.fields.name}
                  </a>
                ))}
              </div>
              <div className="flex mt-5 sm:flex-row-reverse flex-nowrap">
                <span className="ml-1 text-sm text-gray-900">
                  {`updated ${dayjs(article.sys.updatedAt).format(
                    'MMM D, YYYY'
                  )}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
