import Head from 'next/head';
import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import PlausibleProvider from 'next-plausible';
import { Provider as Web3Provider, NETWORKS } from '@web3-ui/core';
import { SessionProvider } from 'next-auth/react';
import customTheme from '../theme';
import FontFace from '@/components/font-face';
import SEO from '../next-seo.config';
import Header from '../components/header';
import Footer from '../components/footer';
import MobileNavigation from '@/components/mobile-navigation';
import { GAWrapper } from '../utility/analytics';

import 'antd/dist/antd.css';
import '@stream-io/stream-chat-css/dist/css/index.css';
import '../app.css';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <GAWrapper>
        <SessionProvider session={session}>
          <Web3Provider network={NETWORKS.mainnet}>
            <ChakraProvider theme={customTheme}>
              <PlausibleProvider domain="danielwirtz.com">
                <Head>
                  <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    sizes="96x96"
                    href="/favicon.png"
                  />
                  <meta name="theme-color" content="#2BB0EC" />
                </Head>
                <DefaultSeo {...SEO} />
                <Header />
                <Box
                  as="main"
                  pt={{ base: 16, md: 32 }}
                  pb={{ base: 24, md: 16 }}
                >
                  <Component {...pageProps} />
                </Box>
                <MobileNavigation />
                <Footer />
              </PlausibleProvider>
            </ChakraProvider>
          </Web3Provider>
        </SessionProvider>
      </GAWrapper>
      <FontFace />
    </>
  );
}

export default App;
