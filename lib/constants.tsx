/* eslint-disable react/display-name */
import { TwitterIcon, GitHubIcon } from '@/components/svg';

/**
 * App Settings.
 **/
export const APP_NAME: string = 'Nishimura Club'; // ex) My Dev Note
export const BASE_URL: string = 'https://nishimura.club'; // ex) https://example.com
export const META_DESCRIPTION: string =
  'JavaScript と Web開発 のチュートリアル'; // ex) JavaScript and Web Development Tutorials.

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
export const ARTICLE_TYPE: string = 'article'; // ex) posts
export const CATEGORY_TYPE: string = 'types'; // ex) categories
export const TAG_TYPE: string = 'tags'; // ex) tags

/**
 * Display SNS links in Header, Footer, and About.
 **/
interface Sns {
  name: string;
  href: string;
  icon: any;
}
export const TWITTER_ID: string = 'ryunishimura87'; // ex)@xxxxxxxx
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
