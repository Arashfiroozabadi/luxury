import React from 'react';
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


import { Divider } from '@material-ui/core';
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
    display: 'flex',
    fontSize: 14,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
}));
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
        <div className={classes.row}>
          {t.map((item: number) => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            return (
              <div
                  // eslint-disable-next-line react/no-array-index-key
                className={classes.chartCell}
                key={randomColor}
                style={{
                  width: `${item}%`,
                  height: 50,
                  backgroundColor: `#${randomColor}`,
                }}
              />
            );
          })}
        </div>
        <div className={classes.row}>
          {data.category.map((item:CateType) => {
            const randomKey = Math.floor(Math.random() * 16777215).toString(16);
            return (
              <div
                key={randomKey}
                className={classes.chartInfo}
              >
                <p>{ConvertString(item.name)}</p>
                <Divider />
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
