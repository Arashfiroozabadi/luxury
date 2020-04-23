import React from 'react';
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Divider, Typography, Box } from '@material-ui/core';

import ConvertString from '../../components/ConvertString';
import ConvertValue from '../../components/ConvertValue';


interface CateType{
  name:string,
  value:number
}
interface PropsTypes{
    data:{
      total:string,
      category:Array<CateType>
    },
    array: Array<{name:string}>;
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
    boxShadow: '0px 1px 5px 0.5px #ffffffc7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captionText: {
    color: theme.palette.info.contrastText,
  },
  chartContiner: {
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#050506',

  },
  chartInfo: {
    width: '15%',
    fontSize: 14,
    margin: '15px 10px',
    textAlign: 'center',
    '& p': {
      margin: '0',
    },
  },
  chartIdColorDivider: {
    height: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
  },
}));

const chartRowColor = ['#006D2D', '#e8e230', '#ec407a', '#AB47BC', '#ff5722', '#039be5'];

function Chart(props: PropsTypes) {
  const classes = useStyles();
  const { data } = props;
  const t: any = [];

  data.category.map((item: any | null) => {
    const per: any = () => {
      const v1 = parseInt(data.total, 10);
      const v2 = parseInt(item.value, 10);
      const perc = ((v2 / v1) * 100).toFixed(0);
      return perc;
    };
    return t.push(Number(per()));
  });
  if (data.category) {
    return (
      <div className={classes.root}>
        <div className={clsx(classes.row, classes.chartContiner)}>
          {t.map((item: number, i:number) => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            return (
              <div
                  // eslint-disable-next-line react/no-array-index-key
                className={classes.chartCell}
                key={randomColor}
                style={{
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
        <div className={classes.row}>
          {data.category.map((item:CateType, i:number) => {
            const randomKey = Math.floor(Math.random() * 16777215).toString(16);
            return (
              <div
                key={randomKey}
                className={classes.chartInfo}
              >
                <p>{ConvertString(item.name)}</p>
                <Divider
                  classes={{
                    root: classes.chartIdColorDivider,
                  }}
                  style={{
                    backgroundColor: chartRowColor[i],
                  }}
                />
                <p>{ConvertValue(item.value)}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
}

export default Chart;
