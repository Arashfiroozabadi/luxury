/* eslint-disable no-nested-ternary */
import React, {
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import Head from 'next/head';
import dynamic from 'next/dynamic';
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography, Box,
} from '@material-ui/core';
import { withRouter } from 'next/dist/client/router';

import Loading from '../../components/loading';
import AppTheme from '../../components/theme';
import ProductCardInfo from '../../components/ProductCardInfo';
import { NotFound, ColorCate } from '../../components';

const Layout = dynamic(
  () => import('../../components/Layout'),
  { loading: () => <p>صبر کنید...</p> },
);

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  container: {
    margin: 1,
  },
  Loading: {

  },
}));

function Rahati() {
  const classes = useStyles();
  const [resp, setResp] = useState<any | null>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.post(
        '/api/production',
        {
          target: 'rahati',
        },
      );
      setResp(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => () => {
    console.log('cleaned up');
  }, []);

  return (
    <AppTheme>
      <Layout>
        <Head>
          <title>مبل راحتی</title>
        </Head>
        <Container>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
          >
            <Box
              style={{
                color: ColorCate('rahati'),
              }}
            >
              مبل راحتی
            </Box>
          </Typography>
          <Grid container justify="space-evenly">
            {isLoading
              ? <Loading size={80} className={classes.Loading} />
              : resp.length === 0
                ? (
                  <NotFound />
                )
                : resp.map((d: any) => (
                  <Grid
                    key={d._id}
                    item
                    md={4}
                    className={classes.container}
                  >
                    <ProductCardInfo
                      title={d.title}
                      path={d.imagePath[0]}
                      _id={d._id}
                    />
                  </Grid>
                ))}
          </Grid>
        </Container>
      </Layout>
    </AppTheme>
  );
}

export default withRouter(Rahati);
