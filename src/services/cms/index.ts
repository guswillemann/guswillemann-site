import { gql } from 'graphql-request';
import cmsClient from './cmsClient';

type PostType = 'article' | 'project';

const ImageSubQuery = `
  url
  alt
  blurUpThumb
  width
  height
`;

const PostSummarySubQuery = `
  value
`;

const PostDescriptionSubQuery = `
  value
  blocks {
    __typename
    ... on ImageRecord {
      id
      file {
        ${ImageSubQuery}
      }
    }
    ... on VideoUrlRecord {
      id
      src {
        providerUid
      }
    }
    ... on VideoFileRecord {
      id
      file {
        alt
        blurUpThumb
        width
        height
        video {
          streamingUrl
          mp4Url
        }
      }
    }
  }
`;

const PostCardSubQuery = `
  id
  title
  slug
  summary {
    ${PostSummarySubQuery}
  }
  thumbnail {
    ${ImageSubQuery}
  }
`;

const cms = {
  getPostsList: async (type: PostType, locale: string) => {
    const postsQuery = gql`{
      allPosts (
        locale: ${locale},
        filter: { postType: { eq: "${type}" } },
        orderBy: _firstPublishedAt_DESC
      ) {
        ${PostCardSubQuery}
      }
    }`;

    const posts = await cmsClient.request(postsQuery);

    return posts.allPosts || null;
  },

  getLastPosts: async (locale: string) => {
    const getLast = (type: PostType) => `${type}: allPosts (
      orderBy: _createdAt_DESC,
      first: "1",
      locale: ${locale},
      filter: { postType: { eq: "${type}" } }
    ) {
      ${PostCardSubQuery}
    }`;

    const lastPostsQuery = gql`{
      ${getLast('article')}
      ${getLast('project')}
    }`;

    const posts = await cmsClient.request(lastPostsQuery);

    return {
      article: posts.article[0] || null,
      project: posts.project[0] || null,
    };
  },

  getPostPage: async (slug: string, locale: string) => {
    const postPageQuery = gql`{
      post (locale: ${locale}, filter: {slug: {eq: "${slug}"}}) {
        title
        summary {
          ${PostSummarySubQuery}
        }
        thumbnail {
          ${ImageSubQuery}
        }
        description {
          ${PostDescriptionSubQuery}
        }
      }
    }`;
    
    const postPage = await cmsClient.request(postPageQuery);

    return postPage.post || null;
  },
};

export default cms;
