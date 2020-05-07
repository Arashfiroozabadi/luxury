import React from 'react';
import {
  makeStyles, createStyles,
  // eslint-disable-next-line no-unused-vars
  Theme,
} from '@material-ui/core/styles';
import {
  Card, CardContent, Typography, Box, Divider, CardMedia, CardActions, Button,
} from '@material-ui/core';
import Link from 'next/link';

// eslint-disable-next-line no-unused-vars
import { FetchData } from '../interface';


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    margin: '5px 5px',
    marginTop: theme.spacing(3),
    transition: 'background-color 250ms linear , color 250ms linear',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  title: {
    fontSize: '1rem',
  },
  cardImgs: {
    width: '100%',
    height: 'auto',
    maxHeight: 230,
  },
}));

function ProductCardInfo(props:FetchData) {
  const classes = useStyles();
  const { title, path, _id } = props;
  return (
    <Card className={classes.root} elevation={8}>
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          className={classes.title}
        >
          <Box>
            {`مدل ${title}`}
          </Box>
        </Typography>
      </CardContent>
      <CardMedia
        className={classes.cardImgs}
        component="img"
        image={`/${path}`}
        alt={title}
        title={title}
      />
      <Divider />
      <CardActions>
        <Link
          href="/product/[id]"
          as={`/product/${_id}`}
          passHref
        >
          <Button
            size="small"
            color="primary"
            variant="outlined"
            component="a"
          >
            مشاهده محصول
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default ProductCardInfo;
