import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Inter } from 'next/font/google';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { AZURE_AD_CLIENT_ID, AZURE_AD_TENANT_ID_URL } from '@/utils/app/const';
import { useEffect, useState } from 'react';
import LoginComponent from '@/components/Auth/Login';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import '@/styles/globals.css';
const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  const queryClient = new QueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  }

  useEffect(() => {
    const msalInstance = new PublicClientApplication({
      auth: {
        clientId: AZURE_AD_CLIENT_ID,
        authority: AZURE_AD_TENANT_ID_URL,
        redirectUri: window.location.origin,
      },
      cache: {
        cacheLocation: "sessionStorage", // Utilizar sessionStorage en lugar de localStorage
        storeAuthStateInCookie: true, // Utilizar cookies para mayor seguridad
      },
    });
    setMsalInstance(msalInstance);

    const account = msalInstance.getAllAccounts()[0]; // Aquí obtenemos la cuenta
    if (account) {
      setIsAuthenticated(true); // Si hay una cuenta, seteamos como autenticado
    }
  }, []);

  return (
    msalInstance ? <MsalProvider instance={msalInstance}>
      <div className={inter.className}>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          {isAuthenticated ? <Component {...pageProps} /> : <LoginComponent onLogin={handleLogin} />}
        </QueryClientProvider>
      </div>
    </MsalProvider> : null
  );
}

export default appWithTranslation(App);
