import { AppProps } from 'next/app';
import { useState } from "react";
import styled, { createGlobalStyle, DefaultTheme, ThemeProvider } from "styled-components";
import Box from '../src/components/Box';
import HeaderBar from "../src/components/HeaderBar";
import ThemePicker from '../src/components/ThemePicker';
import { ModalProvider } from '../src/context/Modal';
import setThemeTransition from '../src/util/setThemeTransition';

const darkTheme: DefaultTheme['colors'] = {
  background: {
    color: '#000000',
    contrast: '#FFFFFF'
  },
  box: {
    color: '#191919',
    contrast: '#FFFFFF',
  },
  primary: {
    color: '#028A38',
    contrast: '#FFFFFF',
  },
  secondary: {
    color: '#25A737',
    contrast: '#FFFFFF',
  },
  success: {
    color: '#25A737',
    contrast: '#FFFFFF',
  },
  error: {
    color: '#c04141',
    contrast: '#FFFFFF',
  },
};

const lightTheme: DefaultTheme['colors'] = {
  background: {
    color: '#FFFFFF',
    contrast: '#000000'
  },
  box: {
    color: '#ECECEC',
    contrast: '#000000',
  },
  primary: {
    color: '#028A38',
    contrast: '#000000',
  },
  secondary: {
    color: '#25A737',
    contrast: '#000000',
  },
  success: {
    color: '#25A737',
    contrast: '#000000',
  },
  error: {
    color: '#c04141',
    contrast: '#000000',
  },
};

const colorsPresets = {
  dark: darkTheme,
  light: lightTheme,
}

const initialTheme = {
  currentActive: 'dark' as DefaultTheme['currentActive'],
  borderRadius: '8px',
}

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  :root {
    font-size: 10px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

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
  }
  
  body {
    background-color: ${({ theme }) => theme.colors.background.color};
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    height: 100vh;
    
    ${setThemeTransition(['background-color'])}
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
`;

export default function App({ Component, pageProps }: AppProps) {
  const [ theme, setTheme ] = useState({
    ...initialTheme,
    colors: colorsPresets[initialTheme.currentActive],
  });

  function updateColor(newColors: DefaultTheme['colors']) {
    setTheme({ ...theme, colors: newColors });
  }

  function activeColorsPreset(presetName: DefaultTheme['currentActive']) {
    setTheme({
      ...theme,
      currentActive: presetName,
      colors: colorsPresets[presetName],
    });
  }

  const themePicker = (<ThemePicker
    activeColorsPreset={activeColorsPreset}
    updateColor={updateColor}
    theme={theme}
  />);

  return (
    <>
      <GlobalStyle theme={theme} />
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <HeaderBar themePicker={themePicker} />
          <MainBox>
            <Component {...pageProps} />
          </MainBox>
        </ModalProvider>
      </ThemeProvider>
    </>
  );
};
