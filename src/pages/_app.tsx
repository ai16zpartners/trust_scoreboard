import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { FC } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ContextProvider } from '../contexts/ContextProvider';
import NavBar from '../components/nav-element/NavBar';
import { ContentContainer } from '../components/ContentContainer';
import Notifications from '../components/Notification';
import '../styles/profile.css'; // Adjust the path based on your project structure.
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets';

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter()
];

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>ai16z Partners Lounge</title>
      </Head>

      <Script
        src="https://telegram.org/js/telegram-widget.js?22"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Telegram widget script loaded');
        }}
      />

      <ContextProvider>
        <div className="flex flex-col min-h-screen">
          <Notifications />
          <NavBar />
          <main className="flex-1 flex justify-center">
            <ContentContainer>
              <Component {...pageProps} />
            </ContentContainer>
          </main>
        </div>
      </ContextProvider>
    </SessionProvider>
  );
};

export default App;
