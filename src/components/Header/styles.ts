import styled, { css } from 'styled-components';
import atMediaBreakpoints from '../../theme/util/atMediaBreakpoints';

export const HeaderWrapper = styled.header`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;

  
  ${atMediaBreakpoints({
    md: css`
      width: 23.5rem;
      flex-direction: column;

      .burger-btn-box {
        display: none;
      }
    `,
  })}
`;

export const BurgerMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media screen and (max-width: 767px) {
    order: 2;
    width: 100%;
    display: none;

    &.open {
      display: flex;
    }
  }
`;