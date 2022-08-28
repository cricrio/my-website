import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props) => ({
    body: { bg: mode('white.500', 'blue.900')(props) },
  }),
};
const config = {
  initialColorMode: 'dark',
};

const theme = extendTheme({ config, styles });

export default theme;
