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

  svg * {
    ${setThemeTransition(['fill', 'stroke'])};
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

export default SwitchWrapper;
