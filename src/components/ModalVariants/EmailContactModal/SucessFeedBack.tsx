import styled from 'styled-components';

export const animationDuration = 1750;

const SuccessFeedBackWrapper = styled.div`
  @keyframes success {
    0% {
      transform: scale(0);
    }
    70% {
      transform: scale(2);
    }
    100% {
      transform: scale(2);
    }
  }

  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  &::before {
    position: absolute;
    top: 0;

    width: 100%;
    height: 100%;

    content: '';

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.success.color};
    animation: ${animationDuration}ms success forwards ease-in-out;
    border-radius: 25%;
  }

  img {
    animation: ${animationDuration}ms success forwards ease-in-out;
  }
`;

export default function SuccessFeedBack() {
  return (
    <SuccessFeedBackWrapper>
      <img src="/success_tick.svg" alt="success tick" />
    </SuccessFeedBackWrapper>
  );
}