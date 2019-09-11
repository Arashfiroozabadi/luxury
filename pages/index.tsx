import Head from 'next/head';
import dynamic from 'next/dynamic';
import {
  Grid
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
    },
    text: {
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },
    imgBox: {
      position: 'relative',
      minHeight: 400,
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
          alignItems="center"
        >
          <Grid
            xs={3}
            sm={4}
            md={3}
            lg={3}
            xl
            item
            className={classes.textBox}
          >
            <h1
              className={classes.text}
            >
              گالری مبل لاکچری
            </h1>
          </Grid>
          <Grid
            className={classes.imgBox}
            xs={8}
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