export interface ITableOfContent {
  id: string;
  name: string;
}

export interface BreadcrumbPage {
  name: string;
  href: string;
  current: boolean;
}

export interface Sns {
  name: string;
  href: string;
  icon: any;
}
