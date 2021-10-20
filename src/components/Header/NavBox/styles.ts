import styled from 'styled-components';
import Box from '../../Box';

export const NavBoxWrapper = styled(Box)`
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    text-align: center;
  }
`;