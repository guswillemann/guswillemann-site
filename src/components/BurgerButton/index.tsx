import clsx from 'clsx';
import { ButtonHTMLAttributes, useState, MouseEvent as ReactMouseEvent } from 'react';
import { useTheme } from 'styled-components';
import BurgerButtonWrapper from './styles';

interface BurgerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
}

export default function BurgerButton({ isOpen, onClick, ...props }: BurgerButtonProps) {
  const [isTouched, setIsTouched] = useState(false);
  const { colors } = useTheme();

  const handleClick = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) onClick(e);
    setIsTouched(true);
  };

  return (
    <BurgerButtonWrapper
      className={clsx({
        open: isOpen,
        closed: !isOpen && isTouched,
      })}
      onClick={handleClick}
      {...props}
    >
      <svg width="100" height="75" viewBox="-50 -37.5 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="w1" d="M-40 -30 L40 -30"
          stroke={colors.box.contrast}
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path className="w2" d="M-40 0 L40 0"
          stroke={colors.box.contrast}
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path className="w3" d="M-40 0 L40 0"
          stroke={colors.box.contrast}
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path className="w4" d="M-40 30 L40 30"
          stroke={colors.box.contrast}
          strokeWidth="12"
          strokeLinecap="round"
        />
      </svg>
    </BurgerButtonWrapper>
  );
}
