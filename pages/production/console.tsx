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

function Console() {
  const classes = useStyles();
  const [resp, setResp] = useState<any | null>([]);
  // const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(
        '/api/production',
        {
          target: 'console',
        },
      );
      setResp(result.data);
    };
    fetchData();
  }, []);

  return (
    <AppTheme>
      <Layout>
        <Head>
          <title>آینه کنسول</title>
        </Head>
        <Container>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
          >
            <Box>
              آینه کنسول
            </Box>
          </Typography>
          <Grid container justify="space-evenly">
            {
            resp.map((d: any) => (
              <Grid
                key={d._id}
                item
                md={4}
                className={classes.container}
              >
                <ProductCardInfo
                  title={d.title}
                  path={d.path[0]}
                  _id={d._id}
                />
              </Grid>
            ))
        }
          </Grid>
        </Container>
      </Layout>
    </AppTheme>
  );
}

export default withRouter(Console);
