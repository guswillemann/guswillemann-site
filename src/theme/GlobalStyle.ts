import { createGlobalStyle, DefaultTheme } from 'styled-components';
import setThemeTransition from './util/setThemeTransition';

const GlobalStyle = createGlobalStyle<{ colors: DefaultTheme['colors'] }>`
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
      background: ${({ colors }) => colors.box.color};
      border-radius: 8px;
      margin: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: ${({ colors }) => colors.secondary.color};
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: ${({ colors }) => colors.primary.color};
    }

    /* scrollbar Firefox */
    scrollbar-color: ${({ colors }) => `${colors.primary.color} ${colors.box.color}`};
    scrollbar-width: thin;
  }
  
  body {
    background-color: ${({ colors }) => colors.background.color};
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

export default GlobalStyle;