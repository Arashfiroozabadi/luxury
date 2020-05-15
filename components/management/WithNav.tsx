/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  // eslint-disable-next-line no-unused-vars
  makeStyles, createStyles, Theme,
  Paper, Typography,
} from '@material-ui/core';
import clsx from 'clsx';


import Papeer from '../Paper';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    transition: 'background-color 250ms linear , color 250ms linear',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  link: {
    width: '100%',
    textAlign: 'center',
  },
  aTag: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  active: {
    borderBottom: '1px solid blue',
  },
}));


function WithNav(props:any) {
  const classes = useStyles();
  const router = useRouter();
  const { pathname } = router;
  const { children } = props;

  return (
    <Papeer>
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
          <Link href="/management/chart">
            <a
              className={classes.aTag}
            >
              chart
            </a>
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
          <Link href="/management/products">
            <a
              className={classes.aTag}
            >
              products
            </a>
          </Link>
        </Typography>
      </Paper>
      <div>
        {children}
      </div>
    </Papeer>
  );
}

export default WithNav;
