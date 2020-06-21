/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar, Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  useScrollTrigger,
  Slide,
  Tooltip,
  Collapse,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from '@material-ui/core';
import clsx from 'clsx';
// eslint-disable-next-line import/no-unresolved, no-unused-vars
import { TransitionProps } from '@material-ui/core/transitions';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Brightness4 from '@material-ui/icons/Brightness4';
import Brightness7 from '@material-ui/icons/Brightness7';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import StopIcon from '@material-ui/icons/Stop';
import SearchIcon from '@material-ui/icons/Search';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';

import Axios from 'axios';
import Logo from './Logo';
import ColorCate from './ColorCate';
import Loading from './loading';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    transition: 'background-color 250ms linear',
  },
  drawer: {
    overflowY: 'inherit',
  },
  rootDrawer: {
    width: 240,
    height: '100%',
    overflow: 'auto',
    direction: 'ltr',
  },
  list: {
    height: '100%',
    display: 'flex',
    direction: 'rtl',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logo: {
    textDecoration: 'none',
  },
  navList: {
    width: '100%',
    display: 'flex',
    listStyle: 'none',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    '& li': {
      '& a': {
        textDecoration: 'none',
      },
    },
  },
  link: {

  },
  collaoseMenuText: {
    textAlign: 'right',
    transition: 'background 200ms',
    '&:hover': {
      backgroundColor: 'gray',
    },
  },
  listHeaderText: {
    display: 'flex',
    fontSize: '0.8rem',
    alignItems: 'center',
  },
  linkHover: {
    transition: 'color 200ms, padding 200ms',
    '&:hover': {
      color: '#105dea',
      transition: 'color 200ms, padding 200ms',
      paddingRight: 50,
      backgroundColor: theme.palette.background.default,
    },
  },
  linIconkHover: {
    transition: 'color 200ms, padding 200ms',
    '&:hover': {
      color: '#105dea',
      transition: 'color 200ms, padding 200ms',
      paddingRight: 40,
      backgroundColor: theme.palette.background.default,
    },
  },
  linkText: {
    marginTop: 3,
  },
  linkIcon: {
    marginLeft: 10,
  },
  subLink: {
    fontSize: '0.7rem',
    fontFamily: 'Vazir',
    paddingRight: theme.spacing(4),
  },
  subLinkIcon: {
    fontSize: '0.7rem',
  },
  menuButton: {
    // color: theme.palette.secondary.dark,
    transition: 'color 250ms linear',
  },
  toolBar: {
    justifyContent: 'space-between',
  },
  rightSide: {
    display: 'flex',
    alignItems: 'center',
  },
  logoList: {
    fontSize: 20,
  },
  offSet: {
    minHeight: 25,
    [theme.breakpoints.only('xs')]: {
      minHeight: 40,
    },
  },
  active: {
    backgroundColor: theme.palette.background.default,
    borderBottom: '1px solid gold',
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
interface Props {
    children: React.ReactElement;
}
interface State {
    theme:boolean
}
function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: false,
    threshold: 150,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 2,
    direction: 'down',
    appear: false,
    in: !trigger,
  });
}

