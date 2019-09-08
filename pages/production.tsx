import Head from 'next/head';
import dynamic from 'next/dynamic';


const Layout = dynamic(
    () => import('../components/Layout'),
    { loading: () => <p>loading...</p> }
)

function Production() {
    return (
        <Layout>
            <Head>
                <title>Production</title>
            </Head>
            <h1>Production</h1>
        </Layout>
    )
}

export default Production