import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppTheme, Layout } from 'components';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    minHeight: 167,
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      minHeight: 10,
      padding: theme.spacing(1),
    },
  },
  pagePath: {
    color: '#2771e0',
  },
  errCode: {
    fontSize: '2rem',
    marginBottom: 0,
  },
}));

export default function Custom404(): JSX.Element {
  const classes = useStyles();
  return (
    <AppTheme>
      <Layout>
        <main className={classes.root}>
          <h1>
            صفحه مورد نظر یافت نشد
          </h1>
          <code className={classes.errCode}>404</code>
        </main>
      </Layout>
    </AppTheme>
  );
}
