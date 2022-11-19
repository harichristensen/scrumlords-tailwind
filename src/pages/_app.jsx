import 'focus-visible'
import '@/styles/tailwind.css'
import { Amplify, Auth, AuthModeStrategyType } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { AppProvider } from '@/AppContext';


import awsmobile from '../aws-exports';

Auth.configure(awsmobile);

Amplify.configure({
  ...awsmobile, ssr: true,
  authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
});

function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default withAuthenticator(App);
