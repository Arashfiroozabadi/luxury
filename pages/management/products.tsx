
import React, { useEffect, useState } from 'react';
import {
// eslint-disable-next-line no-unused-vars
  makeStyles, createStyles, Theme, Paper, Typography, Box, Button,
} from '@material-ui/core';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import Axios from 'axios';
import Router from 'next/router';

import { Warning } from '@material-ui/icons';

import { Loading } from '../../components';
import AppTheme from '../../components/theme';
import Layout from '../../components/Layout';
import WithNav from '../../components/management/WithNav';
import AllProducts from '../../components/management/AllProducts';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    transition: 'background-color 250ms linear , color 250ms linear',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  unAuth: {
    textAlign: 'center',
  },
  alertMsg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertIcon: {
    color: 'gold',
    margin: '0px 10px',
  },
  loading: {
    display: 'flex',
    marginTop: 40,
    justifyContent: 'center',
  },
}));

function Products() {
  const classes = useStyles();

  const [isLoading, setisLoading] = useState(true);

  const dispatch = useDispatch();
  const auth = useSelector((state:any) => state.auth);

  const handleGoHome = () => {
    Router.push('/');
  };

  useEffect(() => {
    const tokenKey = localStorage.getItem('token');
    const fetchData = async () => {
      setisLoading(true);
      await Axios.get('/api/admininfo', {
        headers: {
          token: tokenKey,
        },
      }).then((result:any) => {
        dispatch({ type: 'authStatus', auth: true });
        dispatch({ type: 'login', loginForm: { userName: result.data.userName, password: '' } });
        setisLoading(false);
      }).catch((err) => {
        console.log(err);
        setisLoading(false);
      });
    };
    fetchData();
    return () => {
      console.log('cleaned up');
    };
  }, []);

  return (
    <AppTheme>
      <Layout>
        {!auth ? (
          <Paper className={classes.unAuth}>
            {isLoading ? (<Loading className={classes.loading} size={50} />)
              : (
                <>
                  <Typography
                    variant="h5"
                    component="h5"
                  >
                    <Box
                      className={classes.alertMsg}
                      component="p"
                      textAlign="center"
                    >
                      <Warning className={classes.alertIcon} fontSize="large" />
                      فقط مدیران میتوانند به قسمت دسترسی داشته باشند
                      <Warning className={classes.alertIcon} fontSize="large" />
                    </Box>
                  </Typography>
                  <Button
                    onClick={handleGoHome}
                    variant="outlined"
                  >
                    بازگشت به صفحه اصلی
                  </Button>
                </>
              )}
          </Paper>
        ) : (
          <>
            {isLoading ? (<Loading className={classes.loading} size={50} />)
              : (
                <WithNav className={classes.root}>
                  <AllProducts />
                </WithNav>
              )}
          </>
        )}
      </Layout>
    </AppTheme>
  );
}

export default Products;
