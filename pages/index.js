import Head from 'next/head'

export default function Home({ router }) {
  return (
    <div className="container">
      <Head>
        <title>I18N Test Bed</title>
      </Head>

      <main>
        <h1 className="title">I18N Test Bed</h1>
        <dl>
          <dt>Locale</dt><dd>{router.locale}</dd>
          <dt>Path</dt><dd>{router.pathname}</dd>
        </dl>
      </main>
    </div>
  )
}
