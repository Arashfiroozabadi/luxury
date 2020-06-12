import React, { useEffect, useState } from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import Axios from 'axios';
import Router from 'next/router';
import {
// eslint-disable-next-line no-unused-vars
  makeStyles, createStyles, Theme, Button,
} from '@material-ui/core';

import { Loading } from '../../components';
import AppTheme from '../../components/theme';
import Layout from '../../components/Layout';
import WithNav from '../../components/management/WithNav';
import Overview from '../../components/overview';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    transition: 'background-color 250ms linear , color 250ms linear',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  loading: {
    display: 'flex',
    marginTop: 40,
    justifyContent: 'center',
  },
}));

function Chart() {
  const classes = useStyles();
  const [data, setdata] = useState<any>({});

  const dispatch = useDispatch();
  const auth = useSelector((state:any) => state.auth);
  const [isLoading, setisLoading] = useState(true);

  const handleGoHome = () => {
    Router.push('/');
  };
  useEffect(() => {
    if (!auth.auth) {
      const fetchData = async () => {
        setisLoading(true);
        await Axios.post('/api/auth').then((result:any) => {
          setdata(result.data);
          localStorage.setItem('auth', result.data.auth);
          dispatch({ type: 'authStatus', auth: result.data });
        }).catch((err) => {
          console.log(err);
          setisLoading(false);
        });
      };
      fetchData();
      setisLoading(false);
    } else {
      setisLoading(false);
    }
  }, []);

  useEffect(() => () => {
    console.log('cleaned up');
  }, []);

  if (!auth.auth) {
    return (
      <AppTheme>
        <Layout>
          <h1>
            you are not admin go back
            {data.auth}
          </h1>
          <Button
            onClick={handleGoHome}
          >
            back to home
          </Button>
        </Layout>
      </AppTheme>
    );
  }
  if (isLoading) {
    return (
      <AppTheme>
        <Layout>
          <Loading className={classes.loading} size={80} />
        </Layout>
      </AppTheme>
    );
  } return (
    <AppTheme>
      <Layout>
        <WithNav className={classes.root}>
          <Overview />
        </WithNav>
      </Layout>
    </AppTheme>
  );
}

export default Chart;
