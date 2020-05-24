/* eslint-disable react/prop-types */
import React from 'react';
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import { ThemeProvider } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';
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
      dark: '#171717',
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
      dark: '#171717',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});
export const themeDark = responsiveFontSizes(theme1);
export const themeLight = responsiveFontSizes(theme2);

function AppTheme(props) {
  const { children } = props;
  const t = useSelector((state) => state.theme);

  return (
    <MuiThemeProvider theme={t ? themeDark : themeLight}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default AppTheme;
