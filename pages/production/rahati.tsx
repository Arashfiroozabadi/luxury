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

import AppTheme from '../../components/theme';
import ProductCardInfo from '../../components/ProductCardInfo';

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
}));

function Rahati() {
  const classes = useStyles();
  const [resp, setResp] = useState<any | null>([]);
  // const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(
        '/api/production',
        {
          target: 'rahati',
        },
      );
      setResp(result.data);
    };
    fetchData();
  }, []);
  console.log(resp.resualt);

  return (
    resp.resualt !== undefined
      ? (
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
                <Box>
                  مبل راحتی
                </Box>
              </Typography>
              <Grid container justify="space-evenly">
                {resp.resualt.map((d: any) => (
                  <Grid
                    key={d._id}
                    item
                    md={4}
                    className={classes.container}
                  >
                    <ProductCardInfo
                      title={d.title}
                      path={resp.images[0]}
                      _id={d._id}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Layout>
        </AppTheme>
      )
      : null
  );
}

export default withRouter(Rahati);
