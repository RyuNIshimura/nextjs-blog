export const APP_NAME: string = 'Nishimura Club'
export const BASE_URL: string = 'https://nishimura.club'
export const META_DESCRIPTION: string = 'nishimura.club'
export const PER_PAGE: number = 15
export const PER_SEARCH: number = 5
export const RELATED_ARTICLES_LIMIT: number = 9
export const TWITTER_ID: string = 'ryunishimura87'
export const GITHUB_ID: string = 'RyuNIshimura'

interface Sns {
  name: string;
  href: string;
  icon: any;
}

export const SNS_ITEMS: Sns[] = [
  {
    name: 'Twitter',
    href: `https://twitter.com/${TWITTER_ID}`,
    icon: ''
  },
  {
    name: 'GitHub',
    href: `https://github.com/${GITHUB_ID}`,
    icon: ''
  }
]