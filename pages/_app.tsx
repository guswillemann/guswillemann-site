import NextApp, { AppContext, AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import styled, { css, DefaultTheme } from "styled-components";
import Box from '../src/components/Box';
import FontLoader from '../src/components/Meta/FontLoader';
import Header from '../src/components/Header';
import SEO from '../src/components/Meta/SEO';
import { ModalProvider } from '../src/context/Modal';
import { ThemeCookies, themeCookiesNames, ThemeProvider } from '../src/theme';
import atMediaBreakpoints from '../src/theme/util/atMediaBreakpoints';

const AppContainer = styled.div`
  padding: 1.5rem;
  min-height: 100vh;
  max-width: 120rem;
  margin: auto;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  ${atMediaBreakpoints({
    md: css`
      flex-direction: row;
    `,
  })}

  main {
    flex: 1;
  }
`;

interface CustomAppProps extends AppProps {
  themeCookies: ThemeCookies;
};

export default function App({ Component, pageProps, themeCookies }: CustomAppProps) {
  return (
    <AppContainer>
      <ThemeProvider themeCookies={themeCookies}>
        <ModalProvider>
          <FontLoader />
          <SEO />
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