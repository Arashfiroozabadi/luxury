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
  Paper,
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

import Layout from '../components/Layout';
import RTL from '../components/RTL';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
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
}));

function Upload() {
  const classes = useStyles();
  const [data, setData] = useState<any | null>({});
  const [load, setLoad] = useState<any | null>({ loaded: 0 });
  const [err, setErr] = useState(false);
  const [form, setForm] = useState<any | null>({
    userName: '',
    pass: '',
    msg: '',
  });
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
  const [isAuth, setAuth] = useState<boolean | null>();
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
    }).catch(
      (Err: any) => {
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
      value: 'rahatil',
      label: 'راحتی ال',
    },
    {
      value: 'servicekhab',
      label: 'سرویس خواب',
    },
    {
      value: 'naharkhori',
      label: 'نهار خوری',
    },
    {
      value: 'console',
      label: 'آینه کنسول',
    },
  ];

  if (data.auth === true) {
    return (
      <Layout>
        <RTL>
          <Container>
            <Paper>
              <Grid
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
                  xs={4}
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
                  xs={6}
                >
                  <TextField
                    className={clsx(classes.textField, classes.dense)}
                    name="file"
                    onChange={(e) => handleChangeImage(e)}
                    type="file"
                    inputProps={{
                      className: classes.inputFiles,
                      multiple: true,
                      encType: 'multipart/form-data',
                    }}
                    margin="dense"
                    variant="outlined"
                  />
                  <LinearProgress
                    className={classes.progress}
                    variant="determinate"
                    value={load.loaded}
                  />
                  <Box
                    display="flex"
                    flexWrap="wrap"
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
                                                            // onClick={(e) => handleBanner(e, i)}
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
                  <FormHelperText
                    className={classes.helperText}
                    color="red"
                    style={data.status === 'err'
                      ? {
                        color: 'red',
                      }
                      : {
                        color: 'green',
                      }}
                  >
                    {data.msg}
                  </FormHelperText>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </RTL>
      </Layout>
    );
  } return (
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

export default Upload;
