import { gql } from 'graphql-request';
import { PostType } from '../../types';
import cmsClient from './cmsClient';

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

const querys = {
  articles: gql`query ArticlesQuery($locale: SiteLocale = en) {
    allArticles(locale: $locale) {
      slug
      id
      title
      thumbnail {
        ${ImageSubQuery}
      }
      summary {
        ${PostSummarySubQuery}
      }
    }
  }`,
  
  projects: gql`query ProjectsQuery($locale: SiteLocale = en) {
    allProjects(locale: $locale) {
      id
      title
      repoUrl
      deployUrl
      thumbnail {
        ${ImageSubQuery}
      }
      summary {
        ${PostSummarySubQuery}
      }
    }
  }`,
  
  lastPosts: gql`query LastPosts($locale: SiteLocale = en) {
    allArticles(
      orderBy: _createdAt_DESC,
      first: "1",
      locale: $locale,
    ) {
      slug
      id
      title
      thumbnail {
        ${ImageSubQuery}
      }
      summary {
        ${PostSummarySubQuery}
      }
    }
    allProjects(
      orderBy: _createdAt_DESC,
      first: "1",
      locale: $locale,
    ) {
      id
      title
      repoUrl
      deployUrl
      thumbnail {
        ${ImageSubQuery}
      }
      summary {
        ${PostSummarySubQuery}
      }
    }
  }`,

  articlePage: gql`query ArticlePageQuery($locale: SiteLocale = en, $slugeq: String = "") {
    article(locale: $locale, filter: {slug: {eq: $slugeq}}) {
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
  }`,
};


const cms = {
  getPostsList: async (type: PostType, locale: string) => {
    const typeMap = {
      article: {
        responseField: 'allArticles',
        query: querys.articles
      },
      project: {
        responseField: 'allProjects',
        query: querys.projects
      },
    };

    const data = await cmsClient.request(typeMap[type].query, { locale });
    return data[typeMap[type].responseField] || null;
  },

  getLastPosts: async (locale: string) => {
    const data = await cmsClient.request(querys.lastPosts, { locale });
    return {
      article: data.allArticles[0] || null,
      project: data.allProjects[0] || null,
    };
  },

  getArticlePage: async (slug: string, locale: string) => {
    const data = await cmsClient.request(querys.articlePage, { locale, slugeq: slug });
    return data.article || null;
  },
};

export default cms;
