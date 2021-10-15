import { css } from 'styled-components';

export const textOnlyButtonStyle = css`
  cursor: pointer;
  background-color: transparent;
  color: inherit;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  padding: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.box.contrast}20;
    color: ${({ theme }) => theme.colors.primary.color};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.box.contrast}40;
  }
`;