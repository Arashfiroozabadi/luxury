import Head from 'next/head';

import Nav from "./Nav";

interface Layout {
    children: any,
}

function Layout(props: Layout) {
    return (
        <div>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />
            </Head>
            <Nav />
            {props.children}
        </div>
    )
}

export default Layout