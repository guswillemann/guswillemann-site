import { css } from 'styled-components';

export const defaultButtonStyle = css`
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.box.contrast};
  border: 1px solid ${({ theme }) => theme.colors.box.contrast};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1rem;

  &:hover {
    filter: brightness(0.75);
  }
`;