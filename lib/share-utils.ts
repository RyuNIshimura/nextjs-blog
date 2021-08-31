import { BASE_URL } from '@/lib/constants';
import { IArticle } from '@/@types/generated/contentful';
interface ITwitterShareParams {
  url: string;
  text: string;
}

export function tweet(article: IArticle) {
  let shareURL: string = 'https://twitter.com/share?';

  const params: ITwitterShareParams = {
    url: `${BASE_URL}/${article.fields.slug}`,
    text: article.fields.title,
  };

  shareURL += '&' + 'url' + '=' + encodeURIComponent(params.url);
  shareURL += '&' + 'text' + '=' + encodeURIComponent(params.text);

  window.open(
    shareURL,
    '',
    'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0'
  );
}

export const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
};
