import styled from 'styled-components';
import { postCardStyleMap, PostCardVariants } from './postCardStyleMap';

const PostCardWrapper = styled.div<{ variant: PostCardVariants }>`
  ${({ variant }) => postCardStyleMap[variant]};

  .post-link {
    padding: 0.5rem;
    background-color: ${({ theme }) => theme.colors.secondary.color};
    border-radius: calc(${({ theme }) => theme.borderRadius} / 2);
    
    color: inherit;
    text-decoration: none;
    font-weight: 700;
    text-align: center;

    &:hover {
      filter: brightness(75%);
    }
  }

  .tech-link {
    color: ${({ theme }) => theme.colors.secondary.color};
    text-decoration: none;
    cursor: pointer;
    word-wrap: break-word;
  }
`;

export default PostCardWrapper;
