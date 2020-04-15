// eslint-disable-next-line no-unused-vars
import React, { ReactNode } from 'react';
import Head from 'next/head';

import Nav from './Nav';
import Footer from './Footer';

interface Layout {
    children: ReactNode,
}

function Layout(props: Layout) {
  const { children } = props;
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
