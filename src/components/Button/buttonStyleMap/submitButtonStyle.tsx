import { css } from 'styled-components';

export const submitButtonStyle = css`
  height: 4rem;
  background-color: transparent;
  transition: ease-in-out 150ms;
  
  ${({ theme }) => ({
    borderRadius: theme.borderRadius,
    color: theme.colors.text,
    border: `4px solid ${theme.colors.primaryMain}`,
  })};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryMain};
    cursor: pointer;
  }

  &:disabled {
    border-color: grey;
  }
`;