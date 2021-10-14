import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    currentActive: 'light' | 'dark';
    borderRadius: string;
    colors: {
      background: {
        color: string;
        contrast: string;
      };
      box: {
        color: string;
        contrast: string;
      };
      primary: {
        color: string;
        contrast: string;
      };
      secondary: {
        color: string;
        contrast: string;
      };
      success: {
        color: string;
        contrast: string;
      };
      error: {
        color: string;
        contrast: string;
      };
    }
  }
}
