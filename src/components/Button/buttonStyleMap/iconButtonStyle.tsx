import { css, DefaultTheme } from 'styled-components';
import { ToggleableProp } from '..';

const iconHoverCss = ({ theme }: { theme: DefaultTheme }) => css`
  &:hover, &:focus {
    .dynamic-stroke {
      stroke: ${theme.colors.secondary.color};
    };
    
    .dynamic-fill {
      fill: ${theme.colors.secondary.color};
    };
  }
`;

export const iconButtonStyle = css<{ toggleable?: ToggleableProp}>`
  background-color: transparent;
  border: none;
  cursor: pointer;

  .dynamic-stroke {
    transition: 150ms ease-in-out stroke;
  }
  
  .dynamic-fill {
    transition: 150ms ease-in-out fill;
  }

  ${({ theme, toggleable }) => {
    if (toggleable) {return css`
      .dynamic-stroke {
        stroke: ${toggleable?.isActive ? theme.colors.secondary.color : theme.colors.box.contrast};
      }
      
      .dynamic-fill {
        fill: ${toggleable?.isActive ? theme.colors.secondary.color : theme.colors.box.contrast};
      }
      
      ${() => {
        if (!toggleable.oneWay) return css`
          &:hover, &:focus {
            .dynamic-stroke {
              stroke: ${!toggleable?.isActive ? theme.colors.secondary.color : theme.colors.box.contrast};
            }
            
            .dynamic-fill {
              fill: ${!toggleable?.isActive ? theme.colors.secondary.color : theme.colors.box.contrast};
            }
          }
        `;
        
        return css`
          ${iconHoverCss};
          ${toggleable.isActive && 'cursor: initial'};
        `;
      }}
    `;}

    return css`
      .dynamic-stroke {
        stroke: ${theme.colors.box.contrast};
      };
      
      .dynamic-fill {
        fill: ${theme.colors.box.contrast};
      };
      
      ${iconHoverCss};
    `;
  }};
`;