function Nav(props: any) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCate, setOpenCate] = useState(true);
  const [openModal, setopenModal] = useState<boolean>(false);
  const [isloading, setisloading] = useState<boolean>(false);
  const router = useRouter();
  const { pathname } = router;

  const dispatch = useDispatch();
  // eslint-disable-next-line no-shadow
  const theme = useSelector((state:State) => state.theme);
  const auth = useSelector((state:any) => state.auth);
  const loginForm = useSelector((state:any) => state.loginForm);

  function handleOpen() {
    setOpen(!open);
  }
  function handleClose() {
    setOpen(false);
  }
  const handleChangeTheme = () => {
    localStorage.setItem('theme', `${!theme}`);
    dispatch({ type: 'changeTheme', theme: !theme });
  };
  const handleOpenCate = () => {
    setOpenCate(!openCate);
  };
  const handleClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleOpenModal = () => {
    setopenModal(true);
  };
  const handleLogout = async () => {
    const tokenKey = localStorage.getItem('token');
    setisloading(true);
    await Axios.get('/api/logout', {
      headers: { token: tokenKey },
    }).then((result:any) => {
      localStorage.setItem('token', result.data.token);
    });
    await setTimeout(() => {
      setisloading(false);
      setopenModal(false);
      setOpen(false);
      dispatch({ type: 'authStatus', auth: false });
      dispatch({ type: 'err', err: { err: true, msg: '' } });
      dispatch({ type: 'login', loginForm: { userName: '', password: '' } });
    }, 2000);
  };
  const handleNo = () => {
    setopenModal(false);
    setOpen(false);
  };
  return (
    <div
      className={classes.root}
    >
      {/* <Head>
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                <meta name='description' content='Description' />
                <meta name='keywords' content='Keywords' />
                <title>Next.js PWA Example</title>

                <link rel='manifest' href='/manifest.json' />
                <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
                <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
                <link rel='apple-touch-icon' href='/apple-icon.png'></link>
                <meta name='theme-color' content='#317EFB' />
            </Head> */}
      <HideOnScroll>
        <Slide
          timeout={{
            enter: 200,
            exit: 750,
          }}
          {...props}
        >
          <AppBar
            position="fixed"
            color="default"
            className={classes.appBar}
          >
            <Toolbar
              className={classes.toolBar}
            >
              <div className={classes.rightSide}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={() => handleOpen()}
                >
                  <MenuIcon
                    fontSize="large"
                  />
                </IconButton>
                <Tooltip
                  placement="top"
                  title="زمینه"
                >
                  <IconButton
                    onClick={handleChangeTheme}
                  >
                    {theme ? <Brightness4 /> : <Brightness7 />}
                  </IconButton>
                </Tooltip>
              </div>
              <Typography
                variant="h6"
              >
                <Link href="/">
                  <a
                    className={classes.logo}
                  >
                    <Logo />
                  </a>
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
        </Slide>
      </HideOnScroll>
      <Toolbar />
      <Toolbar className={classes.offSet} />
      <Drawer
        open={open}
        anchor="left"
        classes={{
          paper: classes.drawer,
        }}
        onClose={() => handleClose()}
      >
        <div className={classes.rootDrawer}>
          <List className={classes.list}>
            <div>
              <Link href="/" passHref>
                <ListItem component="a" button>
                  <div>
                    <Logo
                      textClass={classes.logoList}
                    />
                  </div>
                </ListItem>
              </Link>
              <ListItem
                className={classes.collaoseMenuText}
                button
                onClick={handleOpenCate}
              >
                <ListItemText
                  classes={{
                    primary: classes.listHeaderText,
                  }}
                >
                  <ViewComfyIcon className={classes.linkIcon} />
                  دسته بندی محصولات
                </ListItemText>
                {openCate ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openCate} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link href="/production" passHref>
                    <ListItem
                      className={
                        clsx(classes.subLink, classes.linkHover, pathname === '/production' ? classes.active : null)
                      }
                      component="a"
                      button
                    >
                      لیست دسته بندی‌ها
                    </ListItem>
                  </Link>
                  <Link href="/production/rahati" passHref>
                    <ListItem
                      className={
                        clsx(classes.subLink, classes.linkHover, pathname === '/production/rahati' ? classes.active : null)
                      }
                      component="a"
                      button
                    >
                      <StopIcon
                        className={classes.subLinkIcon}
                        style={{
                          color: ColorCate('rahati'),
                        }}
                      />
                      محصولات راحتی
                    </ListItem>
                  </Link>
                  <Link href="/production/rahati-l" passHref>
                    <ListItem
                      className={
                        clsx(classes.subLink, classes.linkHover, pathname === '/production/rahati-l' ? classes.active : null)
                      }
                      component="a"
                      button
                    >
                      <StopIcon
                        className={classes.subLinkIcon}
                        style={{
                          color: ColorCate('rahatil'),
                        }}
                      />
                      محصولات راحتی ال
                    </ListItem>
                  </Link>
                  <Link href="/production/service-khab" passHref>
                    <ListItem
                      className={
                        clsx(classes.subLink, classes.linkHover, pathname === '/production/service-khab' ? classes.active : null)
                      }
                      component="a"
                      button
                    >
                      <StopIcon
                        className={classes.subLinkIcon}
                        style={{
                          color: ColorCate('servicekhab'),
                        }}
                      />
                      محصولات سرویس خواب
                    </ListItem>
                  </Link>
                  <Link href="/production/nahar-khori" passHref>
                    <ListItem
                      className={
                        clsx(classes.subLink, classes.linkHover, pathname === '/production/nahar-khori' ? classes.active : null)
                      }
                      component="a"
                      button
                    >
                      <StopIcon
                        className={classes.subLinkIcon}
                        style={{
                          color: ColorCate('naharkhori'),
                        }}
                      />
                      محصولات نهار خوری
                    </ListItem>
                  </Link>
                  <Link href="/production/console" passHref>
                    <ListItem
                      className={
                        clsx(classes.subLink, classes.linkHover, pathname === '/production/console' ? classes.active : null)
                      }
                      component="a"
                      button
                    >
                      <StopIcon
                        className={classes.subLinkIcon}
                        style={{
                          color: ColorCate('console'),
                        }}
                      />
                      محصولات آینه کنسول
                    </ListItem>
                  </Link>
                </List>
              </Collapse>
              <Link href="/search" passHref>
                <ListItem
                  className={
                        clsx(classes.link, classes.linkHover, pathname === '/search' ? classes.active : null)
                      }
                  component="a"
                  button
                >
                  <SearchIcon className={classes.linkIcon} />
                  جستوجو
                </ListItem>
              </Link>
            </div>
            <div>
              <ListItem
                className={classes.collaoseMenuText}
                button
                onClick={handleClick}
              >
                <ListItemText primary="مدیریت" />
                {openMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openMenu} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link href="/management" passHref>
                    <ListItem
                      className={
                      clsx(classes.subLink, classes.linIconkHover, pathname === '/management' ? classes.active : null)
                    }
                      component="a"
                      button
                    >
                      <ScatterPlotIcon className={classes.linkIcon} />
                      <span className={classes.linkText}>
                        پنل مدیریت
                      </span>
                    </ListItem>
                  </Link>
                  {auth ? (
                    <Box
                      textAlign="center"
                      margin="15px 0px"
                    >
                      <Button
                        variant="outlined"
                        onClick={handleOpenModal}
                      >
                        خروج از حساب کاربری
                      </Button>
                    </Box>

                  )
                    : null}
                </List>
              </Collapse>
              <Dialog
                open={openModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleNo}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">
                  تایید خروج از حساب
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <span className={classes.dialogUserName}>
                      {loginForm.userName}
                    </span>
                    {' آیا تایید میکنید که از این حساب کاربری خارج شوید'}
                  </DialogContentText>
                  {isloading ? <Loading className={classes.loading} size={30} /> : null}
                </DialogContent>
                <DialogActions>
                  <Button
                    disabled={isloading}
                    onClick={handleLogout}
                  >
                    بله
                  </Button>
                  <Button onClick={handleNo}>
                    خیر
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default Nav;
