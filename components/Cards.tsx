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

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginTop: theme.spacing(3),
    transition: 'background-color 250ms linear , color 250ms linear',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.only('xs')]: {

    },
  },
  title: {
    fontSize: '1rem',
  },
  cardButton: {
    // color: '#ffd54f'
  },
}));
interface CardProps {
    title: string;
    caption?: string;
    link: string;
}

function Cards(props: CardProps) {
  const { title, caption, link } = props;
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
            // raised
      elevation={8}
    >
      <CardMedia
        component="img"
        image="/static/img/firstShow.png"
        alt="مبل راحتی"
        title="مبل راحتی"
      />
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          className={classes.title}
        >
          <Box>
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
