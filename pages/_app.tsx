import NextApp, { AppContext, AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import styled, { DefaultTheme } from "styled-components";
import Box from '../src/components/Box';
import HeaderBar from "../src/components/HeaderBar";
import { ModalProvider } from '../src/context/Modal';
import { ThemeCookies, themeCookiesNames, ThemeProvider } from '../src/theme';

const MainBox = styled(Box).attrs(() => ({ as: 'main' }))`
  overflow-y: scroll;
`;

interface CustomAppProps extends AppProps {
  themeCookies: ThemeCookies;
};

export default function App({ Component, pageProps, themeCookies }: CustomAppProps) {
  return (
    <>
      <ThemeProvider themeCookies={themeCookies}>
        <ModalProvider>
          <HeaderBar />
          <MainBox>
            <Component {...pageProps} />
          </MainBox>
        </ModalProvider>
      </ThemeProvider>
    </>
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