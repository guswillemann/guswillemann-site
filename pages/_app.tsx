import NextApp, { AppContext, AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import styled, { DefaultTheme } from "styled-components";
import Box from '../src/components/Box';
import Header from '../src/components/Header';
import { ModalProvider } from '../src/context/Modal';
import { ThemeCookies, themeCookiesNames, ThemeProvider } from '../src/theme';

const AppContainer = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 23.5rem 95rem;
  /* grid-template-columns: 8.5rem 95rem; */
  grid-template-rows: 1fr;
  padding: 1.5rem 0;

  justify-content: center;
  align-content: center;

  min-height: 100vh;
`;

interface CustomAppProps extends AppProps {
  themeCookies: ThemeCookies;
};

export default function App({ Component, pageProps, themeCookies }: CustomAppProps) {
  return (
    <AppContainer>
      <ThemeProvider themeCookies={themeCookies}>
        <ModalProvider>
          <Header />
          <Box as="main">
            <Component {...pageProps} />
          </Box>
        </ModalProvider>
      </ThemeProvider>
    </AppContainer>
  );
};

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  const cookies = parseCookies(appContext.ctx);
  const themeModeCookie = cookies[themeCookiesNames.mode] as DefaultTheme['mode'];
  const customModeCookie = cookies[themeCookiesNames[themeModeCookie]];

  return {
    ...appProps,
    themeCookies: {
      mode: themeModeCookie,
      custom: customModeCookie || null,
    },
  };
};