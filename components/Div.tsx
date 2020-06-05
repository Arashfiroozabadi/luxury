import React from 'react';
import {
// eslint-disable-next-line no-unused-vars
  makeStyles, createStyles, Theme,
} from '@material-ui/core';

import AppTheme from './theme';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.background.default,
    transition: 'background-color 250ms linear , color 250ms linear',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
}));

function Div(props:any) {
  const classes = useStyles();
  const { children } = props;
  return (
    <AppTheme>
      <div className={classes.root}>
        {children}
      </div>
    </AppTheme>
  );
}

export default Div;
