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
import ConvertString from '../../components/ConvertString';

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
  useEffect(() => () => {
    console.log('cleaned up');
  }, []);
  return (
    <AppTheme>
      <Layout>
        <Head>
          <title>
            {`${ConvertString(res.category)} ${res.title}`}
          </title>
          <meta
            property="og:url"
            content={`http://luxury.ir/product/${res._id}`}
          />
          <meta
            property="og:image"
            content={
              res.imagePath
                ? res.imagePath[0] : null
            }
          />
          <meta
            property="og:image:secure_url"
            content={
              res.imagePath
                ? res.imagePath[0] : null
            }
          />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="300" />
          <meta property="og:image:alt" content={res.title} />

        </Head>
        <Container className={classes.root}>
          <Grid container justify="center">
            <Grid item md={12}>
              <Product
                data={res}
                description={res.description}
                title={res.title}
                path={res.imagePath}
                views={res.views}
              />
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </AppTheme>
  );
}

export default Post;
