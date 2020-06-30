import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { themeDark } from '../components/theme';

class MyDocument extends Document {
  render() {
    return (
      <html lang="fa">
        <Head>
          <meta charSet="utf-8" />

          <meta
            name="description"
            content="گالری مبل لاکچری عرضه کننده انواع مبلمان راحتی در انواع طرح‌ها و رنگ‌های متفاوت متناسب با سلیقیه‌ی شما"
          />
          <meta
            name="keywords"
            content="
            luxury,
            گالری مبل لاکچری,
            مبلمان راحتی,
            مبل راحتی,
            مبل راحتی ال,
            مبلمان راحتی ال,
            سرویس خواب,
            گالری مبل,
            مبل,مبلمان,
            صنایع چوبی,
            لاکچری,
            "
          />
          <meta name="og:title" property="og:title" content="گالری مبل Luxury" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://luxury.ir" />
          <meta property="og:locale" content="fa" />
          <meta
            property="og:description"
            content="گالری مبل لاکچری عرضه کننده انواع مبلمان راحتی در انواع طرح‌ها و رنگ‌های متفاوت متناسب با سلیقیه‌ی شما"
          />
          <meta property="og:site_name" content="گالری مبل Luxury" />
          <link rel="canonical" href="https://luxury.ir/" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />

          <meta name="application-name" content="Luxury" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content={themeDark.palette.primary.main} />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Luxury" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="manifest" href="/manifest.json" />

          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />

          <link href="https://api.mapbox.com/mapbox-gl-js/v1.11.0/mapbox-gl.css" rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            href="https://cdn.rawgit.com/rastikerdar/vazir-font/v21.0.1/dist/font-face.css"
            rel="stylesheet"
            type="text/css"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <body dir="rtl">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
  });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};

export default MyDocument;
