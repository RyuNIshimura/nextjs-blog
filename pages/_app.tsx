import { AppProps } from 'next/app';
import Router from 'next/router';
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/organisms/layout';
import * as gtag from '@/lib/gtag';
import '@/styles/globals.css';
import '@/styles/tailwind-utils.css';
import '@/styles/tailwind.css';
import '@/styles/markdown.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

function MyApp({ Component, pageProps }: AppProps) {
  // NOTE: 👇 ページ遷移の度にGoogle AdSenseを更新する
  const { asPath } = useRouter();
  useEffect(() => {
    var ads = document.getElementsByClassName('adsbygoogle').length;
    for (var i = 0; i < ads; i++) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, [asPath]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
