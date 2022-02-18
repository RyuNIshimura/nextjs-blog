/* eslint-disable react/display-name */
import { TwitterIcon, GitHubIcon } from '@/components/svg';
import { Sns } from '@/@types/index';

export const APP_NAME = 'xxxx';
export const BASE_URL = 'https://xxxx.xxxx';
export const REPOSITORY_URL = 'https://github.com/xxxx/nextjs-blog';
export const META_DESCRIPTION = 'xxxx';
export const TWITTER_ID = 'xxxx';
export const GITHUB_ID = 'xxxx';
export const PER_PAGE = 15;
export const PER_SEARCH = 5;
export const RELATED_ARTICLES_LIMIT = 9;

export const ADDITIONAL_NAVIGATION = [
  { name: '📃 Reference', href: '/reference' },
  { name: '👀 Markdown Preview', href: '/markdown' },
  { name: '🙋‍♂️ About', href: '/about' },
  { name: '🦸‍♂️ Tags', href: '/tags' },
];

export enum CONTENT_TYPE {
  ARTICLE = 'article',
  CATEGORY = 'types',
  TAG = 'tags',
}

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
