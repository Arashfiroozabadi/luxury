/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  Theme,
  makeStyles, createStyles,
} from '@material-ui/core/styles';

import Link from 'next/link';
import { Typography, Box } from '@material-ui/core';
import clsx from 'clsx';


import {
  Paper,
  ConvertString,
  ColorCate,
} from '..';

interface PostProps{
    title:string
    _id: string
    imagePath: any
    category: string
}
interface Props{
    data:any
    err: boolean
}
const useStyles = makeStyles((theme:Theme) => createStyles({
  listItmes: {
    padding: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  item: {
    width: '25%',
    margin: 5,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  itemRightSide: {
    margin: '0px 15px',
    display: 'flex',
    flexDirection: 'column',
  },
  itemCell: {
    margin: '7px 0px',
  },
  itemLink: {
    color: theme.palette.text.primary,
    fontSize: '0.9em',
    transform: 'scale(1)',
    fontWeight: 300,
    transition: 'color 200ms, transform 200ms',
    textDecoration: 'none',
    '& >div': {
      transition: 'color 200ms, transform 200ms',
    },
    '& :hover': {
      color: '#105dea',
      transform: 'scale(1.2)',
      transition: 'color 200ms, transform 200ms',

    },
  },
  itemCategory: {
    border: '1px solid',
    padding: '3px 6px',
    fontSize: '0.75em',
    fontWeight: 100,
    borderRadius: 4,
  },
  itemImg: {
    width: 100,
    height: 60,
    boxShadow: theme.shadows[2],
    borderRadius: 4,
  },
}));


function ListItems(props:Props) {
  const classes = useStyles();
  const { data, err } = props;

  if (err) {
    return (
      <div>
        <h3>محصولی یافت نشد</h3>
      </div>
    );
  }
  return (
    <div className={classes.listItmes}>
      {err ? null
        : data.map((post:PostProps) => (
          <Paper
            key={post._id}
            className={classes.item}
          >
            <div className={classes.itemRightSide}>
              <Link href={`/product/${post._id}`} passHref>
                <Typography
                  variant="h6"
                  component="a"
                  className={clsx(classes.itemLink, classes.itemCell)}
                >
                  <Box>
                    {post.title}
                  </Box>
                </Typography>
              </Link>
              <Typography
                variant="h6"
                component="span"
                className={clsx(classes.itemCategory, classes.itemCell)}
                style={{
                  borderColor: ColorCate(post.category),
                }}
              >
                <Box>
                  {ConvertString(post.category)}
                </Box>
              </Typography>

            </div>
            <img
              className={classes.itemImg}
              src={post.imagePath[0]}
              alt={post.title}
            />

            {/* <ProductCardInfo
              title={post.title}
              _id={post._id}
              path={post.imagePath[0]}
            /> */}
          </Paper>
        ))}
    </div>
  );
}

export default ListItems;
