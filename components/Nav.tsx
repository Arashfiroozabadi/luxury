/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
// import Head from 'next/head';
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
  Switch,
  Tooltip,
  // Slide
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

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
  const dispatch = useDispatch();
  // eslint-disable-next-line no-shadow
  const theme = useSelector((state:State) => state.theme);
  function handleOpen() {
    setOpen(!open);
  }
  function handleClose() {
    setOpen(false);
  }
  const handleChangeTheme = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);

    dispatch({ type: 'changeTheme', theme: !theme });
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
                  <Switch
                    onChange={handleChangeTheme}
                    value={theme ? 'dark' : 'light'}
                    color="primary"
                  />
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
        onClose={
                    () => handleClose()
                }
      >
        <div>
          <List>
            <Link href="/" passHref>
              <ListItem component="a" button>
                <div>
                  <Logo
                    textClass={classes.logoList}
                  />
                </div>
              </ListItem>
            </Link>
            <Link href="/production" passHref>
              <ListItem component="a" button>
                محصولات
              </ListItem>
            </Link>
            <Link href="/upload" passHref>
              <ListItem component="a" button>
                upload
              </ListItem>
            </Link>
            <Link href="/management" passHref>
              <ListItem component="a" button>
                مدیریت
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default Nav;
