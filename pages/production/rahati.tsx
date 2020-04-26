import React, {
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
// import { useDispatch } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Container,
  Grid, Button,
  Card, CardMedia,
  CardContent, CardActions,
  Typography, Box, Divider,
} from '@material-ui/core';
import { withRouter } from 'next/dist/client/router';
import AppTheme from '../../components/theme';

const Layout = dynamic(
  () => import('../../components/Layout'),
  { loading: () => <p>صبر کنید...</p> },
);

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,

  },
  container: {
    margin: 1,
  },
  cards: {
    margin: '5px 5px',
    marginTop: theme.spacing(3),
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  title: {
    fontSize: '1.15rem',
  },
  cardImgs: {
    width: '100%',
    height: 'auto',
    maxHeight: 230,
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
            <Box>
              مبل راحتی
            </Box>
          </Typography>
          <Grid container justify="space-evenly">
            {resp.map((d: any) => (
              <Grid
                key={d._id}
                item
                md={4}
                className={classes.container}
              >
                <Card
                  className={classes.cards}
                  elevation={8}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h2"
                      gutterBottom
                      className={classes.title}
                    >
                      <Box>
                        {`مدل ${d.title}`}
                      </Box>
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardMedia
                    className={classes.cardImgs}
                    component="img"
                    image={`/${d.path[0]}`}
                    alt={d.title}
                    title={d.title}
                  />
                  <Divider />
                  <CardActions>
                    <Link
                      href="/product/[id]"
                      as={`/product/${d._id}`}
                      passHref
                    >
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        component="a"
                      >
                        مشاهده محصول
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Layout>
    </AppTheme>
  );
}

export default withRouter(Rahati);
