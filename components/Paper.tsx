import React from 'react';
import {
// eslint-disable-next-line no-unused-vars
  makeStyles, createStyles, Theme, Container,
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

function Papeer(props:any) {
  const classes = useStyles();
  const { children } = props;
  return (
    <AppTheme>
      <Container>
        <div className={classes.root}>
          {children}
        </div>
      </Container>
    </AppTheme>
  );
}

export default Papeer;
