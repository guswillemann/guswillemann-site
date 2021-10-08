import { css } from 'styled-components'

const paddingWidth = '4px';

export const defaultStyle = css`
  position: relative;
  padding: ${paddingWidth};

  border-radius: ${({ theme }) => theme.borderRadius};

  .project-thumbnail {
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 2px ridge;
  }
  
  .project-info {
    transition: 300ms ease-in-out;

    position: absolute;
    
    top: 10%;
    left: 0;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    min-width: 0;
    min-height: 0;

    padding: ${paddingWidth};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 4px solid ${({ theme }) => theme.colors.primary.color};
    background-color: ${({ theme }) => theme.colors.background.color};
    
    overflow: hidden;

    h2 {
      margin-bottom: 0;
      transition-delay: 150ms;
      transition-property: margin-bottom;
    }

    a {
      transition: 300ms ease-in-out;
      transition-delay: 0ms, -150ms;
      transition-property: opacity, filter;

      position: absolute;
      top: ${paddingWidth};
      right: ${paddingWidth};
  
      opacity: 0;
        
      padding: 0.5rem;
      background-color: ${({ theme }) => theme.colors.secondary.color};
      border-radius: calc(${({ theme }) => theme.borderRadius} / 2);
      
      color: inherit;
      text-decoration: none;
      font-weight: 700;
  
      &:hover {
        filter: brightness(75%);
      }
    }
  }
  
  .project-summary-container {
    position: relative;
    flex: 1;
    width: 0;
    opacity: 0;
    transition-delay: 0ms;
    transition-property: opacity;
    overflow: hidden;
  }

  .project-summary {
    position: absolute;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  
    padding: ${paddingWidth};
  }
  
  &:hover, &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.color};

    .project-info {
      top: 0;
      min-width: 100%;
      min-height: 100%;
      
      h2 {
        margin-bottom: 1rem;
      }

      a {
        opacity: 1;
      }
    }

    .project-summary-container {
      transition: 150ms ease-out;

      width: 100%;
      opacity: 1;
      transition-delay: 300ms;
      transition-property: opacity;
      overflow-y: auto;
    }
  }
`;
