import React from 'react';
import {
// eslint-disable-next-line no-unused-vars
  makeStyles, createStyles, Theme,
} from '@material-ui/core';

import AppTheme from '../../components/theme';
import Layout from '../../components/Layout';
import WithNav from '../../components/management/WithNav';
import AllProducts from '../../components/management/AllProducts';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    transition: 'background-color 250ms linear , color 250ms linear',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
}));

function Products() {
  const classes = useStyles();
  return (
    <AppTheme>
      <Layout>
        <WithNav className={classes.root}>
          <AllProducts />
        </WithNav>
      </Layout>
    </AppTheme>
  );
}

export default Products;
