import { css, DefaultTheme } from 'styled-components';
import { ToggleableProp } from '..';

const iconHoverCss = ({ theme }: { theme: DefaultTheme }) => css`
  .dynamic-stroke {
    transition: 150ms ease-in-out stroke;
    stroke: ${theme.colors.text};
  };
  
  .dynamic-fill {
    transition: 150ms ease-in-out fill;
    fill: ${theme.colors.text};
  };

  &:hover, &:focus {
    .dynamic-stroke {
      stroke: ${theme.colors.primaryDetails};
    };
    
    .dynamic-fill {
      fill: ${theme.colors.primaryDetails};
    };
  }
`;

export const iconButtonStyle = css<{ toggleable?: ToggleableProp}>`
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
          &:hover, &:focus {
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
