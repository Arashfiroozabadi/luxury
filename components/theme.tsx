import React from 'react';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
// eslint-disable-next-line no-unused-vars
import { useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { ChildProps, ThemeProps } from '../interface';

const theme1 = createMuiTheme({
  direction: 'rtl',
  typography: {
    fontFamily: [
      'Vazir',
    ].join(','),
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#212121',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#171717',
    },
  },
});
const theme2 = createMuiTheme({
  direction: 'rtl',
  typography: {
    fontFamily: [
      'Vazir',
    ].join(','),
  },
  palette: {
    type: 'light',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#212121',
    },
    error: {
      main: red.A400,
    },
  },
});
export const themeDark = responsiveFontSizes(theme1);
export const themeLight = responsiveFontSizes(theme2);

function AppTheme(props:ChildProps) {
  const { children } = props;
  const t = useSelector((state:ThemeProps) => state.theme);

  return (
    <ThemeProvider theme={t ? themeDark : themeLight}>
      {children}
    </ThemeProvider>
  );
}

export default AppTheme;
