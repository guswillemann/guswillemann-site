import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import SwitchWrapper from './styles';

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
