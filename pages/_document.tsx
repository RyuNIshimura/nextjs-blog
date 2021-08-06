import Document, { 
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import { GA_TRACKING_ID } from '@/lib/gtag'
import { APP_NAME, META_DESCRIPTION } from '@/lib/constants'

export default class extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* windows */}
          <meta
            name="msapplication-square70x70logo"
            content="/site-tile-70x70.png"
          />
          <meta
            name="msapplication-square150x150logo"
            content="/site-tile-150x150.png"
          />
          <meta
            name="msapplication-wide310x150logo"
            content="/site-tile-310x150.png"
          />
          <meta
            name="msapplication-square310x310logo"
            content="/site-tile-310x310.png"
          />
          <meta name="msapplication-TileColor" content="#FFF" />

          {/* safari */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#FFF" />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon-180x180.png"
          />

          {/* common */}
          <meta name="application-name" content={APP_NAME} />
          <meta name="theme-color" content="#FFF" />
          <meta name="description" content={META_DESCRIPTION} />
          <link rel="icon" sizes="192x192" href="/icon-192x192.png" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />

          {/* <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
            crossOrigin="anonymous"></script>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script> */}

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
