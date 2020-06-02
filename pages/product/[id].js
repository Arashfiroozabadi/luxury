import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import {
  Container,
  Grid,
} from '@material-ui/core';

import { makeStyles, createStyles } from '@material-ui/core/styles';

import Layout from '../../components/Layout';
import Product from '../../components/Product';
import AppTheme from '../../components/theme';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      padding: 0,
    },
  },
  testRooot: {
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      padding: 0,
    },
  },
}));

function Post() {
  const classes = useStyles();
  const [res, setRes] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(
        '/api/product',
        {
          target: id,
        },
      );
      setRes(result.data);
    };
    fetchData();
  }, []);
  return (
    <AppTheme>
      <Layout>
        <Head>
          <title>
            {`مدل ${res.title}`}
          </title>
        </Head>
        <Container className={classes.root}>
          <Grid container justify="center">
            <Grid item md={12}>
              <Product
                description={res.description}
                title={res.title}
                path={res._id}
              />
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </AppTheme>
  );
}

export default Post;
