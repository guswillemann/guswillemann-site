import clsx from 'clsx';
import BurgerButtonWrapper from './styles';

export default function BurgerButton({isOpen, ...props}: any) {
  return (
    <BurgerButtonWrapper className={clsx({ closed: !isOpen })} {...props}>
      <svg width="100" height="75" viewBox="-50 -37.5 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="W1" d="M0 -60 L0 60Z"
          stroke="darkgreen"
          strokeWidth="12"
        />
        <path className="W2" d="M0 -60 L0 60Z"
          stroke="darkgreen"
          strokeWidth="12"
        />
        <path className="W3" d="M0 -60 L0 60Z"
          stroke="green"
          strokeWidth="12"
        />
        <path className="W4" d="M0 -60 L0 60Z"
          stroke="green"
          strokeWidth="12"
        />
      </svg>
    </BurgerButtonWrapper>
  );
}