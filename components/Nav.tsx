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
} from '@material-ui/core';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Brightness4 from '@material-ui/icons/Brightness4';
import Brightness7 from '@material-ui/icons/Brightness7';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ListIcon from '@material-ui/icons/List';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import StopIcon from '@material-ui/icons/Stop';

import Logo from './Logo';

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
}));
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
  const router = useRouter();
  const { pathname } = router;

  const dispatch = useDispatch();
  // eslint-disable-next-line no-shadow
  const theme = useSelector((state:State) => state.theme);

  function handleOpen() {
    setOpen(!open);
  }
  function handleClose() {
    setOpen(false);
  }
  const handleChangeTheme = () => {
    dispatch({ type: 'changeTheme', theme: !theme });
  };
  const handleOpenCate = () => {
    setOpenCate(!openCate);
  };
  const handleClick = () => {
    setOpenMenu(!openMenu);
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
                      <StopIcon className={classes.subLinkIcon} />
                      محصولات راحتی
                    </ListItem>
                  </Link>
                  <Link href="/production/rahatil" passHref>
                    <ListItem
                      className={
                        clsx(classes.subLink, classes.linkHover, pathname === '/production/rahatil' ? classes.active : null)
                      }
                      component="a"
                      button
                    >
                      <StopIcon className={classes.subLinkIcon} />
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
                      <StopIcon className={classes.subLinkIcon} />
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
                      <StopIcon className={classes.subLinkIcon} />
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
                      <StopIcon className={classes.subLinkIcon} />
                      محصولات آینه کنسول
                    </ListItem>
                  </Link>
                </List>
              </Collapse>
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
                  <Link href="/management/chart" passHref>
                    <ListItem
                      className={
                      clsx(classes.subLink, classes.linIconkHover, pathname === '/management/chart' ? classes.active : null)
                    }
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
                      className={
                      clsx(classes.subLink, classes.linIconkHover, pathname === '/management/products' ? classes.active : null)
                    }
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
                      className={
                      clsx(classes.subLink, classes.linIconkHover, pathname === '/upload' ? classes.active : null)
                    }
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
              </Collapse>
            </div>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default Nav;
