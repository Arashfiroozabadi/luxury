import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
// eslint-disable-next-line import/no-mutable-exports
let theme = createMuiTheme({
  direction: 'rtl',
  typography: {
    fontFamily: [
      'Vazir',
    ].join(','),
  },
  palette: {
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
      default: '#fff',
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
