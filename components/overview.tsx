import React, { useState, useEffect } from 'react';
import axios from 'axios';
import persianJs from 'persianjs';
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Grid, Typography, Box, Container, Divider,
} from '@material-ui/core';

import AppTheme from './theme';
import Chart from './chart';
import Loading from './loading';

function convertValue(v: number) {
  if (v === 0) {
    return 0;
  }
  return persianJs(v).englishNumber().toString();
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  divider: {
    width: '100%',
    margin: '10px 0',
  },
  loading: {
    margin: 20,
    textAlign: 'center',
  },
}));
function Overview() {
  const classes = useStyles();
  const [data, setData] = useState<any | null>([]);
  const tokenKey = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post('/api/overview', {}, {
        headers: {
          token: tokenKey,
        },
      });

      setData(result.data);
    };
    fetchData();
  }, []);
  useEffect(() => () => {
    console.log('cleaned up');
  }, []);
  if (data.category) {
    return (
      <AppTheme>
        <Container>
          <Grid container>
            <Typography
              variant="h5"
              component="h2"
              color="textPrimary"
              gutterBottom
            >
              <Box fontSize="1rem">
                تمام محصولات
                {`: ${convertValue(data.total)}`}
              </Box>
            </Typography>
            <div
              style={{
                width: '100%',
              }}
            >
              <Chart
                view={false}
                data={data}
                array={data.category}
              />
            </div>
            <Divider className={classes.divider} />
            <Typography
              variant="h5"
              component="h2"
              color="textPrimary"
              gutterBottom
            >
              <Box fontSize="1rem">
                میزان بازدید کلی
                {`: ${convertValue(data.totalView)}`}
              </Box>
            </Typography>
            <div
              style={{
                width: '100%',
              }}
            >
              <Chart
                view
                data={data}
                array={data.category}
              />
            </div>
          </Grid>

        </Container>
      </AppTheme>
    );
  }
  return (
    <Loading className={classes.loading} size={40} />
  );
}

export default Overview;
