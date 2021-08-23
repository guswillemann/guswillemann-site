import { css, DefaultTheme } from 'styled-components';
import { ToggleableProp } from '..';

const iconHoverCss = ({ theme }: { theme: DefaultTheme }) => css`
  &:hover {
    .dynamic-stroke {
      transition: 150ms ease-in-out stroke;
      stroke: ${theme.colors.primaryDetails};
    };
    
    .dynamic-fill {
      transition: 150ms ease-in-out fill;
      fill: ${theme.colors.primaryDetails};
    };
  }
`;

export const iconButtonStyle = css<{ toggleable?: ToggleableProp}>`
  width: 4rem;
  height: 4rem;

  background-color: transparent;
  border: none;
  cursor: pointer;

  transition: 150ms ease-in-out filter;

  ${({ theme, toggleable }) => {
    if (toggleable) {return css`
      .dynamic-stroke {
        transition: 150ms ease-in-out stroke;
        stroke: ${toggleable?.isActive ? theme.colors.primaryDetails : theme.colors.text};
      }
      
      .dynamic-fill {
        transition: 150ms ease-in-out fill;
        fill: ${toggleable?.isActive ? theme.colors.primaryDetails : theme.colors.text};
      }
      
      ${() => {
        if (!toggleable.oneWay) return css`
          &:hover {
            .dynamic-stroke {
              stroke: ${!toggleable?.isActive ? theme.colors.primaryDetails : theme.colors.text};
            }
            
            .dynamic-fill {
              fill: ${!toggleable?.isActive ? theme.colors.primaryDetails : theme.colors.text};
            }
          }
        `;
        
        return css`
          ${iconHoverCss};
          ${toggleable.isActive && 'cursor: initial'};
        `;
      }}
    `;}

    return iconHoverCss;
  }};
`;
