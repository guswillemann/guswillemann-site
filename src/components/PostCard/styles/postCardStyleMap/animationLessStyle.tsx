import { css } from 'styled-components';
import setThemeTransition from '../../../../theme/util/setThemeTransition';

const paddingWidth = '4px';

export const animationLessStyle = css`
  position: relative;
  padding: ${paddingWidth};
  
  .post-thumbnail {
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  .post-info {
    margin-top: 1.5rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    .post-title {
      font-size: 2rem;
      font-weight: 700;

      display: inline-block;

      position: absolute;
      top: 2.5rem;
      left: 0;

      padding: ${paddingWidth};
      border-radius: ${({ theme }) => theme.borderRadius};
      border: 4px solid ${({ theme }) => theme.colors.primary.color};
      background-color: ${({ theme }) => theme.colors.background.color};
      color: ${({ theme }) => theme.colors.background.contrast};
    
      ${setThemeTransition(['color', 'background-color', 'border-color'])}
    }

    a {
      transition: filter 150ms ease-in-out;

      text-align: center;

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

    .post-summary {
      height: 15rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
    }
  }
`;
