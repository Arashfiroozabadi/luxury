// eslint-disable-next-line no-unused-vars
import React, { ReactNode } from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});
interface PropsTypes{
  children:ReactNode
}
function RTL(props: PropsTypes) {
  const { children } = props;
  return (
    <StylesProvider jss={jss}>
      {children}
    </StylesProvider>
  );
}

export default RTL;
