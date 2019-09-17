import Head from 'next/head';
import dynamic from 'next/dynamic';
import {
  Grid,
  Typography,
  Box
} from '@material-ui/core';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const Layout = dynamic(
  () => import('../components/Layout'),
  { loading: () => <p>loading...</p> }
)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      color: 'white',
      letterSpacing: 30,
      backgroundColor: 'black',
      borderBottom: '1px solid gold',
    },
    logoText: {
      color: 'gold',
      fontSize: '1.5em',
      fontWeight: 300,
      letterSpacing: 25,
      backgroundColor: 'black',
    },
    imgBox: {
      position: 'relative',
      minHeight: 400,
      width: '100%'
    },
    image: {
      top: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundSize: '100% auto',
      backgroundImage: 'url(/static/img/firstShow.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

export default () => {
  const classes = useStyles();
  return (
    <Layout>
      <Head>
        <title>Luxury</title>
      </Head>
      <div
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
              className={classes.image}
            />
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}