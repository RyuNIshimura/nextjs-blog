import { GitHubIcon } from '@/components/svg';
import { REPOSITORY_URL } from '@/lib/constants';

export default function EditGitHubButton({ filepath }: { filepath: string }) {
  const editGitHub = () => {
    window.open(`${REPOSITORY_URL}/edit/main/${filepath}`, '_blank');
  };

  return (
    <button
      onClick={() => editGitHub()}
      className="flex items-center justify-center p-2 text-sm text-white bg-gray-600 rounded-md shadow-sm hover:bg-gray-800"
    >
      <GitHubIcon className="w-6 h-6" aria-hidden="true" />
      このページをGitHubで編集する
    </button>
  );
}
