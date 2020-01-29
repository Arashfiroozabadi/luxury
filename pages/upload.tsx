import React, {
    useState,
    useEffect
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
    LinearProgress
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';

import Layout from '../components/Layout';
import RTL from '../components/RTL';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
            width: 100
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
                    transform: 'translateY(-10px)',
                }
            }
        },
        close: {
            top: 0,
            right: 0,
            width: '30px',
            color: 'white',
            height: '30px',
            cursor: 'pointer',
            border: ' solid white 1.5px',
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
            fontFamily: 'monospace',
            borderRadius: '50px',
            justifyContent: 'center',
            backgroundColor: 'black',
        },
        bannerForm: {
            bottom: 0,
            display: 'flex',
            position: 'absolute',
            transition: 'transform 0.2s',
            transform: 'translateY(25px)',
        },

        select: {


        },
        sendFormButton: {
            width: '50%',
            marginTop: theme.spacing(1),
        },
        helperText: {
            width: '90%',
            height: 30,
            padding: theme.spacing(1)
        }
    })
)

function Upload() {
    const classes = useStyles()
    const [data, setData] = useState<any | null>({});
    const [load, setLoad] = useState<any | null>({ loaded: 0 });
    const [err, setErr] = useState(false);
    const [form, setForm] = useState<any | null>({
        userName: '',
        pass: '',
        msg: ""
    });
    const [uploadForm, setUpload] = useState<any | null>({
        name: '',
        desc: '',
        cate: '',
        bannerPath: '',
        msg: ""
    });
    const [imgUrl, setImgUrl] = useState<any | null>([])
    const [imgs, setImgs] = useState<any | null>([])
    const [isAuth, setAuth] = useState()
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.post(
                '/api/auth',
            );
            if (result.data.auth === false) { setAuth(false) }
            setData(result.data);
        };
        fetchData();
    }, [isAuth]);

    function handleChange(e: any) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleSend() {
        axios.post('/api/login', {
            form
        }).then((res: any) => {
            setData(res.data)
            setErr(!res.data.auth)
        })
    }

    function handleChangeUpload(e: any) {
        setUpload({ ...uploadForm, [e.target.name]: e.target.value })
    }
    function handleChangeImage(e: any) {
        if (imgs.length >= 7) {
            alert('nemishe dige upload koni')
        } else {
            let i = 0
            setImgUrl([...imgUrl, URL.createObjectURL(e.target.files[i])])
            setImgs([...imgs, e.target.files[i]])
            ++i
            e.target.value = null;
        }
    }

    function handleDelete(i: any) {
        const array = [...imgUrl]
        array.splice(i, 1);
        setImgUrl(array)

        const arrayU = [...imgs]
        arrayU.splice(i, 1);
        setImgs(arrayU)
        if (uploadForm.banner === true) {
            if (uploadForm.bannerPath === i) {
                setUpload({ ...uploadForm, bannerPath: '', banner: false })

            } else if (uploadForm.bannerPath > i) {
                setUpload({ ...uploadForm, bannerPath: uploadForm.bannerPath - 1, banner: true })
            }
        }
    }

    function handleBannerChange(i: any) {
        if (uploadForm.bannerPath === i) {
            setUpload({ ...uploadForm, bannerPath: '', banner: false })
        } else {
            setUpload({ ...uploadForm, bannerPath: i, banner: true })
        }
    }

    function handleSendFile() {
        const file = new FormData()
        file.append('name', uploadForm.name)
        file.append('desc', uploadForm.desc)
        file.append('cate', uploadForm.cate)
        for (let i = 0; i < imgs.length; i++) {
            file.append("file", imgs[i]);
        }
        axios.post('/api/upload',

            file,
            {
                onUploadProgress: ProgressEvent => {
                    setLoad({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                },
            }
        ).then((res: any) => {
            setData(res.data)
        }).catch(
            (err: any) => {
                if (err.response) {
                    console.log(err)
                }
                console.log(err)
            }
        )
    }
    const cate = [
        {
            value: 'راحتی',
            label: 'راحتی',
        },
        {
            value: 'راحتی ال',
            label: 'راحتی ال',
        },
        {
            value: 'سرویس خواب',
            label: 'سرویس خواب',
        },
        {
            value: 'نهار خوری',
            label: 'نهار خوری',
        },
        {
            value: 'آینه کنسول',
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
                                        name='name'
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
                                        {cate.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        className={clsx(classes.textField, classes.dense)}
                                        name='desc'
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
                                        name='file'
                                        onChange={(e) => handleChangeImage(e)}
                                        type="file"
                                        inputProps={{
                                            className: classes.inputFiles,
                                            multiple: true,
                                            encType: "multipart/form-data"
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
                                        {
                                            imgUrl.map((d: any, i: any) => (
                                                <div
                                                    key={i}
                                                    className={classes.img}
                                                >
                                                    <img
                                                        src={d}
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
                                                            uploadForm.bannerPath === i ?
                                                                {
                                                                    color: 'green',
                                                                    transform: 'translateY(-10px)'
                                                                }
                                                                :
                                                                {
                                                                    color: 'black'
                                                                }
                                                        }
                                                    >
                                                        <input
                                                            className={clsx('select', classes.select)}
                                                            // onClick={(e) => handleBanner(e, i)}
                                                            onChange={() => handleBannerChange(i)}
                                                            type="checkbox"
                                                            id={`banner${i}`}
                                                            checked={uploadForm.bannerPath === i ?
                                                                true
                                                                :
                                                                false
                                                            }
                                                        />
                                                        <label htmlFor={`banner${i}`}>
                                                            {
                                                                uploadForm.bannerPath === i ? 'انتخاب شده برای بنر' : 'اضافه کردن به بنر'
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                            ))
                                        }
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
                                        style={data.status === 'err' ?
                                            {
                                                color: 'red'
                                            }
                                            :
                                            {
                                                color: 'green'
                                            }
                                        }
                                    >
                                        {data.msg}
                                    </FormHelperText>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </RTL>
            </Layout >
        )
    } else
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
                                        name='userName'
                                        label="نام کاربری"
                                        onChange={(e) => handleChange(e)}
                                        type="text"
                                        margin="dense"
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={clsx(classes.textField, classes.dense)}
                                        name='pass'
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
        )
}

export default Upload