import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body, #__next': {
        width: '100%',
        height: '100%',
      },
      body: {
        fontFamily: "'Montserrat', sans-serif",
        color: 'blackAlpha.900',
        bg: 'orange.100',
      },
    },
  },
});

export default theme;
