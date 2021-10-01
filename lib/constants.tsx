/* eslint-disable react/display-name */
import { TwitterIcon, GitHubIcon } from '@/components/svg';
import { Sns } from '@/@types/index';

/**
 * App Settings.
 **/
export const APP_NAME: string = 'Nishimura Club ⚡️';
export const BASE_URL: string = 'https://nishimura.club';
export const META_DESCRIPTION: string =
  'JavaScriptとWeb開発のチュートリアル ⚡️';

/**
 * Content Display Settings.
 **/
export const PER_PAGE: number = 15;
export const PER_SEARCH: number = 5;
export const RELATED_ARTICLES_LIMIT: number = 9;

/**
 * Contentful data model content types.
 * https://www.contentful.com/developers/docs/concepts/data-model/
 **/
export enum CONTENT_TYPE {
  ARTICLE = 'article', // ex) posts
  CATEGORY = 'types', // ex) categories
  TAG = 'tags', // ex) tags
}

/**
 * Display SNS links in Header, Footer, and About.
 **/
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
