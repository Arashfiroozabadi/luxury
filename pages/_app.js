/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Provider, useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PageTransition } from 'next-page-transitions';
import withRedux from 'next-redux-wrapper';

import { themeLight } from '../components/theme';
import Store from '../store';
import './style.scss';

const AppTest = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const authStatus = localStorage.getItem('auth');
    if (authStatus) {
      dispatch({ type: 'authStatus', auth: { auth: authStatus } });
    } else {
      dispatch({ type: 'authStatus', auth: false });
    }

    return () => {
      console.log('cleaned up');
    };
  }, []);
  return (
    <div>
      {children}
    </div>
  );
};

const MyApp = ({
  Component,
  pageProps,
  router,
  store,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    setIsMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Luxury</title>
      </Head>
      <CssBaseline />
      <Provider store={store}>
        <ThemeProvider theme={themeLight}>
          <AppTest>
            {
              isMounted && (
                <PageTransition timeout={500} classNames="page-transition">
                  <Component {...pageProps} key={router.route} />
                </PageTransition>
              )
            }
          </AppTest>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default withRedux(Store)(MyApp);
