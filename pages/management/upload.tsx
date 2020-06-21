/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useState,
  useEffect,
} from 'react';
import clsx from 'clsx';
import {
  Box,
  TextField,
  Button,
  Grid,
  FormHelperText,
  Typography,
  Container,
  MenuItem,
  LinearProgress,
} from '@material-ui/core';
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import Router from 'next/router';


import { Warning } from '@material-ui/icons';
import WithNav from '../../components/management/WithNav';
import AppTheme from '../../components/theme';
import Layout from '../../components/Layout';
import RTL from '../../components/RTL';
import Paper from '../../components/Div';
import Loading from '../../components/loading';


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  rootGrid: {
    // backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexDirection: 'column',
    },
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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  inputButtn: {
    display: 'none',
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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  rootImage: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
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
    [theme.breakpoints.down('sm')]: {
      width: '40%',
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
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  loaderClass: {
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15px 2.5px',
    '& > * + *': {
      marginLeft: theme.spacing(2),
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

function Upload() {
  const classes = useStyles();
  const [data, setData] = useState<any | null>({});
  const [load, setLoad] = useState<any | null>({ loaded: 0 });
  const [uploadForm, setUpload] = useState<any | null>({
    name: '',
    desc: '',
    cate: '',
    banner: false,
    bannerPath: '',
    msg: '',
  });
  const [imgUrl, setImgUrl] = useState<any | null>([]);
  const [imgs, setImgs] = useState<any | null>([]);
  // const [isAuth, setAuth] = useState<boolean | null>();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state:any) => state.auth);

  useEffect(() => {
    const tokenKey = localStorage.getItem('token');

    const fetchData = async () => {
      setIsLoading(true);
      await axios.get(
        '/api/admininfo',
        {
          headers: {
            token: tokenKey,
          },
        },
      ).then((result:any) => {
        dispatch({ type: 'authStatus', auth: true });
        setData(result.data);
        setIsLoading(false);
      }).catch((error:any) => {
        setIsLoading(false);
        dispatch({ type: 'authStatus', auth: false });
        console.error(error);
      });
    };
    fetchData();
  }, []);

  useEffect(() => () => {
    console.log('cleaned up');
  }, []);

  function handleChangeUpload(e: any) {
    setUpload({ ...uploadForm, [e.target.name]: e.target.value });
  }
  function handleChangeImage(e: any) {
    if (imgs.length >= 7) {
      // eslint-disable-next-line no-alert
      alert('nemishe dige upload koni');
    } else {
      let i = 0;
      setImgUrl([...imgUrl, URL.createObjectURL(e.target.files[i])]);
      setImgs([...imgs, e.target.files[i]]);
      i += 1;
      e.target.value = null;
    }
  }

  function handleDelete(i: any) {
    const array = [...imgUrl];
    array.splice(i, 1);
    setImgUrl(array);

    const arrayU = [...imgs];
    arrayU.splice(i, 1);
    setImgs(arrayU);
    if (uploadForm.banner === true) {
      if (uploadForm.bannerPath === i) {
        setUpload({ ...uploadForm, bannerPath: '', banner: false });
      } else if (uploadForm.bannerPath > i) {
        setUpload({ ...uploadForm, bannerPath: uploadForm.bannerPath - 1, banner: true });
      }
    }
  }

  function handleBannerChange(i: any) {
    if (uploadForm.bannerPath === i) {
      setUpload({ ...uploadForm, bannerPath: '', banner: false });
    } else {
      setUpload({ ...uploadForm, bannerPath: i, banner: true });
    }
  }

  const handleGoHome = () => {
    Router.push('/');
  };

  function handleSendFile() {
    const file = new FormData();
    file.append('name', uploadForm.name);
    file.append('desc', uploadForm.desc);
    file.append('cate', uploadForm.cate);
    if (uploadForm.banner === true) {
      file.append('banner', uploadForm.banner);
      file.append('bannerPath', uploadForm.bannerPath);
    }
    for (let i = 0; i < imgs.length; i += 1) {
      file.append('file', imgs[i]);
    }
    setIsLoading(true);
    axios.post('/api/upload',

      file,
      {
        onUploadProgress: (ProgressEvent) => {
          setLoad({
            loaded: ((ProgressEvent.loaded / ProgressEvent.total) * 100),
          });
        },
      }).then((res: any) => {
      setData(res.data);
      setIsLoading(false);
      setLoad({ loaded: 0 });
    }).catch(
      (Err: any) => {
        setIsLoading(false);
        setLoad({ loaded: 0 });
        if (Err.response) {
          console.log(Err);
        }
        console.log(Err);
      },
    );
  }
  const cate = [
    {
      value: 'rahati',
      label: 'راحتی',
    },
    {
      value: 'rahati-l',
      label: 'راحتی ال',
    },
    {
      value: 'service-khab',
      label: 'سرویس خواب',
    },
    {
      value: 'nahar-khori',
      label: 'نهار خوری',
    },
    {
      value: 'console',
      label: 'آینه کنسول',
    },
  ];

  if (auth === true) {
    return (
      <AppTheme>
        <Layout>
          <WithNav>
            <RTL>
              <Container>
                <Paper>
                  <Grid
                    className={classes.rootGrid}
                    container
                    justify="center"
                  >
                    <Grid
                      item
                      xs={12}
                    >
                      <Typography
                        variant="h5"
                        component="h6"
                        className={classes.formTitle}
                      >
                        ارسال اطلاعات محصول
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={12}
                    >
                      <TextField
                        className={clsx(classes.textField, classes.dense)}
                        name="name"
                        label="نام"
                        onChange={(e) => handleChangeUpload(e)}
                        type="text"
                        margin="dense"
                        variant="outlined"
                      />
                      <TextField
                        className={clsx(classes.textField, classes.dense)}
                        select
                        label="انتخاب دسته بندی"
                        name="cate"
                        value={uploadForm.cate}
                        onChange={(e) => handleChangeUpload(e)}
                        margin="dense"
                        variant="outlined"
                      >
                        {cate.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        className={clsx(classes.textField, classes.dense)}
                        name="desc"
                        label="توضیحات"
                        onChange={(e) => handleChangeUpload(e)}
                        type="text"
                        margin="dense"
                        multiline
                        rows="4"
                        rowsMax="6"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        m="15px 0"
                      >
                        <input
                          className={clsx(classes.textField, classes.dense, classes.inputButtn)}
                          name="file"
                          onChange={(e) => handleChangeImage(e)}
                          multiple
                          id="file"
                          accept="image/*"
                          type="file"
                        />
                        <label htmlFor="file">
                          <Button variant="outlined" component="span">
                            انتخاب فایل
                          </Button>
                        </label>
                      </Box>
                      <LinearProgress
                        className={classes.progress}
                        variant="determinate"
                        value={load.loaded}
                      />
                      <Box
                        display="flex"
                        flexWrap="wrap"
                        className={classes.rootImage}
                      >
                        {imgUrl.map((d: any, i: any) => (
                          <div
                            key={d}
                            className={classes.img}
                          >
                            <img
                              src={d}
                              alt=""
                            />
                            <span
                              className={classes.close}
                              onClick={() => handleDelete(i)}
                            >
                              X
                            </span>
                            <div
                              className={clsx('bannerForm', classes.bannerForm)}
                              style={
                              uploadForm.bannerPath === i
                                ? {
                                  color: 'gold',
                                  transform: 'translateY(0px)',
                                }
                                : {
                                  color: 'white',
                                }
                              }
                            >
                              <input
                                className={clsx('select', classes.select)}
                                onChange={() => handleBannerChange(i)}
                                type="checkbox"
                                id={`banner${i}`}
                                checked={uploadForm.bannerPath === i}
                              />
                              <label
                                className={clsx(classes.checkBoxLabel)}
                                htmlFor={`banner${i}`}
                              >
                                {
                                  uploadForm.bannerPath === i ? 'انتخاب شده برای بنر' : 'اضافه کردن به بنر'
                                }
                              </label>
                            </div>
                          </div>
                        ))}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      className={classes.formFooter}
                    >
                      <Button
                        className={classes.sendFormButton}
                        onClick={() => handleSendFile()}
                        color="primary"
                        variant="contained"
                      >
                        ارسال
                      </Button>
                      {
                      isLoading ? <Loading className={classes.loaderClass} size={50} />
                        : (
                          <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            bgcolor={data.status === 'err'
                              ? 'error.main' : 'success.main'}
                            m={1.2}
                            borderRadius={4}
                          >
                            <FormHelperText
                              className={classes.helperText}
                            >
                              {data.msg}
                            </FormHelperText>
                          </Box>
                        )
                    }
                    </Grid>
                  </Grid>
                </Paper>
              </Container>
            </RTL>
          </WithNav>
        </Layout>
      </AppTheme>
    );
  } return (
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
        )
          : null}
      </Layout>
    </AppTheme>
  );
}

export default Upload;
