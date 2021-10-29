import styled from 'styled-components';

const PostScreenWrapper = styled.div`
  h1 {
    margin-bottom: 2rem;
  }

  h2 {
    margin-bottom: 1.5rem;
    margin-left: 3rem;
  }

  p {
    margin-bottom: 1rem;
  }

  .img-container {
    width: 80%;
    margin: 2rem auto;
    border-radius: ${({ theme }) => theme.borderRadius};
    overflow: hidden;
  }

  iframe {
    display: block;
    margin: 2rem auto;
    border-radius: ${({ theme }) => theme.borderRadius};
    max-width: 80%;
  }

  a {
    word-wrap: break-word;
    color: ${({ theme }) => theme.colors.secondary.color};
  }
`;

export default PostScreenWrapper;
