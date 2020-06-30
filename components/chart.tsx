import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Typography, Box,
} from '@material-ui/core';

import AppTheme from './theme';
import ConvertValue from './ConvertValue';
import ChartInfo from './ChartInfo';


interface CateType{
  name: string;
  value: number;
  view: string;
}
interface PropsTypes{
    view: boolean;
    data: {
      total: string;
      totalView: string;
      category: Array<CateType>;
    };
    array: Array<{name: string}>;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  chartCell: {
    height: 25,
    display: 'flex',
    fontSize: 14,
    textAlign: 'center',
    boxShadow: theme.shadows[5],
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
  captionText: {
    color: theme.palette.info.contrastText,
    textShadow: '0px 1px 2px #000000ba, 0px 2px 4px #000000ba',
  },
  chartContiner: {
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      padding: 0,
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  chartInfo: {
    flexWrap: 'wrap',
  },
  chartIdColorDivider: {
    height: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
  },
}));

const chartRowColor = ['#01b075', '#e8e230', '#ec407a', '#AB47BC', '#ff5722', '#039be5'];

function Chart(props: PropsTypes): JSX.Element|null{
  const classes = useStyles();
  const { data, view } = props;
  const t: any = [];
  data.category.map((item: any | null) => {
    const per: any = () => {
      const v1 = parseInt(view ? data.totalView : data.total, 10);
      const v2 = parseInt(view ? item.view : item.value, 10);
      const perc = ((v2 / v1) * 100).toFixed(2);
      return perc;
    };
    return t.push(Number(per()));
  });
  if (data.category) {
    return (
      <AppTheme>
        <div className={classes.root}>
          <div className={clsx(classes.row, classes.chartContiner)}>
            {t.map((item: number, i: number) => {
              const randomColor = Math.floor(Math.random() * 16777215).toString(16);
              return (
                <div
                  className={classes.chartCell}
                  key={randomColor}
                  style={{
                    display: Number.isNaN(item) || item === 0 ? 'none' : 'flex',
                    width: `${item}%`,
                    backgroundColor: chartRowColor[i],
                  }}
                >
                  <Typography
                    className={classes.captionText}
                    variant="caption"
                    component="span"
                  >
                    <Box>
                      {ConvertValue(item)}
                      %
                    </Box>
                  </Typography>
                </div>
              );
            })}
          </div>
          <div className={clsx(classes.row, classes.chartInfo)}>
            {data.category.map((item: CateType, i: number) => {
              const randomKey = Math.floor(Math.random() * 16777215).toString(16);
              return (
                <ChartInfo
                  key={randomKey}
                  name={item.name}
                  value={view ? item.view : item.value}
                  rowColor={chartRowColor[i]}
                />
              );
            })}
          </div>
        </div>
      </AppTheme>
    );
  }
  return null;
}

export default Chart;
