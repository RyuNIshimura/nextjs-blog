import { AppProps } from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import Layout from '@/components/organisms/layout';
import * as gtag from '@/lib/gtag';
import '@/styles/globals.css';
import '@/styles/tailwind-utils.css';
import '@/styles/tailwind.css';
import '@/styles/markdown.scss';
import { APP_NAME, BASE_URL, META_DESCRIPTION } from '@/lib/constants';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta name="HandheldFriendly" content="true" />
        <meta name="author" content="Ryu Nishimura" />
        <meta name="robots" content="index,follow" />
        <meta name="description" content={META_DESCRIPTION} key="description" />
        <meta property="og:type" content="og_type" key="og_type" />
        <meta property="og:site_name" content={APP_NAME} key="og_site_name" />
        <meta property="og:url" content={BASE_URL} key="og_url" />
        <meta property="og:title" content={APP_NAME} key="og_title" />
        <meta
          property="og:description"
          content={META_DESCRIPTION}
          key="og_description"
        />
        <meta
          property="og:image"
          content={`${BASE_URL}/icon.png`}
          key="og_image"
        />
        <meta
          name="twitter:image"
          content={`${BASE_URL}/icon.png`}
          key="twitter_image"
        />
        <meta name="twitter:card" content="summary" key="twitter_card" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
