import React from 'react';
import { storiesOf } from '@storybook/react';
import { CoffeeShopeThemeProvider } from '@coffee-shope/theme-provider';
import { Box } from '../src/index';

storiesOf('Box', module).add('default', () => (
  <CoffeeShopeThemeProvider>
    <Box p={10} pl={20} pt={20} pb={100} border="1px solid black">
      <pre>This is a layout with</pre>
      <Box>
        <pre>{'p={10} pl={20} pt={20} pb={100}'}</pre>
      </Box>
    </Box>
  </CoffeeShopeThemeProvider>
));
