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

  img {
    width: 90%;
    margin: 2rem auto;
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  iframe {
    display: block;
    margin: 2rem auto;
    border-radius: ${({ theme }) => theme.borderRadius};

  }

  a {
    color: ${({ theme }) => theme.colors.secondary.color};
    text-decoration: none;
    cursor: pointer;

    &:hover {
      filter: brightness(0.75);
    }
  }
`;

export default PostScreenWrapper;
