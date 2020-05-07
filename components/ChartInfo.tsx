import React from 'react';
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Divider, Typography, Box } from '@material-ui/core';

import ConvertValue from './ConvertValue';
import ConvertString from './ConvertString';
import AppTheme from './theme';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    transition: 'background-color 250ms linear , color 250ms linear',
    width: '15%',
    fontSize: 14,
    margin: '15px 10px',
    textAlign: 'center',
    '& p': {
      margin: '0',
    },
    [theme.breakpoints.only('xs')]: {

    },
  },
  chartIdColorDivider: {
    height: theme.spacing(0.5),
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
  },
  t: {
    transition: 'color 250ms linear',
  },
}));

function ChartInfo(props:any) {
  const classes = useStyles();
  const { name, value, rowColor } = props;
  return (
    <AppTheme>
      <div className={classes.root}>
        <Typography
          className={classes.t}
          color="textPrimary"
          variant="caption"
          component="span"
        >
          <Box>
            {ConvertString(name)}
          </Box>
        </Typography>
        <Divider
          classes={{
            root: classes.chartIdColorDivider,
          }}
          style={{
            backgroundColor: rowColor,
          }}
        />
        <Typography
          className={classes.t}
          color="textPrimary"
          variant="caption"
          component="span"
        >
          <Box>
            {ConvertValue(value)}
          </Box>
        </Typography>
      </div>
    </AppTheme>
  );
}

export default ChartInfo;
