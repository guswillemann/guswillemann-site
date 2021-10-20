import styled, { css } from 'styled-components';
import atMediaBreakpoints from '../../../theme/util/atMediaBreakpoints';
import Box from '../../Box';

export const LogoBoxWrapper = styled(Box)`
  display: none;
  
  ${atMediaBreakpoints({
    md: css`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    
      p {
        margin-top: 1rem;
        font-size: 2rem;
      }
    `,
  })}
`;