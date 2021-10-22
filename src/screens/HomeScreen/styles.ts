import styled, { css } from 'styled-components';
import Link from '../../components/Link';
import atMediaBreakpoints from '../../theme/util/atMediaBreakpoints';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .screen-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 2rem;
  }

  .posts-container {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 1fr;
    margin-bottom: 2rem;

    ${atMediaBreakpoints({
      lg: css`
        grid-template-columns: 1fr 1fr;
        grid-gap: 1rem;
        margin-bottom: 0;
      `,
    })}

    & > div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  .about-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: "header" "description" "tools";
    grid-gap: 2rem;
    justify-content: center;
    justify-items: center;
    align-items: center;

    ${atMediaBreakpoints({
        lg: css`
          grid-template-columns: 1fr 1fr;
          grid-template-areas: "header header" "photo tools" "photo description";
        `,
      })}
    
    h2 {
      grid-area: header;
      justify-self: flex-start;
    }
    
    .about-photo {
      grid-area: photo;
      border-radius: calc(2 * ${({ theme }) => theme.borderRadius});
      display: none;
      width: 80%;

      ${atMediaBreakpoints({
        lg: css`
          display: initial;
        `,
      })}
    }
  }

  .about-tools {
    grid-area: tools;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;

    ${atMediaBreakpoints({
      lg: css`
        align-self: flex-start;
        width: 100%;
      `,
    })}
  }

  .about-description {
    grid-area: description;

    p:not(:last-child) {
      margin-bottom: 1rem;
    }
    
    ${atMediaBreakpoints({
      lg: css`
        padding-right: 10%;
      `,
    })}
  }
`;

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

export const TechnologylLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 4rem;
  }
`;

export default HomeWrapper;
