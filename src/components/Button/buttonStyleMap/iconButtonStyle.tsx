import { css } from 'styled-components';

export const iconButtonStyle = css<{ toggleable?: { isActive: boolean }}>`
  width: 4rem;
  height: 4rem;

  background-color: transparent;
  border: none;
  cursor: pointer;

  transition: 150ms ease-in-out filter;

  ${({ theme, toggleable }) => {
    if (toggleable) return css`
      svg * {
        transition: 150ms ease-in-out stroke;
        stroke: ${toggleable?.isActive ? theme.colors.primaryDetails : theme.colors.text};
      }
      
      &:hover {
        svg * {
          stroke: ${!toggleable?.isActive ? theme.colors.primaryDetails : theme.colors.text};
        }
      }
    `;

    return css`
      &:hover {
        svg * {
          transition: 150ms ease-in-out stroke;
          stroke: ${theme.colors.primaryDetails};
        };
      }
    `;
  }};
`;
