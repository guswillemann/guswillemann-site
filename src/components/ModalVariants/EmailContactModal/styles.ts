import styled from 'styled-components';
import { animationDuration } from './SucessFeedBack';

const EmailModalWrapper = styled.div`
  @keyframes grow {
    0% { transform: scale(0.65) };
    100% { transform: scale(1) };
  }
  
  @keyframes shrink {
    0% { transform: scale(1) };
    100% { transform: scale(0.65) };
  }

  position: relative;
  
  width: clamp(30%, 500px, 100%);
  padding: 2rem;

  justify-self: center;
  align-self: center;
  
  ${({ theme }) => ({
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.box.color,
    color: theme.colors.box.contrast,
  })};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  
  animation: 300ms ease-in-out shrink;
  
  &.visible {
    animation: 300ms ease-in-out grow;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    width: 100%;
  }

  .label-input {
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 100%;

    ${({ theme }) => ({
      backgroundColor: theme.colors.background.color,
      color: theme.colors.background.contrast,
      borderRadius: theme.borderRadius,
    })};

    padding: 1rem;

    input {
      color: inherit;
      background-color: inherit;
      border: none;
      flex: 1;
      width: 1px;
      padding: 0.5rem;
    }
  }

  .label-textarea {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding: 1rem;

    ${({ theme }) => ({
      backgroundColor: theme.colors.background.color,
      color: theme.colors.background.contrast,
      borderRadius: theme.borderRadius,
    })};

    textarea {
      color: inherit;
      background-color: inherit;
      border: none;
      resize: vertical;
      padding: 0.5rem;
      min-height: 15rem;
    }
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;

    width: 2rem;
    height: 2rem;
  }

  &.success {
    transition: transform ${animationDuration * (1/4)}ms ease-in-out;
    transition-delay: ${animationDuration * (3/4)}ms;
    transform: scale(0);
  }

  .error-message  {
    color: ${({ theme }) => theme.colors.error.color};
    text-align: center;
  }
`;

export default EmailModalWrapper;
