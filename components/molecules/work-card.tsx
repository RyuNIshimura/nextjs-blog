export default function WorkCard({ work }: any) {
  return (
    <div
      key={work.fields.name}
      className="p-4 col-span-1 shadow-lg flex flex-col bg-white dark:bg-gray-900 rounded-lg">
      <a 
        href={`${work.fields.link}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="h-48 mx-auto"
          src={work.fields.image.fields.file.url}
          alt=""
        />
      </a>
      <a  
        href={work.fields.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 dark:text-gray-200 my-4 text-center hover:text-gray-400 lg:text-2xl font-bold"
      >
        <span className="sr-only">{work.fields.name}</span>
        {work.fields.name}
      </a>
      <p
        className="text-center mx-4 text-gray-500 dark:text-gray-200 my-4 text-center text-sm"
      >
        {work.fields.description}
      </p>
    </div>
  )
}