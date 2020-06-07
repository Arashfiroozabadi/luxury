import React from 'react';
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles } from '@material-ui/core/styles';

import {
  Card, CardContent, Typography, Box,
} from '@material-ui/core';
// eslint-disable-next-line no-unused-vars
import { FetchData } from '../interface';
import AppTheme from './theme';
import ProductCaro from './ProductCaro';


const useStyles = makeStyles((theme: any) => createStyles({
  root: {
    flexGrow: 1,
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  card: {
    width: '100%',
    boxShadow: theme.shadows['0'],
    backgroundColor: theme.palette.background.default,
    transition: 'background-color 250ms linear , color 250ms linear',
  },
  cardContentRoot: {
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      padding: 0,
    },
  },
  mainContent: {
    display: 'flex',
    justifyContent: 'space-evenly',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  texts: {
    width: '30%',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      marginTop: 20,
      padding: theme.spacing(2.5),
    },
  },
}));

function Product(props:FetchData) {
  const classes = useStyles();
  const { title, path, description } = props;
  return (
    <AppTheme>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
          >
            <Box>
              {`مدل ${title}`}
            </Box>
          </Typography>
        </CardContent>
        <CardContent className={classes.cardContentRoot}>
          {path ? (
            <div
              className={classes.mainContent}
            >
              <div
                className={classes.texts}
              >
                <Typography
                  variant="subtitle1"
                  component="h5"
                  gutterBottom
                >
                  <Box textAlign="justify">
                    {description}
                  </Box>
                </Typography>
              </div>
              <ProductCaro
                path={path}
              />
            </div>
          )
            : null}
        </CardContent>
      </Card>
    </AppTheme>
  );
}

export default Product;
