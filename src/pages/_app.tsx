import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SettingsProvider } from '../hooks/useSettings';
import { TeamsProvider } from '../hooks/useTeams';
import theme from '../styles/theme';

export default function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <TeamsProvider>
        <SettingsProvider>
          <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
            />
            <meta name="description" content="Contador de domino" />
            <meta name="keywords" content="dominó contador jogo" />
            <title>Contador de domino</title>

            <link rel="manifest" href="/manifest.json" />
            <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
            <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
            <link rel="apple-touch-icon" href="/apple-icon.png"></link>
            <meta name="theme-color" content="#FEEBC8" />
          </Head>
          <Component {...pageProps} />
        </SettingsProvider>
      </TeamsProvider>
    </ChakraProvider>
  );
}
