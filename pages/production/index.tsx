import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {
// eslint-disable-next-line no-unused-vars
  makeStyles, createStyles, Theme, ThemeProvider,
} from '@material-ui/core/styles';
import {
  useSelector,
} from 'react-redux';


import {
  Container, Grid, Typography, Box,
} from '@material-ui/core';

import Cards from '../../components/Cards';
import { themeDark, themeLight } from '../../components/theme';


const Layout = dynamic(
  () => import('../../components/Layout'),
  { loading: () => <p>loading...</p> },
);

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  cards: {
    margin: '5px 5px',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
}));

interface State {
  theme:boolean
}

function Production() {
  const classes = useStyles();
  const t = useSelector((state:State) => state.theme);

  return (
    <ThemeProvider theme={t ? themeDark : themeLight}>
      <Layout>
        <Head>
          <title>محصولات ما</title>
        </Head>
        <Container>
          <Grid container justify="space-between">
            <Grid
              item
              md={12}
            >
              <Typography
                color="textPrimary"
                variant="h5"
                component="h2"
                gutterBottom
              >
                <Box>
                  محصولات ما
                </Box>
              </Typography>
            </Grid>
            <Grid item md={3} className={classes.cards}>
              <Cards
                title="مبلمان راحتی"
                link="rahati"
                category="rahati"
              />
            </Grid>
            <Grid item md={3} className={classes.cards}>
              <Cards
                title="مبلمان راحتی ال"
                link="rahati-L"
                category="rahatil"
              />
            </Grid>
            <Grid item md={3} className={classes.cards}>
              <Cards
                title="سرویس خواب"
                link="service-khab"
                category="servicekhab"
              />
            </Grid>
            <Grid item md={3} className={classes.cards}>
              <Cards
                title="نهار خوری"
                link="nahar-khori"
                category="naharkhori"
              />
            </Grid>
            <Grid item md={3} className={classes.cards}>
              <Cards
                title="آینه کنسول"
                link="console"
                category="console"
              />
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </ThemeProvider>
  );
}

export default Production;
