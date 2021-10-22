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
      .catch(() => ({ error: 'Failed to fetch' }));
  },
};

const cms = {
  getPostsList: async (type: 'articles' | 'projects') => {
    const modelType = type === 'articles' ? 'allArticles' : 'allProjects';

    const posts = await gql.query(`{
      ${modelType} (orderBy: _firstPublishedAt_DESC) {
        id
        title
        thumbnail {
          url
        }
        summary
        slug
      }
    }`);

    return posts.data?.[modelType] || null;
  },

  getLastPosts: async () => {
    const postQuery = `(orderBy: _createdAt_DESC, first: "1") {
      thumbnail {
        url
      }
      id
      slug
      summary
      title
    }`;

    const posts = await gql.query(`{
      allArticles${postQuery}
      allProjects${postQuery}
    }`);

    return {
      article: posts.data?.allArticles[0] || null,
      project: posts.data?.allProjects[0] || null,
    };
  },

  getPostPage: async (type: 'article' | 'project', name: string) => {
    const page = await gql.query(`{
      ${type} (filter: {
        slug: {
          eq: "${name}"
        }
      }) {
        title
        thumbnail {
          url
        }
        description
        summary
      }
    }`);

    return page.data?.[type] || null;
  },
};

export default cms;
