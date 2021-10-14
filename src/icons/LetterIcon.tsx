import styled, { useTheme } from 'styled-components';
import setThemeTransition from '../util/setThemeTransition';

const LetterIconWrapper = styled.svg`
  border: 4px solid transparent;
  border-radius: 8px;
  
  ${setThemeTransition(['background-color', 'border-color'])}

  path, rect {
    ${setThemeTransition(['fill', 'stroke'])}
  }

  &.dark {
    fill: black;
    border-color: black;

    path, rect {
      stroke: white;
    }
  }
  
  &.light {
    fill: white;
    border-color: white;

    path, rect {
      stroke: black;
    }
  }

  &:hover {
    filter: brightness(0.75);
  }
`;

export default function LetterIcon() {
  const { currentActive } = useTheme();

  return (
    <LetterIconWrapper className={currentActive} width="100" height="100" viewBox="0 0 100 100" fill="black" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="12" width="96" height="76" rx="6" stroke="#FAFAFA" strokeWidth="8"/>
      <path d="M94.7881 13H5.21192C3.37895 13 2.51155 15.2604 3.87399 16.4866L47.3241 55.5917C48.8454 56.9608 51.1546 56.9608 52.6759 55.5917L96.126 16.4866C97.4884 15.2604 96.6211 13 94.7881 13Z" stroke="#FAFAFA" strokeWidth="8"/>
    </LetterIconWrapper>
  );
}
