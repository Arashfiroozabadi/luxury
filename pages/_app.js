import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PageTransition } from 'next-page-transitions';
import withRedux from "next-redux-wrapper";

import theme from '../components/theme';
import store from '../store';
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
        const { Component, pageProps, router, store } = this.props;

        return (
            <React.Fragment>

                <Head>
                    <title>Luxury</title>
                </Head>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Provider store={store}>
                        <PageTransition timeout={500} classNames="page-transition">
                            <Component {...pageProps} key={router.route} />
                        </PageTransition>
                    </Provider>
                </ThemeProvider>
            </React.Fragment>
        );
    }
}

export default withRedux(store)(MyApp);