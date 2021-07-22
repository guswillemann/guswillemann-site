import { AppPropsType } from "next/dist/next-server/lib/utils";
import { useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Box from '../src/components/Box';
import SideBar from "../src/components/SideBar";

const initialTheme = {
  borderRadius: '8px',
  colors: {
    background: '#000000',
    box: '#191919',
    text: '#FAFAFA',
    primaryMain: '#028A38',
    primaryDetails: '#25A737',
  }
}

const GlobalStyle = createGlobalStyle<{ bodyBgColor: string }>`
  :root {
    font-size: 10px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: ${({ bodyBgColor }) => bodyBgColor};
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    height: 100vh;
  }
  
  body, button, input  {
    font: 400 1.6rem sans-serif;
  }

  #__next {
    display: grid;
    grid-template-columns: 1fr 3fr;

    gap: 1.5rem;
    max-width: 1200px;
    height: 100%;

    margin: 0 auto;
  }

  img, svg {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

const MainBox = styled(Box).attrs(() => ({ as: 'main' }))`
  overflow: hidden auto;
`;

export default function App({ Component, pageProps }: AppPropsType) {
  const [ theme, setTheme ] = useState(initialTheme as any);

  function updateColor(inputColors: Record<string, string>) {
    setTheme({ ...theme, colors: inputColors });
  }

  return (
    <>
      <GlobalStyle bodyBgColor={theme.colors.background} />
      <ThemeProvider theme={theme}>
        <SideBar updateColor={updateColor} theme={theme} />
        <MainBox>
          <Component {...pageProps} />
        </MainBox>
      </ThemeProvider>
    </>
  );
};
