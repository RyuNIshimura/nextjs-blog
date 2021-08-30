import { AppProps } from 'next/app';
import Router from 'next/router';
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/organisms/layout';
import * as gtag from '@/lib/gtag';
import '@/styles/globals.css';
import '@/styles/tailwind-utils.css';
import '@/styles/tailwind.css';
import '@/styles/markdown.scss';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
