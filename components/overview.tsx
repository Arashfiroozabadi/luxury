import React, { useState, useEffect } from 'react';
import axios from 'axios';
import persianJs from 'persianjs';


import { Grid, Typography, Box } from '@material-ui/core';
import AppTheme from './theme';
import Chart from './chart';

function convertValue(v: number) {
  if (v === 0) {
    return 0;
  }
  return persianJs(v).englishNumber().toString();
}

function Overview() {
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
        <Grid container>
          <Typography
            variant="h5"
            component="h2"
            color="textPrimary"
            gutterBottom
          >
            <Box fontSize="1rem">
              تمام محصولات
              {` ${convertValue(data.total)}`}
            </Box>
          </Typography>
          <div
            style={{
              width: '100%',
            }}
          >
            <Chart
              data={data}
              array={data.category}
            />
          </div>
          <Typography
            variant="h5"
            component="h2"
            color="textPrimary"
            gutterBottom
          >
            <Box fontSize="1rem">
              میزان بازدید کلی
              {convertValue(data.totalView)}
            </Box>
          </Typography>
        </Grid>
      </AppTheme>
    );
  }
  return (
    <div>
      Loading...
    </div>
  );
}

export default Overview;
