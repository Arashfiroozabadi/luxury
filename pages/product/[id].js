import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
// import { useSelector } from 'react-redux'
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Layout from '../../components/Layout';
import ProductCaro from '../../components/ProductCaro';



const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
      [theme.breakpoints.only('xs')]: {
        width: '100%',
      },
    },
    card: {
      boxShadow: theme.shadows['0'],
    },
    mainContent: {
      display: 'flex',
      justifyContent: 'space-evenly',
      [theme.breakpoints.only('xs')]: {
        flexDirection: 'column-reverse'
      },
    },
    texts: {
      width: '30%',
      [theme.breakpoints.only('xs')]: {
        width: '100%',
        marginTop: 20
      },
    },
  }))

export default function Post() {
  // const data = useSelector(state => state.data)
  const classes = useStyles();
  const [res, setRes] = useState([]);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(
        '/api/product',
        {
          target: id
        }
      );
      setRes(result.data);
    };
    fetchData();
  }, []);
  // console.log(res.path);

  return (
    < Layout >
      <Head>
        <title>
          {`مدل ${res.title}`}
        </title>
      </Head>
      <Container>
        <Grid container justify="center" >
          <Grid item
            md={12}

          >
            <Card
              className={classes.card}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                // className={classes.title}
                >
                  <Box>
                    {`مدل ${res.title}`}
                  </Box>
                </Typography>
              </CardContent>
              <CardContent>
                {
                  res.path ?
                    <div
                      className={classes.mainContent}
                    >
                      <div
                        className={classes.texts}
                      >
                        <Typography
                          variant="subtitle1"
                          component="h5"
                          gutterBottom
                        // className={classes.title}
                        >
                          <Box textAlign="justify" >
                            {res.description}
                          </Box>
                        </Typography>
                      </div>
                      <ProductCaro
                        path={res.path}
                      />
                    </div>
                    :
                    null
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout >
  );
}