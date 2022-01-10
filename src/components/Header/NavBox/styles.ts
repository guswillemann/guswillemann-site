import styled, { css } from 'styled-components';
import atMediaBreakpoints from '../../../theme/util/atMediaBreakpoints';
import Box from '../../Box';
import Link from '../../Link';

export const NavBoxWrapper = styled(Box)`
  flex: 1;
  position: sticky;
  top: 1.5rem;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
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

export const NavLink = styled(Link)`
  &.current-page {
    color: ${({ theme }) => theme.colors.primary.color};
    font-weight: 700;
  }
`;
