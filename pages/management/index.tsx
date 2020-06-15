import React, { useEffect, useState } from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  Theme,
  Typography, Box, Container,
  makeStyles, createStyles, TextField, Button, FormHelperText,
} from '@material-ui/core';
import clsx from 'clsx';
import Axios from 'axios';
import {
  AppTheme, Layout, Div, Paper, RTL, Loading,
} from '../../components';

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
  formRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formPaper: {
    width: '30%',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  formTextHelper: {
    textAlign: 'center',
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
interface formDataProps{
  userName: string
  password: string
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
  const [FormData, setFormData] = useState<formDataProps>({
    userName: '',
    password: '',
  });
  const [Error, setError] = useState({
    err: false,
    msg: '',
  });


  function handleSubmit(e:any) {
    e.preventDefault();
    const fetchData = async () => {
      setisLoading(true);
      await Axios.post('/api/login', { form: FormData }).then((result) => {
        setisLoading(false);
        setError({ err: false, msg: result.data.msg });
        console.log(result.data);
        localStorage.setItem('token', result.data.token);
        setTimeout(() => {
          setAuth(result.data.auth);
        }, 3000);
      }).catch((err) => {
        setisLoading(false);
        setError({ err: true, msg: err.response.data.msg });
        console.log(err.response.data);
      });
    };

    fetchData();
  }

  function handleOnChangeInput(e:any) {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  }

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
      }).catch((e) => {
        setisLoading(false);
        setError({ err: true, msg: e.response.data.msg });
        console.error(e);
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
                  <div className={clsx(classes.formRoot)}>
                    <Paper className={clsx(classes.formPaper)}>
                      <form
                        className={clsx(classes.form)}
                        onSubmit={(e) => handleSubmit(e)}
                      >
                        <RTL>
                          <TextField
                            label="نام کاربری"
                            name="userName"
                            helperText=""
                            onChange={(e) => handleOnChangeInput(e)}
                          />
                          <TextField
                            label="رمز ورود"
                            name="password"
                            helperText=""
                            onChange={(e) => handleOnChangeInput(e)}
                          />
                          <Button
                            disabled={isLoading}
                            type="submit"
                          >
                            ورود
                          </Button>
                          <FormHelperText
                            className={classes.formTextHelper}
                            error={Error.err}
                            variant="outlined"
                          >
                            {Error.msg}
                          </FormHelperText>
                        </RTL>
                      </form>
                      {isLoading
                        ? <Loading className={classes.loading} size={20} />
                        : null}
                    </Paper>
                  </div>
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
