/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  // eslint-disable-next-line no-unused-vars
  makeStyles, createStyles, Theme,
  Paper, Typography, ListItem,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ListIcon from '@material-ui/icons/List';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import clsx from 'clsx';


import Papeer from '../Div';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    // backgroundColor: theme.palette.background.paper,
    transition: 'background-color 250ms linear , color 250ms linear',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  nav: {
    width: '95%',
    margin: '10px 0px',
    display: 'flex',
    padding: 7,
    alignItems: 'center',
    transition: 'background-color 250ms linear , color 250ms linear',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    width: '20%',
    fontSize: '1rem',
    textAlign: 'center',
    transition: 'background-color 250ms linear,border-radius 250ms linear,color 250ms linear',
    [theme.breakpoints.down('sm')]: {
      width: '30%',
      fontSize: '0.7rem',
    },
    '&:hover': {
      color: 'white',
      borderRadius: 5,
      backgroundColor: '#2196f3',
    },
  },
  aTag: {
    width: '100%',
    color: 'inherit',
    display: 'flex',
    textDecoration: 'none',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      padding: '7px 4px',
      textAlign: 'center',
    },
  },
  active: {
    borderBottom: '1px solid gold',
    backgroundColor: theme.palette.background.default,
  },
  children: {
    width: '100%',
  },
}));


function WithNav(props:any) {
  const classes = useStyles();
  const router = useRouter();
  const { pathname } = router;
  const { children } = props;

  return (
    <Papeer className={classes.root}>
      <Paper
        className={clsx(classes.nav)}
      >
        <Typography
          variant="h6"
          color="textSecondary"
          className={clsx(
            classes.link,
            pathname === '/management/chart' ? classes.active : null,
          )}
        >
          <Link href="/management/chart" passHref>
            <ListItem
              button
              component="a"
              className={classes.aTag}
            >
              <EqualizerIcon />
              <span>
                آمار
              </span>
            </ListItem>
          </Link>
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          className={clsx(
            classes.link,
            pathname === '/management/products' ? classes.active : null,
          )}
        >
          <Link href="/management/products" passHref>
            <ListItem
              button
              component="a"
              className={classes.aTag}
            >
              <ListIcon />
              <span>
                محصولات
              </span>
            </ListItem>
          </Link>
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          className={clsx(
            classes.link,
            pathname === '/management/upload' ? classes.active : null,
          )}
        >
          <Link href="/management/upload" passHref>
            <ListItem
              button
              component="a"
              className={classes.aTag}
            >
              <CloudUploadIcon />
              <span>
                افزودن محصولات
              </span>
            </ListItem>
          </Link>
        </Typography>
      </Paper>
      <div className={classes.children}>
        {children}
      </div>
    </Papeer>
  );
}

export default WithNav;
