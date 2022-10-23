import { appWithTranslation } from 'next-i18next';

import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '~/theme';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useRef, useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (_event == 'SIGNED_OUT') router.push('/login');
    });
  }, [supabaseClient]);

  return (
    <ChakraProvider theme={theme}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
