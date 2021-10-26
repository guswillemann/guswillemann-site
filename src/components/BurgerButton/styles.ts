import styled from 'styled-components';
import setThemeTransition from '../../theme/util/setThemeTransition';

const BurgerButtonWrapper = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;

  svg {
    width: 3.5rem;
    height: auto;
  }

  path {
    ${setThemeTransition(['stroke'])}
  }

  &.closed path.w1 {
    animation: PW1-close 500ms ease-in-out forwards;
  }
  &.closed path.w2 {
    animation: PW2-close 500ms ease-in-out forwards;
  }
  &.closed path.w3 {
    animation: PW3-close 500ms ease-in-out forwards;
  }
  &.closed path.w4 {
    animation: PW4-close 500ms ease-in-out forwards;
  }

  &.open path.w1 {
    animation: PW1 500ms ease-in-out forwards;
    stroke: ${({ theme }) => theme.colors.primary.color};
  }
  &.open path.w2 {
    animation: PW2 500ms ease-in-out forwards;
    stroke: ${({ theme }) => theme.colors.primary.color};
  }
  &.open path.w3 {
    animation: PW3 500ms ease-in-out forwards;
    stroke: ${({ theme }) => theme.colors.secondary.color};
  }
  &.open path.w4 {
    animation: PW4 500ms ease-in-out forwards;
    stroke: ${({ theme }) => theme.colors.secondary.color};
  }

  @keyframes PW1 {
    40% {
      transform: rotate(-90deg) translate(0, 40%) scaleX(1.5);
    }
    100% {
      transform: rotate(-105deg) translate(0, -4%) scaleX(1.5);
    }
  }
  @keyframes PW2 {
    40% {
      transform: rotate(-90deg) translate(0, 0%) scaleX(1.5);
    }
    100% {
      transform: rotate(-75deg) translate(0, -13%) scaleX(1.5);
    }
  }
  @keyframes PW3 {
    40% {
      transform: rotate(-90deg) translate(0, 0%) scaleX(1.5);
    }
    100% {
      transform: rotate(-105deg) translate(0, 13%) scaleX(1.5);
    }
  }
  @keyframes PW4 {
    40% {
      transform: rotate(-90deg) translate(0, -40%) scaleX(1.5);
    }
    100% {
      transform: rotate(-75deg) translate(0, 4%) scaleX(1.5);
    }
  }

  @keyframes PW1-close {
    0% {
      transform: rotate(-105deg) translate(0, -4%) scaleX(1.5);
    }
    40% {
      transform: rotate(-90deg) translate(0, 40%) scaleX(1.5);
    }
    100% {
      transform: rotate(0deg) translate(0, 0%) scaleX(1);
    }
  }
  @keyframes PW2-close {
    0% {
      transform: rotate(-75deg) translate(0, -13%) scaleX(1.5);
    }
    40% {
      transform: rotate(-90deg) translate(0, 0%)  scaleX(1.5);
    }
    100% {
      transform: rotate(0deg) translate(0, 0%) scaleX(1);
    }
  }
  @keyframes PW3-close {
    0% {
      transform: rotate(-105deg) translate(0, 13%) scaleX(1.5);
    }
    40% {
      transform: rotate(-90deg) translate(0, 0%)  scaleX(1.5);
    }
    100% {
      transform: rotate(0deg) translate(0, 0%) scaleX(1);
    }
  }
  @keyframes PW4-close {
    0% {
      transform: rotate(-75deg) translate(0, 4%) scaleX(1.5);
    }
    40% {
      transform: rotate(-90deg) translate(0, -40%)  scaleX(1.5);
    }
    100% {
      transform: rotate(0deg) translate(0, 0%) scaleX(1);
    }
  }
`;

export default BurgerButtonWrapper;