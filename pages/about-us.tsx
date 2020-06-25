import React from 'react';
import { Typography, Box, Container } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Layout, AppTheme } from 'components';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    margin: `${theme.spacing(3)}px 0`,
  },
  textBox: {
    width: '50%',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
function AboutUs(): JSX.Element {
  const classes = useStyles();
  return (
    <AppTheme>
      <Layout>
        <div
          className={classes.root}
        >
          <Container
            className={classes.container}
          >
            <Typography
              variant="body1"
              component="h2"
              gutterBottom
              className={classes.textBox}
            >
              <Box
                textAlign="center"
                fontWeight="fontWeightRegular"
              >
                گالری مبل لاکچری عرضه کننده انواع مبلمان راحتی
                در انواع طرح‌ها و رنگ‌های متفاوت متناسب با
                سلیقیه‌ی شما
              </Box>
            </Typography>
          </Container>
        </div>
      </Layout>
    </AppTheme>
  );
}

export default AboutUs;
