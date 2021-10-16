import 'styled-components';

declare module 'styled-components' {
  export interface ColorPallete {
    color: string;
    contrast: string;
  };
  
  export interface DefaultTheme {
    controls: {
      activeColorsPreset: (presetName: DefaultTheme['mode']) => void;
      updateColors: (newColors: DefaultTheme['colors']) => void;
      toggleTheme: () => void;
    };
    mode: 'light' | 'dark';
    borderRadius: string;
    colors: {
      background: ColorPallete;
      box: ColorPallete;
      primary: ColorPallete;
      secondary: ColorPallete;
      success: ColorPallete;
      error: ColorPallete;
    }
  }
};
