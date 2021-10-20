import styled from 'styled-components';

const BurgerButtonWrapper = styled.section`
  cursor: pointer;

  svg {
    width: 3.5rem;
    height: auto;
  }

  path {
    transition: 500ms ease-in-out;
    transition-property: transform stroke;
    transform-origin: 0 60%;
  }

  path.W1 {
    transform: translate(-22.2%, 0) rotate(-15deg);
    animation: 500ms ease-in-out reverse PW2;
    stroke: ${({ theme }) => theme.colors.primary.color};
  }

  path.W2 {
    transform: translate(-22.2%, 0) rotate(15deg);
    animation: 500ms ease-in-out reverse PW1;
    stroke: ${({ theme }) => theme.colors.primary.color};
  }

  path.W3 {
    transform: translate(22.2%, 0) rotate(-15deg);
    animation: 500ms ease-in-out reverse PW4;
    stroke: ${({ theme }) => theme.colors.secondary.color};
  }

  path.W4 {
    transform: translate(22.2%, 0) rotate(15deg);
    animation: 500ms ease-in-out reverse PW3;
    stroke: ${({ theme }) => theme.colors.secondary.color};
  }

  &.closed path {
    stroke: ${({ theme }) => theme.colors.box.contrast};
  }

  &.closed path.W1 {
    animation: 500ms ease-in-out forwards PW1;
  }

  &.closed path.W2 {
    animation: 500ms ease-in-out forwards PW2;
  }

  &.closed path.W3 {
    animation: 500ms ease-in-out forwards PW3;
  }

  &.closed path.W4 {
    animation: 500ms ease-in-out forwards PW4;
  }

  @keyframes PW1 {
    40% {
      transform-origin: 0 0;
      transform: translate(0, 0) rotate(0deg);
    }
    100% {
      transform-origin: 0 0;
      transform: translate(0, -40%) rotate(90deg);
    }
  }

  @keyframes PW2 {
    40% {
      transform-origin: 0 0;
      transform: translate(0, 0) rotate(0deg);
    }
    100% {
      transform-origin: 0 0;
      transform: translate(0, 0%) rotate(90deg);
    }
  }

  @keyframes PW3 {
    40% {
      transform-origin: 0 0;
      transform: translate(0, 0) rotate(0deg);
    }
    100% {
      transform-origin: 0 0;
      transform: translate(0, 0%) rotate(90deg);
    }
  }

  @keyframes PW4 {
    40% {
      transform-origin: 0 0;
      transform: translate(0, 0) rotate(0deg);
    }
    100% {
      transform-origin: 0 0;
      transform: translate(0, 40%) rotate(90deg);
    }
  }
`;

export default BurgerButtonWrapper;