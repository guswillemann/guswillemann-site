import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import { ButtonVariants, buttonStyleMap } from './buttonStyleMap';

export type ToggleableProp = { isActive: boolean, oneWay?: boolean };

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant: ButtonVariants;
  toggleable?: ToggleableProp;
  asAnchor?: boolean;
  href?: string;
};

const ButtonWrapper = styled.button<{ variant: ButtonVariants; toggleable?: ToggleableProp }>`
  ${({ variant }) => buttonStyleMap[variant]};
`;

export default function Button({ variant = 'default', children, asAnchor = false, ...props }: ButtonProps) {
  return (
    <ButtonWrapper as={asAnchor && 'a' as any} variant={variant} {...props}>
      {children}
    </ButtonWrapper>
  );
}
