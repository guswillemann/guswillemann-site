import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import { ButtonVariants, buttonStyleMap } from './buttonStyleMap';

export type ToggleableProp = { isActive: boolean, oneWay?: boolean };

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant: ButtonVariants;
  toggleable?: ToggleableProp;
};

const ButtonWrapper = styled.button<{ variant: ButtonVariants; toggleable?: ToggleableProp }>`
  ${({ variant }) => buttonStyleMap[variant]};
`;

export default function Button({ variant = 'default', children, ...props }: ButtonProps) {
  return (
    <ButtonWrapper variant={variant} {...props}>
      {children}
    </ButtonWrapper>
  );
}
