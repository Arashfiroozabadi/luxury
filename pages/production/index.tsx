import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {
// eslint-disable-next-line no-unused-vars
  makeStyles, createStyles, Theme,
} from '@material-ui/core/styles';


import {
  Container, Grid, Typography, Box,
} from '@material-ui/core';

import Cards from '../../components/Cards';
import AppTheme, {
} from '../../components/theme';


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


function Production(): JSX.Element {
  const classes = useStyles();

  return (
    <AppTheme>
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
                image="rahati"
              />
            </Grid>
            <Grid item md={3} className={classes.cards}>
              <Cards
                title="مبلمان راحتی ال"
                link="rahati-l"
                category="rahati-l"
                image="rahati-l"
              />
            </Grid>
            <Grid item md={3} className={classes.cards}>
              <Cards
                title="سرویس خواب"
                link="service-khab"
                category="service-khab"
                image="bedset"
              />
            </Grid>
            <Grid item md={3} className={classes.cards}>
              <Cards
                title="نهار خوری"
                link="nahar-khori"
                category="nahar-khori"
                image="dining"
              />
            </Grid>
            <Grid item md={3} className={classes.cards}>
              <Cards
                title="آینه کنسول"
                link="console"
                category="console"
                image="console"
              />
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </AppTheme>
  );
}

export default Production;
