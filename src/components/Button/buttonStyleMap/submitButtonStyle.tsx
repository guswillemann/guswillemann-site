import { css } from 'styled-components';

export const submitButtonStyle = css`
  height: 4rem;
  background-color: transparent;
  transition: ease-in-out 150ms;
  cursor: pointer;
  border: none;

  font-weight: 700;
  
  ${({ theme }) => ({
    borderRadius: theme.borderRadius,
    color: theme.colors.text,
    backgroundColor: theme.colors.success,
  })};

  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: initial;
  }
`;