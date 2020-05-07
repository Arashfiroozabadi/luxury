import React from 'react';

import {
  // eslint-disable-next-line no-unused-vars
  makeStyles, createStyles, Theme,
} from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import AppTheme from './theme';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    transition: 'background-color 250ms linear , color 250ms linear',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
}));

function TabPanel(props: TabPanelProps) {
  const classes = useStyles();

  const {
    children, value, index, ...other
  } = props;

  return (
    <AppTheme>
      <Typography
        component="div"
        className={classes.root}
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    </AppTheme>

  );
}

export default TabPanel;
