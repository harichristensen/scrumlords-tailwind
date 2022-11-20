import 'focus-visible'
import '@/styles/tailwind.css'
import { Amplify, Auth, AuthModeStrategyType } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { AppProvider } from '@/AppContext';


import awsmobile from '../aws-exports';
import { useState } from 'react';

Auth.configure(awsmobile);

Amplify.configure({
  ...awsmobile,
  authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
});

export default function App({ Component, pageProps }) {
  return (
      <AppProvider>
        <Authenticator className='mt-60'>
        <Component {...pageProps} />
        </Authenticator>
      </AppProvider>
  )
}

