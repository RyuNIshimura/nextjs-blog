import { ExclamationIcon } from '@heroicons/react/solid';

export default function ArticleAlert() {
  return (
    <div className="p-4 rounded-sm shadow-sm bg-yellow-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="w-5 h-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <div className="text-sm font-medium text-yellow-800">
            <p>この記事は最終更新日から1年以上が経過しています。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
