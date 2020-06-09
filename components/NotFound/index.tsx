// eslint-disable-next-line no-unused-vars
import React, { ReactNode } from 'react';
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


import { Typography, Box } from '@material-ui/core';
import { Div } from '..';


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '45%',
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '20px 0px',
    },
  },
  imgBox: {
    position: 'relative',
  },
  img: {
    width: '100%',
    height: '400px',
    borderRadius: 4,
    backgroundSize: '100% 100%',
    backgroundImage: 'url(../../static/img/404.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    [theme.breakpoints.down('sm')]: {
      height: '350px',
    },
  },
  imgCaption: {
    top: 0,
    color: 'gold',
    width: '100%',
    height: '100%',
    display: 'flex',
    fontSize: '1.5rem',
    position: 'absolute',
    alignItems: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    backgroundColor: '#00000082',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
}));


interface PropsType {
    children?: ReactNode
}

function NotFound(props:PropsType) {
  const classes = useStyles();
  const { children } = props;
  return (
    <Div
      className={classes.root}
    >
      <div className={classes.imgBox}>
        <div
          className={classes.img}
        />
        <Typography
          variant="subtitle1"
          component="span"
          className={classes.imgCaption}
        >
          <Box>
            ❞
            این جا چیزی پیدا نمی کنی برو یه جا دیگه
            ❝
          </Box>
        </Typography>
      </div>
      {children}
    </Div>
  );
}

export default NotFound;
