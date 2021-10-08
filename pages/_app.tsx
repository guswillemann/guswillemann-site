import { AppProps } from 'next/app';
import { useState } from "react";
import styled, { createGlobalStyle, ThemeProvider, DefaultTheme } from "styled-components";
import Box from '../src/components/Box';
import HeaderBar from "../src/components/HeaderBar";
import { ModalProvider } from '../src/context/Modal';

const initialTheme: DefaultTheme = {
  borderRadius: '8px',
  colors: {
    background: {
      color: '#000000',
      contrast: '#ffffff'
    },
    box: {
      color: '#191919',
      contrast: '#ffffff',
    },
    primary: {
      color: '#028A38',
      contrast: '#ffffff',
    },
    secondary: {
      color: '#25A737',
      contrast: '#ffffff',
    },
    success: {
      color: '#25A737',
      contrast: '#ffffff',
    },
    error: {
      color: '#c04141',
      contrast: '#ffffff',
    },
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
  
  body, button, input, textarea  {
    font: 400 1.6rem sans-serif;
  }

  #__next {
    display: grid;
    grid-template-columns: 1fr 4fr;

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
  overflow-y: scroll;

  /* scrollbar: Chrome, Edge, Safari and Opera */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.box};
    border-radius: 8px;
    margin: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.secondary.color};
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary.color};
  }

  /* scrollbar Firefox */
  scrollbar-color: ${({ theme }) => `${theme.colors.primary.color} ${theme.colors.box.color}`};
  scrollbar-width: thin;
`;

export default function App({ Component, pageProps }: AppProps) {
  const [ theme, setTheme ] = useState(initialTheme as any);

  function updateColor(inputColors: Record<string, string>) {
    setTheme({ ...theme, colors: inputColors });
  }

  return (
    <>
      <GlobalStyle bodyBgColor={theme.colors.background.color} />
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <HeaderBar updateColor={updateColor} theme={theme} />
          <MainBox>
            <Component {...pageProps} />
          </MainBox>
        </ModalProvider>
      </ThemeProvider>
    </>
  );
};
