import styled from 'styled-components';
import Box from '../../Box';

export const SocialBoxWrapper = styled(Box)`
  ul {
    list-style: none;
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
  }  

  li {
    border-radius: ${({ theme }) => theme.borderRadius};

    width: 3.5rem;
    height: 3.5rem;
  }
`;