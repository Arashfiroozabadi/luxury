import React, {
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import clsx from 'clsx';
import {
  TextField,
  AppBar,
  Tabs,
  Tab,
  Button,
  Paper,
  Grid,
  FormHelperText,
  Typography,
  Container,
} from '@material-ui/core';
// eslint-disable-next-line no-unused-vars
import {
  // eslint-disable-next-line no-unused-vars
  makeStyles, createStyles, Theme,
} from '@material-ui/core/styles';
// import {
//   useSelector,
//   // useDispatch,
// } from 'react-redux';

import AllProducts from '../../components/management/AllProducts';
import AppTheme from '../../components/theme';

import Layout from '../../components/Layout';
import RTL from '../../components/RTL';
import Overview from '../../components/overview';
import TabPanel from '../../components/tabPanel';

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  rootTab: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    transition: 'background-color 250ms linear , color 250ms linear',
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
  const [value, setValue] = React.useState(0);
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

  const handleChangeTab = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
            <div className={classes.rootTab}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChangeTab}
                  variant="scrollable"
                  scrollButtons="on"
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="scrollable force tabs example"
                >
                  <Tab label="آمار" {...a11yProps(0)} />
                  <Tab label="محصولات" {...a11yProps(1)} />
                  {/* <Tab label="Item Three" {...a11yProps(2)} />
                  <Tab label="Item Four" {...a11yProps(3)} />
                  <Tab label="Item Five" {...a11yProps(4)} />
                  <Tab label="Item Six" {...a11yProps(5)} />
                  <Tab label="Item Seven" {...a11yProps(6)} /> */}
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <Overview />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <AllProducts />
              </TabPanel>
              {/* <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={3}>
                Item Four
              </TabPanel>
              <TabPanel value={value} index={4}>
                Item Five
              </TabPanel>
              <TabPanel value={value} index={5}>
                Item Six
              </TabPanel>
              <TabPanel value={value} index={6}>
                Item Seven
              </TabPanel> */}
            </div>
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
