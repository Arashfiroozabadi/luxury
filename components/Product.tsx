/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles } from '@material-ui/core/styles';

import {
  Card, CardContent, Typography, Box,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import Link from 'next/link';

// eslint-disable-next-line no-unused-vars
import { FetchData } from '../interface';
import AppTheme from './theme';
import ProductCaro from './ProductCaro';
import ConvertValue from './ConvertValue';
import ConvertString from './ConvertString';


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
  postDetail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& p': {
      fontSize: 12,
      margin: '0px 5px',
    },
  },
  postDetailCell: {
    display: 'flex',
    alignItems: 'center',
    margin: '0px 2px',
    padding: '3px 6px',
    borderRadius: 4,
  },
  postDetailCellLink: {
    color: theme.palette.textLink.main,
    textDecoration: 'none',
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

function colorCate(cate:string) {
  switch (cate) {
    case 'rahati':
      return '#e8e230';
    case 'rahati-l':
      return '#ec407a';
    case 'service-khab':
      return '#ab47bc';
    case 'nahar-khori':
      return '#01b075';
    case 'console':
      return '#ff5722';
    default:
      return 'white';
  }
}

function Product(props:FetchData) {
  const classes = useStyles();
  const {
    title, path,
    description,
    views, data,
  } = props;
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
          <Box
            className={classes.postDetail}
          >
            <Typography
              variant="caption"
              component="span"
            >
              <Box
                className={classes.postDetailCell}
                style={{
                  backgroundColor: 'gray',
                }}
              >
                <Visibility fontSize="small" />
                {' '}
                <p>
                  {ConvertValue(views !== undefined ? views.length : 0)}
                </p>
              </Box>
            </Typography>
            <Typography
              variant="caption"
              component="span"
            >
              <Box
                className={classes.postDetailCell}
                style={{
                  border: `1px solid ${colorCate(data.category)}`,
                }}
              >
                <Link href={`/production/${data.category}`} passHref>
                  <a className={classes.postDetailCellLink}>
                    { ConvertString(data.category)}
                  </a>
                </Link>
              </Box>
            </Typography>
          </Box>
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
