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
  getPostsList: async (type: 'articles' | 'projects', locale: string) => {
    const modelType = type === 'articles' ? 'allArticles' : 'allProjects';

    const posts = await gql.query(`{
      ${modelType} (orderBy: _firstPublishedAt_DESC, locale: ${locale}) {
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

  getLastPosts: async (locale: string) => {
    const postQuery = `(orderBy: _createdAt_DESC, first: "1", locale: ${locale}) {
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

  getPostPage: async (type: 'article' | 'project', slug: string, locale: string) => {
    const page = await gql.query(`{
      ${type} (locale: ${locale}, filter: {slug: {eq: "${slug}"}}) {
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
