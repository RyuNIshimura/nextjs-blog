import { IWork } from '@/@types/generated/contentful';

export default function WorkCard({ work }: { work: IWork }) {
  return (
    <div
      key={work.fields.name}
      className="flex flex-col col-span-1 p-4 bg-white rounded-lg shadow-lg"
    >
      <a href={`${work.fields.link}`} target="_blank" rel="noopener noreferrer">
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
        className="my-4 font-bold text-center text-gray-700 hover:text-gray-400 lg:text-2xl"
      >
        <span className="sr-only">{work.fields.name}</span>
        {work.fields.name}
      </a>
      <p className="mx-4 my-4 text-sm text-center text-gray-500">
        {work.fields.description}
      </p>
    </div>
  );
}
