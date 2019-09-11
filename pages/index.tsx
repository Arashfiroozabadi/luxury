import Head from 'next/head';
import dynamic from 'next/dynamic';
// import Link from 'next/link'

const Layout = dynamic(
  () => import('../components/Layout'),
  { loading: () => <p>loading...</p> }
)

export default () => (
  <Layout>
    <Head>
      <title>Home</title>
    </Head>
    <h1>home</h1>
  </Layout>
)