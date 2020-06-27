import React from 'react';
import dynamic from 'next/dynamic';
import {
  Container, Typography, Box, Paper, Button, Divider,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Instagram,
  // Telegram,
} from '@material-ui/icons';
import { Layout, AppTheme } from 'components';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    margin: `${theme.spacing(3)}px 0`,
  },
  container: {
    display: 'flex',
    padding: theme.spacing(2),
    flexDirection: 'column',
  },
  social: {
    width: '90%',
    margin: 'auto',
  },
  link: {
    color: '#adacacb8',
    margin: '0px 5px',
    display: 'inline-flex',
    transition: 'transform 250ms, color 250ms',
    '&:hover': {
      color: 'white',
      transform: 'translateY(-5px)',
    },
  },
  divider: {
    margin: theme.spacing(2),
  },
  mapContent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  mapHeader: {
    width: '90%',
    margin: 'auto',
  },
  mapCaption: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wazeImg: {
    width: 40,
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
        <article>
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
            <Paper className={classes.container}>
              <section>
                <div
                  className={classes.social}
                >
                  <Typography
                    variant="body1"
                    component="h4"
                    gutterBottom
                  >
                    لاکچری در شبکه‌های اجتماعی
                  </Typography>
                  <div>
                    <a
                      className={classes.link}
                      target="_blanck"
                      title="instagram"
                      href="https://www.instagram.com/Luxurry_mobl/"
                    >
                      <Instagram />
                    </a>
                    {/* <a href="#">
                      <Telegram />
                    </a> */}
                  </div>
                </div>
              </section>
              <Divider className={classes.divider} />
              <section>
                <address className={classes.mapHeader}>
                  <Typography
                    variant="body1"
                    gutterBottom
                  >
                    آدرس: البرز مشکین‌ دشت بلوار امام علی گالری مبل لاکچری
                  </Typography>
                </address>
                <address
                  className={classes.mapContent}
                >
                  <div className={classes.mapCaption}>
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
                      endIcon={(
                        <img
                          className={classes.wazeImg}
                          src="https://img.icons8.com/color/48/000000/waze.png"
                          alt="waze"
                        />
                      )}
                    >
                      استفاده از waze
                    </Button>
                  </div>
                  <DynamicComponentWithNoSSR />
                </address>
              </section>
            </Paper>
          </Container>
        </article>
      </Layout>
    </AppTheme>
  );
}

export default CallUS;
