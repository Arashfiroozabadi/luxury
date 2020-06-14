import React, { useEffect, useState } from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  Theme,
  Typography, Box, Container,
  makeStyles, createStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import Axios from 'axios';
import { AppTheme, Layout, Div } from '../../components';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    transition: 'background-color 250ms linear , color 250ms linear',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  container: {
  },
  header: {
    transition: 'background-color 250ms linear , color 250ms linear',
  },
  loading: {
    display: 'flex',
    marginTop: 40,
    justifyContent: 'center',
  },
}));

interface dataProps{
  userName: string
  type:string
  msg:string
}

function Management() {
  const classes = useStyles();
  const [auth, setAuth] = useState<boolean>();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [data, setData] = useState<dataProps>({
    userName: '',
    type: '',
    msg: '',
  });
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    const fetchData = async () => {
      setisLoading(true);
      await Axios.get('/api/admininfo', {
        headers: {
          token: userToken,
        },
      }).then((result) => {
        setisLoading(false);
        setAuth(true);
        setData(result.data);
      });
    };
    fetchData();

    return () => {

    };
  }, []);

  return (
    <AppTheme>
      <Layout>
        <Container className={classes.container}>
          <Div className={clsx(classes.header)}>
            <Typography
              variant="h4"
              component="h1"
            >
              <Box>
                مدیریت
              </Box>
            </Typography>
          </Div>
          <Div>
            {!auth
              ? (
                <div>
                  {isLoading
                    ? 'loading'
                    : <h1>u must login</h1>}
                </div>
              )
              : (
                <h1>
                  good for you
                  {' '}
                  {data!.userName}
                </h1>
              )}
          </Div>
        </Container>
      </Layout>
    </AppTheme>
  );
}

export default Management;
