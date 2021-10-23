import styled from 'styled-components';
import Box from '../../Box';

export const ThemeBoxWrapper = styled(Box)`
  .dark-light-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .language-toggle {
      width: 3rem;
      height: 3rem;
      padding: 0.5rem 0;
      font-weight: 700;
      text-transform: uppercase;
    }

    .plus-theme {
      width: 3rem;
      padding: 0.75rem;
      
      svg {
        transform: rotate(45deg);
      }
    }
  }
  
  .palettes-container {
    overflow: hidden;
    max-height: 0;
    transition: all 300ms ease-out;
    visibility: hidden;
    
    &.customizing {
      margin-top: 2rem;
      max-height: 33rem;
      visibility: initial;
    }
  }

  .color-palette-label {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .customization-controls {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }
`;