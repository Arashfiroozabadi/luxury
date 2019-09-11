import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PageTransition } from 'next-page-transitions';

import theme from '../components/theme';
import './style.scss'

class MyApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps, router } = this.props;

        return (
            <React.Fragment>

                <Head>
                    <title>Luxury</title>
                </Head>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <PageTransition timeout={500} classNames="page-transition">
                        <Component {...pageProps} key={router.route} />
                    </PageTransition>
                </ThemeProvider>
            </React.Fragment>
        );
    }
}

export default MyApp;