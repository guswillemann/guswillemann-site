import { css } from 'styled-components';

export const textOnlyButtonStyle = css`
  background-color: transparent;
  color: inherit;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  padding: 0.5rem;
  
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.box.contrast}20;
    color: ${({ theme }) => theme.colors.primary.color};
  }

  &:disabled {
    opacity: 0.5;
    background-color: transparent;
    color: inherit;
    cursor: initial;
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.box.contrast}40;
  }
`;