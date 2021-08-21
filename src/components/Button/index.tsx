import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import { ButtonVariants, buttonStyleMap } from './buttonStyleMap';

const ButtonWrapper = styled.button<{ variant: ButtonVariants; toggleable?: { isActive: boolean } }>`
  ${({ variant }) => buttonStyleMap[variant]};
`;

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant: ButtonVariants;
  toggleable?: { isActive: boolean };
};

export default function Button({ variant = 'default', children, ...props }: ButtonProps) {
  return (
    <ButtonWrapper variant={variant} {...props}>
      {children}
    </ButtonWrapper>
  );
}
