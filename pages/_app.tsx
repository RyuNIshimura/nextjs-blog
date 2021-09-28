import { AppProps } from 'next/app';
import Router from 'next/router';
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/organisms/layout';
import * as gtag from '@/lib/gtag';
import '@/styles/globals.css';
import '@/styles/tailwind-utils.css';
import '@/styles/tailwind.css';
import '@/styles/markdown.scss';
import Head from 'next/head';
import {
  APP_NAME,
  BASE_URL,
  META_DESCRIPTION,
  PER_PAGE,
  CONTENT_TYPE,
} from '@/lib/constants';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={META_DESCRIPTION} />
        <meta property="og:title" content={APP_NAME} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={`${BASE_URL}/ogp.png`} />
        <meta name="twitter:image" content={`${BASE_URL}/ogp.png`} />
        <meta name="twitter:card" content="summary" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
