import React, {
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import clsx from 'clsx';
import {
  TextField,
  Button,
  Grid,
  FormHelperText,
  Typography,
  Container,
  Box,
  IconButton,
} from '@material-ui/core';
import {
  // eslint-disable-next-line no-unused-vars
  makeStyles, createStyles, Theme,
} from '@material-ui/core/styles';

import Link from 'next/link';
import { Assessment } from '@material-ui/icons';
import { Paper } from '../../components';
import AppTheme from '../../components/theme';
import Layout from '../../components/Layout';
import RTL from '../../components/RTL';
import Div from '../../components/Div';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  rootTab: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    transition: 'background-color 250ms linear , color 250ms linear',
  },
  containerDiv: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  linkBox: {
    color: 'white',
    flex: 0.4,
    margin: theme.spacing(1),
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(51deg, rgba(0,255,248,1) 0%, rgba(0,215,255,1) 31%, rgba(176,143,184,1) 82%)',
  },
  linkIcons: {
    color: 'white',
    fontSize: '4em',
  },
  uploadRoot: {

  },
  loginRoot: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  formTitle: {
    width: '80%',
  },
  textField: {
    width: '80%',
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  inputFiles: {
    width: 100,
  },
  sendButton: {
    width: '40%',
    marginTop: theme.spacing(1),
  },
  formFooter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  progress: {
    width: '80%',
    marginBottom: theme.spacing(1),
  },
  img: {
    width: '30%',
    margin: 2.5,
    height: 'auto',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    '& img': {
      width: '100%',
      height: 'auto',
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows['6'],
    },
    '&:hover': {
      '& .bannerForm': {
        transform: 'translateY(0px)',
      },
    },
  },
  close: {
    top: 0,
    right: 0,
    width: '30px',
    color: 'gold',
    margin: 5,
    height: '30px',
    cursor: 'pointer',
    border: ' solid white 1.5px',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    fontFamily: 'monospace',
    borderRadius: '50px',
    justifyContent: 'center',
    backgroundColor: '#171717cc',
  },
  bannerForm: {
    width: '100%',
    bottom: 0,
    display: 'flex',
    padding: '10px 0px',
    position: 'absolute',
    transform: 'translateY(40px)',
    alignItems: 'center',
    transition: 'transform 0.2s',
    justifyContent: 'center',
    backgroundColor: '#171717cc',
  },

  select: {

  },
  checkBoxLabel: {
    fontSize: 12,
  },
  sendFormButton: {
    width: '50%',
    marginTop: theme.spacing(1),
  },
  helperText: {
    width: '90%',
    height: 30,
    padding: theme.spacing(1),
  },
  testT: {
    color: 'black',
    backgroundColor: theme.palette.background.paper,
  },
}));

function Management() {
  const classes = useStyles();
  const [data, setData] = useState<any | null>({});
  const [form, setForm] = useState<any | null>({
    userName: '',
    pass: '',
    msg: '',
  });
  const [isAuth, setAuth] = useState<any | null>({});
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(
        '/api/auth',
      );
      if (result.data.auth === false) { setAuth(false); }
      setData(result.data);
    };
    fetchData();
  }, [isAuth]);

  useEffect(() => () => {
    console.log('cleaned up');
  }, []);

  console.log(data);


  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSend() {
    axios.post('/api/login', {
      form,
    }).then((res: any) => {
      setData(res.data);
      setErr(!res.data.auth);
    });
  }

  if (data.auth === true) {
    return (
      <AppTheme>
        <Layout>
          <Container>
            <Div className={classes.rootTab}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
              >
                <Box>
                  پنل مدریت
                </Box>
              </Typography>
              <div className={classes.containerDiv}>
                <Paper className={classes.linkBox}>
                  <>
                    <Link href="/management/chart" passHref>
                      <IconButton>
                        <Assessment
                          className={classes.linkIcons}
                        />
                      </IconButton>
                    </Link>
                    <Typography
                      variant="h6"
                      component="h5"
                    >
                      <Box>
                        آمار
                      </Box>
                    </Typography>
                  </>
                </Paper>
                <Paper className={classes.linkBox}>
                  <>
                    <Link href="/management/product" passHref>
                      <IconButton>
                        <Assessment className={classes.linkIcons} />
                      </IconButton>
                    </Link>
                    <Typography
                      variant="h6"
                      component="h5"
                    >
                      <Box>
                        آمار
                      </Box>
                    </Typography>
                  </>
                </Paper>
              </div>
            </Div>
          </Container>
        </Layout>
      </AppTheme>
    );
  }
  return (
    <Layout>
      <RTL>
        <Container>
          <Grid
            container
            justify="center"
          >
            <Grid
              item
              xs={3}
            >
              <Paper
                className={classes.loginRoot}
                elevation={8}
              >
                <Typography
                  variant="h5"
                  component="h6"
                  className={classes.formTitle}
                >
                  ورود
                </Typography>
                <TextField
                  className={clsx(classes.textField, classes.dense)}
                  name="userName"
                  label="نام کاربری"
                  onChange={(e) => handleChange(e)}
                  type="text"
                  margin="dense"
                  variant="outlined"
                />
                <TextField
                  className={clsx(classes.textField, classes.dense)}
                  name="pass"
                  label="رمزعبور"
                  onChange={(e) => handleChange(e)}
                  type="text"
                  margin="dense"
                  variant="outlined"
                />
                <Button
                  className={classes.sendButton}
                  onClick={() => handleSend()}
                  color="primary"
                  variant="contained"
                >
                  ارسال
                </Button>
                <FormHelperText
                  className={classes.helperText}
                  error={err}
                >
                  {data.msg}
                </FormHelperText>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </RTL>
    </Layout>
  );
}

export default Management;
