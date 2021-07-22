import styled, { css } from 'styled-components';

const Box = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.box};
    color: ${theme.colors.text};
    border-radius: ${theme.borderRadius};
  `};

  padding: 2.5rem;
`;

export default Box;
