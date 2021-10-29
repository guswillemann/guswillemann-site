const gql = {
  query: async (queryString: string) => {
    return await fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.CMS_TOKEN}`,
      },
      body: JSON.stringify({
        query: queryString,
      }),
    }).then((res) => res.json())
      .catch((err) => console.log(err));
  },
};

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
    ... on VideoRecord {
      id
      src {
        providerUid
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
    const posts = await gql.query(`{
      allPosts (
        locale: ${locale},
        filter: { postType: { eq: "${type}" } },
        orderBy: _firstPublishedAt_DESC
      ) {
        ${PostCardSubQuery}
      }
    }`);

    return posts.data?.allPosts || null;
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

    const posts = await gql.query(`{
      ${getLast('article')}
      ${getLast('project')}
    }`);

    return {
      article: posts.data?.article[0] || null,
      project: posts.data?.project[0] || null,
    };
  },

  getPostPage: async (slug: string, locale: string) => {
    const page = await gql.query(`{
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
    }`);

    return page.data?.post || null;
  },
};

export default cms;
