import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import ProjectsScreen, { PostsListScreenProps, POSTS_CARD_COOKIE } from '../../src/screens/PostsScreen';
import cms from '../../src/services/cms';

type ProjectPageProps = {
  projects: PostsListScreenProps['posts'];
  postCardCookie: PostsListScreenProps['postCardCookie'];
};

export default function ProjectPage({ projects, postCardCookie }: ProjectPageProps) {
  return <ProjectsScreen posts={projects} postCardCookie={postCardCookie} title="Projetos" />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const postCardCookie = parseCookies(ctx)[POSTS_CARD_COOKIE] || null;
  const projects = await cms.getPostsList('projects');

  return {
    props: {
      postCardCookie,
      projects,
    },
  };
};
