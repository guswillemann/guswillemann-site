import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    colors: {
      background: string;
      box: string;
      text: string;
      primaryMain: string;
      primaryDetails: string;
      success: string;
      error: string;
    }
  }
}
