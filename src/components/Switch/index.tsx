import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import setThemeTransition from '../../theme/util/setThemeTransition';

const SwitchWrapper = styled.button`
  overflow: hidden;
  
  border-radius: 3rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.background.color};

  ${setThemeTransition(['background-color'])}

  .switch-handle {
    fill: ${({ theme }) => theme.colors.background.contrast};

    ${setThemeTransition(['fill'])};
  }

  &:hover, &:focus {
    .switch-handle {
      fill: ${({ theme }) => theme.colors.primary.color};
    }
  }

  .icons-container {
    width: 7rem;
    display: grid;
    grid-template-columns: 2rem 3rem 2rem;
    grid-gap: 1rem;
    padding: 0 1rem;
    justify-items: center;
    align-items: center;

    ${setThemeTransition(['transform'])}
  }

  &.state-two {
    .icons-container {
      transform: translate(-4rem);
    }
  }

  .dynamic-fill {
    fill: ${({ theme }) => theme.colors.background.contrast};
  }
  
  .dynamic-stroke {
    stroke: ${({ theme }) => theme.colors.background.contrast};
  }
`;

interface SwitchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  stateOneIcon: ReactNode;
  stateTwoIcon: ReactNode;
  currentState: boolean;
};

export default function Switch({
  stateOneIcon,
  stateTwoIcon,
  currentState,
  className,
  ...props
}: SwitchProps) {
  return (
    <SwitchWrapper
      {...props}
      className={clsx([
        className,
        currentState ? 'state-one' : 'state-two',
      ])}
    >
      <div className="icons-container">
        {stateOneIcon}
        <svg viewBox="0 0 100 100">
          <circle className="switch-handle" fill="white" cx="50" cy="50" r="40" strokeWidth="5" />
        </svg>
        {stateTwoIcon}
      </div>
    </SwitchWrapper>
  );
}