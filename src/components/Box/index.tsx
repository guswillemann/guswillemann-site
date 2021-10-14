import styled, { css } from 'styled-components';
import setThemeTransition from '../../util/setThemeTransition';

const Box = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.box.color};
    color: ${theme.colors.box.contrast};
    border-radius: ${theme.borderRadius};
  `};
  
  ${setThemeTransition(['color', 'background-color'])}
  
  padding: 2.5rem;
  box-shadow: 0 0 10px -3px black;
`;

export default Box;
