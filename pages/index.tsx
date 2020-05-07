import React, {
// useEffect,
} from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ThemeProvider } from '@material-ui/styles';
import {
  Grid,
  Button,
  Typography,
  Box,
  Container,
  Toolbar,
} from '@material-ui/core';

// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  useSelector,
  // useDispatch,
} from 'react-redux';

import { themeDark, themeLight } from '../components/theme';
import Carousel from '../components/Carousel';
import Cards from '../components/Cards';

const Layout = dynamic(
  () => import('../components/Layout'),
  { loading: () => <p>loading...</p> },
);

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  textBox: {
    alignSelf: 'flex-start',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  text: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
    fontWeight: 200,
  },
  gText: {
    letterSpacing: 25,
    paddingLeft: 15,
    // backgroundColor: theme.palette.background.paper,
    transition: 'background-color 250ms linear',
    borderBottom: '1px solid gold',
  },
  logoText: {
    color: 'gold',
    fontSize: '1.5em',
    fontWeight: 300,
    letterSpacing: 25,
    // backgroundColor: theme.palette.background.paper,
    transition: 'background-color 250ms linear',
  },
  splashText: {
    padding: '1.5rem',
    textAlign: 'center',
    [theme.breakpoints.only('xs')]: {
      padding: '3.5rem',
    },
  },
  imgBox: {
    position: 'relative',
    minHeight: 400,
    width: '100%',
  },
  control: {
    padding: theme.spacing(2),
  },
  moreButton: {
    marginTop: '1.5rem',
    textAlign: 'center',
  },
}));
interface State {
  theme:boolean
}

export default () => {
  const classes = useStyles();
  const t = useSelector((state:State) => state.theme);

  return (
    <ThemeProvider theme={t ? themeDark : themeLight}>
      <Layout>
        <Head>
          <title>Luxury</title>
        </Head>
        <Container
          className={classes.root}
        >
          <Grid
            justify="center"
            container
            direction="column"
            alignItems="center"
          >
            <Grid
              xs={12}
              sm={4}
              md={3}
              lg={3}
              xl
              item
              className={classes.textBox}
            >
              <Typography
                className={classes.text}
                component="span"
                color="textPrimary"
              >
                <Box
                  m={0}
                  textAlign="justify"
                  component="p"
                  className={classes.gText}
                >
                  گالری مبل
                </Box>
                <Box
                  m={0}
                  component="p"
                  className={classes.logoText}
                >
                  لاکچری
                </Box>
              </Typography>
            </Grid>
            <Grid
              className={classes.imgBox}
              xs={12}
              sm={8}
              md={9}
              lg={8}
              xl
              item
            >
              <div
                className={classes.splashText}
              >
                <Typography
                  component="span"
                  color="textPrimary"
                >
                  <Box
                    fontWeight="fontWeightMedium"
                    component="p"
                  >
                    عرضه کننده انواع مبلمان راحتی
                  </Box>
                </Typography>
              </div>
              <Carousel />
            </Grid>
          </Grid>
        </Container>
        <Toolbar />
        <Container>
          <Grid
            container
            justify="space-between"
          >
            <Grid
              item
              md={12}
            >
              <Typography
                variant="h5"
                component="h2"
                color="textPrimary"
                gutterBottom
              >
                <Box>
                  محصولات ما
                </Box>
              </Typography>
            </Grid>
            <Grid
              item
              md={3}
            >
              <Cards
                title="مبلمان راحتی"
                link="rahati"
              />
            </Grid>
            <Grid
              item
              md={3}
            >
              <Cards
                title="مبلمان راحتی ال"
                link="rahati-L"
              />
            </Grid>
            <Grid
              item
              md={3}
            >
              <Cards
                title="سرویس خواب"
                link="service-khab"
              />
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.moreButton}
            >
              <Link href="production" passHref>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  component="a"
                >
                  مشاهده سایر محصولات
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </ThemeProvider>
  );
};
