import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import ProjectsScreen, { PostsListScreenProps, POSTS_CARD_COOKIE } from '../../src/screens/PostsScreen';
import cms from '../../src/services/cms';

type ProjectPageProps = {
  articles: PostsListScreenProps['posts'];
  postCardCookie: PostsListScreenProps['postCardCookie'];
};

export default function ProjectPage({ articles, postCardCookie }: ProjectPageProps) {
  return <ProjectsScreen posts={articles} postCardCookie={postCardCookie} title="Artigos" />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const postCardCookie = parseCookies(ctx)[POSTS_CARD_COOKIE] || null;
  const cmsResponse = await cms.gql.query(`{
    allArticles (orderBy: _firstPublishedAt_DESC) {
      id
      title
      thumbnail {
        url
      }
      summary
      slug
    }
  }`);

  return {
    props: {
      postCardCookie,
      articles: cmsResponse.data?.allArticles || null,
    },
  };
};
