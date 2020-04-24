import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
// import { useSelector } from 'react-redux';

// interface State {
//   theme:boolean
// }
// const appTheme = useSelector((state:State) => state.theme);
// eslint-disable-next-line import/no-mutable-exports
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
const themeDark = responsiveFontSizes(theme1);
export const themeLight = responsiveFontSizes(theme2);
export default themeDark;
