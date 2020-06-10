// eslint-disable-next-line no-unused-vars
import React, { ReactNode } from 'react';
import Head from 'next/head';
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import { themeDark, themeLight } from './theme';
import Nav from './Nav';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode,
}
interface State {
  theme:boolean
}


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
    backgroundColor: theme.palette.background.default,
    transition: 'background-color 250ms linear',
  },
}));
function Layout(props: LayoutProps) {
  const classes = useStyles();
  const { children } = props;
  const t = useSelector((state:State) => state.theme);

  return (
    <ThemeProvider theme={t ? themeDark : themeLight}>
      <div className={classes.root}>
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
    </ThemeProvider>
  );
}

export default Layout;
