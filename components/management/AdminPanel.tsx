import React, { useState, useEffect } from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  makeStyles, Theme, createStyles,
  Paper, Typography, Box, Button, List, ListItem,
  Avatar, Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';
// eslint-disable-next-line import/no-unresolved, no-unused-vars
import { TransitionProps } from '@material-ui/core/transitions';
import Link from 'next/link';
import clsx from 'clsx';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ListIcon from '@material-ui/icons/List';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import {
  useDispatch, useSelector,
} from 'react-redux';
import Axios from 'axios';
import Loading from '../loading';

const useStyles = makeStyles((theme:Theme) => createStyles({
  root: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexDirection: 'column',
    },
  },
  adminInfo: {
    flex: 0.5,
    display: 'flex',
    padding: '5px 10px',
    marginLeft: 2.5,
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      flex: 1,
      margin: '5px 0px',
      flexDirection: 'row',
      justifyContent: 'space-between',

    },
  },
  avatar: {
    textAlign: 'center',
    padding: '5px 20px',
    position: 'relative',
    boxShadow: theme.shadows[4],
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      borderRadius: 50,
      boxShadow: theme.shadows[0],
    },
  },
  avatarImg: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  },
  userName: {
    position: 'relative',
  },
  userType: {
    margin: '10px 0px',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  logout: {

  },
  listContainer: {
    flex: 2,
    display: 'flex',
    alignItems: 'center',
    marginRight: 2.5,
    [theme.breakpoints.down('sm')]: {
      flex: 1,
      flexDirection: 'row',
    },
  },
  listItems: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      flex: 1,
      // flexDirection: 'column',
    },
  },
  link: {
    width: '25%',
    margin: '5px 10px',
    display: 'flex',
    fontSize: '0.7rem',
    fontFamily: 'Vazir',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      margin: '5px 5px',
      border: '1px solid',
      borderRadius: 4,
      justifyContent: 'space-between',
    },
  },
  linkHover: {
    transition: 'background-color 250ms linear,border-radius 250ms linear,color 250ms linear',
    '&:hover': {
      color: 'white',
      borderRadius: 10,
      backgroundColor: '#2196f3',
    },
  },
  linkIcon: {

  },
  linkText: {

  },
  dialogUserName: {
    color: '#218fde',
  },
  loading: {
    margin: 10,
    textAlign: 'center',
  },
}));
const Transition = React.forwardRef((
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);
interface PropsType{
    userName:string
    userType:string
}

function AdminPanel(props:PropsType) {
  const classes = useStyles();
  const { userName, userType } = props;
  const [open, setopen] = useState<boolean>(false);
  const [isloading, setisloading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const loginForm = useSelector((state:any) => state.loginForm);
  const handleLogout = () => {
    setopen(true);
  };
  const handleYes = async () => {
    const tokenKey = localStorage.getItem('token');
    setisloading(true);
    await Axios.get('/api/logout', {
      headers: { token: tokenKey },
    }).then((result:any) => {
      localStorage.setItem('token', result.data.token);
    });
    await setTimeout(() => {
      setisloading(true);
      dispatch({ type: 'authStatus', auth: false });
      dispatch({ type: 'err', err: { err: true, msg: '' } });
      dispatch({ type: 'login', loginForm: { ...loginForm, password: '' } });
    }, 2000);
  };
  const handleNo = () => {
    setopen(false);
  };

  useEffect(() => () => {
    console.log('cleaned up');
  }, []);

  return (
    <div
      className={classes.root}
    >
      <Paper className={classes.adminInfo}>
        <div className={classes.avatar}>
          <Avatar
            className={classes.avatarImg}
            src="data:image/jpeg;base64,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"
            alt={userName}
            title={userName}
            variant="circle"
          />
          <Typography
            variant="caption"
            component="p"
            className={classes.userName}
          >
            <Box component="span">
              {userName}
            </Box>
          </Typography>
        </div>
        <Typography
          variant="subtitle1"
          component="p"
          className={classes.userType}
        >
          <Box textAlign="center" component="span">
            {userType === 'admin' ? 'مدیر سایت' : null}
          </Box>
        </Typography>
        <Button
          size="small"
          className={classes.logout}
          variant="outlined"
          onClick={handleLogout}
        >
          خروج از حساب کاربری
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={handleNo}
          keepMounted
        >
          <DialogTitle>
            تایید خروج از حساب
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <span className={classes.dialogUserName}>
                {userName}
              </span>
              {' آیا تایید میکنید که از این حساب کاربری خارج شوید'}
            </DialogContentText>
            {isloading ? <Loading className={classes.loading} size={30} /> : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleYes}>
              بله
            </Button>
            <Button onClick={handleNo}>
              خیر
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
      <Paper className={classes.listContainer}>
        <List className={classes.listItems}>
          <Link href="/management/chart" passHref>
            <ListItem
              className={clsx(classes.link, classes.linkHover)}
              component="a"
              button
            >
              <EqualizerIcon className={classes.linkIcon} />
              <span className={classes.linkText}>
                آمار
              </span>
            </ListItem>
          </Link>
          <Link href="/management/products" passHref>
            <ListItem
              className={clsx(classes.link, classes.linkHover)}
              component="a"
              button
            >
              <ListIcon
                className={classes.linkIcon}
                style={{
                  transform: 'rotate(180deg)',
                }}
              />
              <span className={classes.linkText}>
                لیست محصولات
              </span>
            </ListItem>
          </Link>
          <Link href="/upload" passHref>
            <ListItem
              className={clsx(classes.link, classes.linkHover)}
              component="a"
              button
            >
              <CloudUploadIcon
                className={classes.linkIcon}
              />
              <span className={classes.linkText}>
                افزودن محصول
              </span>
            </ListItem>
          </Link>

        </List>
      </Paper>
    </div>
  );
}

export default AdminPanel;
