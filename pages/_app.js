import '@/styles/globals.css'
import '@/styles/tailwind-utils.css'
import '@/styles/tailwind.css'
import '@/styles/markdown.scss'

import Layout from '@/components/organisms/layout'
import * as gtag from '@/lib/gtag'
import { ThemeProvider } from 'next-themes'
import Router from 'next/router'

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
