import React, { useEffect, useState } from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  Theme,
  Typography, Box, Container,
  makeStyles, createStyles, TextField, Button, FormHelperText, InputAdornment, IconButton,
} from '@material-ui/core';
import clsx from 'clsx';
import Axios from 'axios';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

import {
  AppTheme, Layout, Div, Paper, RTL, Loading, AdminPanel,
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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  form: {
    width: '100%',
    display: 'flex',
    padding: '10px 15px',
    flexDirection: 'column',
  },
  submitButton: {
    margin: '15px 0px',
  },
  formTextHelper: {
    textAlign: 'center',
  },
  success: {
    color: theme.palette.success.main,
  },
  loading: {
    padding: 7,
    display: 'flex',
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
  // const [auth, setAuth] = useState<boolean>();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [data, setData] = useState<dataProps>({
    userName: '',
    type: '',
    msg: '',
  });
  const [FormData, setFormData] = useState<formDataProps>({
    userName: '',
    password: '',
  });
  // const [Error, setError] = useState({
  //   err: false,
  //   msg: '',
  // });

  const dispatch = useDispatch();
  const auth = useSelector((state:any) => state.auth);
  const Error = useSelector((state:any) => state.err);
  console.log(Error);


  function handleSubmit(e:any) {
    const userCheck = FormData.userName.length;
    const passCheck = FormData.password.length;
    if (userCheck <= 0) {
      e.preventDefault();
      return dispatch({ type: 'err', err: { err: true, msg: 'نام کاربری را وارد کنید' } });
      // return setError({ err: true, msg: 'نام کاربری را وارد کنید' });
    }
    if (passCheck <= 3) {
      e.preventDefault();
      return dispatch({ type: 'err', err: { err: true, msg: 'رمز ورود نباید کمتر از ۴ حرف باشد' } });
      // return setError({ err: true, msg: 'رمز ورود نباید کمتر از ۴ حرف باشد' });
    }
    e.preventDefault();
    const fetchData = async () => {
      setisLoading(true);
      await Axios.post('/api/login', { form: FormData }).then((result:any) => {
        // setError({ err: false, msg: result.data.msg });
        dispatch({ type: 'err', err: { err: false, msg: result.data.msg } });

        localStorage.setItem('token', result.data.token);
        setData({
          userName: result.data.userName,
          type: result.data.type,
          msg: result.data.msg,
        });
        setTimeout(() => {
          setisLoading(false);
          // setAuth(result.data.auth);
          dispatch({ type: 'authStatus', auth: true });
        }, 2000);
      }).catch((err) => {
        setisLoading(false);
        // setError({ err: true, msg: err.response.data.msg });
        dispatch({ type: 'err', err: { err: true, msg: err.response.data.msg } });
      });
    };

    return fetchData();
  }

  function handleOnChangeInput(e:any) {
    console.log(auth);

    if (!auth) {
      setFormData({ userName: '', password: '' });
    }
    setFormData({ ...FormData, [e.target.name]: e.target.value });
    // setError({ err: false, msg: '' });
    dispatch({ type: 'err', err: { err: false, msg: '' } });
  }

  function handleShowPass() {
    setShowPass(!showPass);
  }


  useEffect(() => {
    if (!auth) {
      // setError({ err: true, msg: '' });
      setFormData({ userName: '', password: '' });
    }
    const userToken = localStorage.getItem('token');
    const fetchData = async () => {
      setisLoading(true);
      await Axios.get('/api/admininfo', {
        headers: {
          token: userToken,
        },
      }).then((result) => {
        // setError({ err: false, msg: result.data.msg });
        dispatch({ type: 'err', err: { err: false, msg: result.data.msg } });

        setTimeout(() => {
          // setisLoading(false);
          // setAuth(result.data.auth);
          dispatch({ type: 'authStatus', auth: true });
        }, 3000);
        setData(result.data);
      }).catch((e) => {
        setisLoading(false);
        dispatch({ type: 'authStatus', auth: false });
        // setError({ err: true, msg: e.response.data.msg });
        dispatch({ type: 'err', err: { err: true, msg: e.response.data.msg } });
        console.error(e);
      });
    };
    fetchData();
  }, []);

  useEffect(() => () => {
    console.log('cleaned up');
  }, []);

  if (auth) {
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
              <AdminPanel
                userName={data.userName}
                userType={data.type}
              />
            </Div>
          </Container>
        </Layout>
      </AppTheme>
    );
  }
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
                        onInvalid={(e:any) => e.target.setCustomValidity('نام کاربری را وارد کنید')}
                        onInput={(e:any) => e.target.setCustomValidity('')}
                        required={Error.err}
                        onChange={(e) => handleOnChangeInput(e)}
                      />
                      <TextField
                        label="رمز ورود"
                        name="password"
                        type={showPass ? 'text' : 'password'}
                        helperText=""
                        onInvalid={(e:any) => e.target.setCustomValidity('رمز ورود را وارد کنید')}
                        onInput={(e:any) => e.target.setCustomValidity('')}
                        required={Error.err}
                        onChange={(e) => handleOnChangeInput(e)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => handleShowPass()}
                              >
                                {showPass ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button
                        className={classes.submitButton}
                        disabled={(isLoading || Error.err)}
                        type="submit"
                        variant="outlined"
                      >
                        ورود
                      </Button>
                      <FormHelperText
                        className={clsx(
                          classes.formTextHelper,
                          Error.err ? null : classes.success,
                        )}
                        error={Error.err}
                        variant="outlined"
                      >
                        {Error.msg}
                      </FormHelperText>
                    </RTL>
                  </form>
                  {isLoading
                    ? <Loading className={classes.loading} size={30} />
                    : null}
                </Paper>
              </div>
            </div>
          </Div>
        </Container>
      </Layout>
    </AppTheme>
  );
}

export default Management;
