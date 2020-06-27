import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
} from '@material-ui/core';
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';

import { ColorCate } from '.';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginTop: theme.spacing(3),
    transition: 'background-color 250ms linear , color 250ms linear',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.only('xs')]: {

    },
  },
  rootCardContent: {
    padding: '16px 8px',
  },
  title: {
    fontSize: '1rem',
  },
  cateText: {
    display: 'inline',
    padding: '3px 6px',
    borderRadius: 4,
  },
  cardButton: {
    // color: '#ffd54f'
  },
  img: {
    height: 200,
    objectFit: 'fill',
  },
}));
interface CardProps {
    title: string;
    caption?: string;
    link: string;
    image: string;
    alt?: string;
    category: string;
}

function Cards(props: CardProps): JSX.Element {
  const {
    title, caption,
    link, category,
    image,
  } = props;
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
            // raised
      elevation={8}
    >
      <CardMedia
        component="img"
        image={image}
        alt="مبل راحتی"
        title="مبل راحتی"
        className={classes.img}
      />
      <CardContent className={classes.rootCardContent}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          className={classes.title}
        >
          <Box
            className={classes.cateText}
            style={{
              border: `1px solid ${ColorCate(category)}`,
            }}
          >
            {title}
          </Box>
        </Typography>
        <Typography
          variant="body2"
          component="span"
        >
          <Box>
            {caption}
          </Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/production/${link}`} passHref>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            component="a"
            className={classes.cardButton}
          >
            مشاهده
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default Cards;
