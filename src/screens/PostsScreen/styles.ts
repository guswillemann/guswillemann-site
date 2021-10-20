import styled, { css } from 'styled-components';
import atMediaBreakpoints from '../../theme/util/atMediaBreakpoints';

export const ScreenHeader = styled.div`
  display: flex;
  justify-content: space-between;

  h1 {
    margin-bottom: 2rem;
  }

  & > div {
    display: flex;
    align-items: center;

    & > span {
      margin-right: 1rem;
    }
  }
`;

export const PostsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  ${atMediaBreakpoints({
    lg: css`
      grid-template-columns: 1fr 1fr;
    `,
  })}
`;
