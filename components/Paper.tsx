// eslint-disable-next-line no-unused-vars
import React, { ReactNode } from 'react';
import {
// eslint-disable-next-line no-unused-vars
  Paper as Pap, PaperProps, makeStyles, Theme, createStyles,
} from '@material-ui/core';

interface Props extends PaperProps {
    children: ReactNode
}
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    [theme.breakpoints.only('xs')]: {

    },
    color: 'inherit',
    willChange: 'background-color, color',
    backgroundColor: 'inherit',
  },
}));

function Paper(props:Props):JSX.Element {
  const classes = useStyles();
  const { children, className } = props;

  return (
    <Pap
      classes={{
        root: classes.root,
      }}
      className={className || classes.root}
      {...props}
    >
      {children}
    </Pap>
  );
}

export default Paper;
