/* eslint-disable react/display-name */
import { TwitterIcon, GitHubIcon } from '@/components/svg';
import { Sns } from '@/@types/index';

export const APP_NAME: string = 'Nishimura Club ⚡️';
export const BASE_URL: string = 'https://nishimura.club';
export const META_DESCRIPTION: string =
  'JavaScriptとWeb開発のチュートリアル ⚡️';

export const PER_PAGE: number = 15;
export const PER_SEARCH: number = 5;
export const RELATED_ARTICLES_LIMIT: number = 9;

export enum CONTENT_TYPE {
  ARTICLE = 'article',
  CATEGORY = 'types',
  TAG = 'tags',
}

export const TWITTER_ID: string = 'ryunishimura87';
export const GITHUB_ID: string = 'RyuNIshimura';

export const SNS_ITEMS: Sns[] = [
  {
    name: 'Twitter',
    href: `https://twitter.com/${TWITTER_ID}`,
    icon: (props: any) => <TwitterIcon {...props} />,
  },
  {
    name: 'GitHub',
    href: `https://github.com/${GITHUB_ID}`,
    icon: (props: any) => <GitHubIcon {...props} />,
  },
];
