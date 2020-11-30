import { AppProps } from 'next/app'
import Head from 'next/head'

import { RequiredsProvider, UserProvider } from 'contexts'

import GlobalStyles from 'styles/global'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Data Entry Form | Paulo Pamplona</title>
        <link rel="shortcut icon" href="/img/favicon.png" />
        <link rel="apple-touch-icon" href="/img/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="Data Entry Form"
          content="Data Entry Form in Next.js, from PauloPamplona.com to FinerVision.com"
        />
      </Head>
      <GlobalStyles />
      <UserProvider>
        <RequiredsProvider>
          <Component {...pageProps} />
        </RequiredsProvider>
      </UserProvider>
    </>
  )
}

export default App
