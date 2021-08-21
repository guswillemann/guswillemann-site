import { css } from 'styled-components';

const paddingWidth = '4px';

export const animationLessStyle = css`
  position: relative;
  padding: ${paddingWidth};
  
  .project-thumbnail {
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  .project-info {
    margin-top: 1.5rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      display: inline-block;

      position: absolute;
      top: 2.5rem;
      left: 0;

      padding: ${paddingWidth};
      border-radius: ${({ theme }) => theme.borderRadius};
      border: 4px solid ${({ theme }) => theme.colors.primaryMain};
      background-color: ${({ theme }) => theme.colors.background};
    }

    a {
      transition: filter 150ms ease-in-out;

      text-align: center;

      padding: 0.5rem;
      background-color: ${({ theme }) => theme.colors.primaryDetails};
      border-radius: calc(${({ theme }) => theme.borderRadius} / 2);
      
      color: inherit;
      text-decoration: none;
      font-weight: 700;

      &:hover {
        filter: brightness(75%);
      }
    }

    .project-summary {
      height: 15rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
    }
  }
`;
