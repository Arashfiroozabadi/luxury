import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    padding: '5px',
    textAlign: 'left',
  },
  logo: {
    color: 'gold',
    fontSize: '3rem',
  },
});
interface PropsTypes{
    rootClass?:string,
    textClass?: string
}
const Logo = ({ textClass, rootClass }: PropsTypes) => {
  const classes = useStyles();
  return (
    <div
      className={`${classes.root} ${rootClass || null}`}
    >
      <Typography
        variant="h1"
        component="h1"
        className={`${classes.logo} ${textClass || null}`}
        gutterBottom
      >
        Luxury
      </Typography>
    </div>
  );
};

export default Logo;
