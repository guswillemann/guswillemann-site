import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import setThemeTransition from '../../util/setThemeTransition';

const ColorInputWrapper = styled.div<{ selectedColor: string }>`
  ${setThemeTransition(['background-color'])};
  
  display: inline-block;
  background-color: ${({ selectedColor }) => selectedColor};
  border: none;
  width: 3rem;
  height: 3rem;

  border: 2px ridge white;
  
  input {
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  &:focus-within {
    outline: auto;
  }
`;

type ColorInputProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string;
}

export default function ColorInput(props: ColorInputProps) {
  return (
    <ColorInputWrapper selectedColor={props.value}>
      <input
        aria-label={`Selecione a cor de ${props.name}`}
        type="color"
        {...props}
      />
    </ColorInputWrapper>
  );
}