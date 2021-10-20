import styled, { css } from 'styled-components';
import atMediaBreakpoints from '../../../theme/util/atMediaBreakpoints';
import Box from '../../Box';

export const NavBoxWrapper = styled(Box)`
  flex: 1;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  ${atMediaBreakpoints({
    md: css`
      flex: initial;

      ul {
        flex-direction: column;
        gap: 1rem;
      }
    `,
  })}
`;