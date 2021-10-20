import styled from 'styled-components';
import { postCardStyleMap, PostCardVariants } from './postCardStyleMap';

const PostCardWrapper = styled.div<{ variant: PostCardVariants }>`
  ${({ variant }) => postCardStyleMap[variant]};
`;

export default PostCardWrapper;
