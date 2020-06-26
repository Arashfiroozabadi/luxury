import React from 'react';
import { Layout, AppTheme } from 'components';
import dynamic from 'next/dynamic';
import {
  Container, Typography, Box, Paper, Button,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    margin: `${theme.spacing(3)}px 0`,
  },
  mapPaper: {
    display: 'flex',
    padding: theme.spacing(2),
    flexDirection: 'column',
  },
  mapContent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  mapHeader: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const DynamicComponentWithNoSSR = dynamic(() => import('components/Map'), {
  ssr: false,
});

function CallUS(): JSX.Element {
  const classes = useStyles();

  return (
    <AppTheme>
      <Layout>
        <Container>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
          >
            <Box>
              تماس با ما
            </Box>
          </Typography>
          <Paper className={classes.mapPaper}>
            <address>
              <Typography variant="caption">
                البرز مشکین‌ دشت بلوار امام علی گالری مبل لاکچری
              </Typography>
            </address>
            <address
              className={classes.mapContent}
            >
              <div className={classes.mapHeader}>
                <Typography
                  variant="caption"
                  gutterBottom
                >
                  آدرس روی نقشه
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  component="a"
                  href="https://www.waze.com/ul?ll=35.75058732%2C50.92649102&navigate=yes&zoom=17"
                  target="_blanck"
                  endIcon={<img src="https://img.icons8.com/color/48/000000/waze.png" alt="waze" />}
                >
                  استفاده از waze
                </Button>
              </div>
              <DynamicComponentWithNoSSR />
            </address>
          </Paper>
        </Container>
      </Layout>
    </AppTheme>
  );
}

export default CallUS;
