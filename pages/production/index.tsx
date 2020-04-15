import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import {
  Container, Grid, Typography, Box,
} from '@material-ui/core';
import Cards from '../../components/Cards';

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

function Production() {
  const classes = useStyles();
  return (
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
            />
          </Grid>
          <Grid item md={3} className={classes.cards}>
            <Cards
              title="مبلمان راحتی ال"
              link="rahati-L"
            />
          </Grid>
          <Grid item md={3} className={classes.cards}>
            <Cards
              title="سرویس خواب"
              link="service-khab"
            />
          </Grid>
          <Grid item md={3} className={classes.cards}>
            <Cards
              title="نهار خوری"
              link="nahar-khori"
            />
          </Grid>
          <Grid item md={3} className={classes.cards}>
            <Cards
              title="آینه کنسول"
              link="console"
            />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default Production;
