import React from 'react';
import { CircularProgress } from '@material-ui/core';
// eslint-disable-next-line no-unused-vars
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  loading: {

  },
}));
interface Props {
    size: number
    className: string
  }

function Loading({ size, className }:Props) {
  const classes = useStyles();

  return (
    <div className={className}>
      <CircularProgress size={size} className={classes.loading} />
    </div>
  );
}

export default Loading;
