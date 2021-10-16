import { parseCookies, setCookie } from 'nookies';
import React, { useState } from 'react';
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import themeColorsPresets from './themeColorsPresets';

const initialTheme = {
  mode: 'dark',
  borderRadius: '8px',
};

export const themeCookiesNames = {
  mode: 'theme-mode',
  light: 'custom-light-mode',
  dark: 'custom-dark-mode',
}

export type ThemeCookies = {
  mode: DefaultTheme['mode'],
  custom: string,
};

type ThemeProviderProps = {
  themeCookies: ThemeCookies;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, themeCookies }) => {
  const [ theme, setTheme ] = useState(() => {
    const customColors: DefaultTheme['colors'] | null = JSON.parse(themeCookies.custom);
    const presetColors = themeColorsPresets[themeCookies.mode || initialTheme.mode];
    
    const mode = themeCookies.mode || initialTheme.mode;
    const colors = customColors || presetColors;

    return {
      ...initialTheme,
      mode,
      colors,
    };
  });

  function activeColorsPreset(presetName: DefaultTheme['mode']) {
    setTheme({
      ...theme,
      mode: presetName,
      colors: themeColorsPresets[presetName],
    });
  }

  function updateColors(newColors: DefaultTheme['colors']) {
    setTheme({ ...theme, colors: newColors });
  }

  function toggleTheme() {
    const newThemeMode = theme.mode === 'light'
      ? 'dark'
      : 'light';
    
    setCookie(null, themeCookiesNames.mode, newThemeMode);

    const cookieName = themeCookiesNames[newThemeMode];

    const customThemeCookie = parseCookies(null)[cookieName];
    
    if (customThemeCookie) {
      const customThemeColors = JSON.parse(customThemeCookie);

      setTheme({
        ...theme,
        mode: newThemeMode,
        colors: customThemeColors,
      });
    } else {
      activeColorsPreset(newThemeMode);
    }
  }

  return (
    <>
      <GlobalStyle colors={theme.colors} />
      <StyledThemeProvider  theme={{
        ...theme,
        controls: {
          updateColors,
          activeColorsPreset,
          toggleTheme,
        }
      }}>
        {children}
      </StyledThemeProvider>
    </>
  );
};
