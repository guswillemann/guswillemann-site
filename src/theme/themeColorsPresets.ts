import { DefaultTheme } from 'styled-components';

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

const themeColorsPresets = {
  dark: darkTheme,
  light: lightTheme,
}

export default themeColorsPresets;