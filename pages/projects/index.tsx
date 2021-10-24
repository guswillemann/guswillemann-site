import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import SEO from '../../src/components/Meta/SEO';
import useTranslation from '../../src/hook/useTranslation';
import ProjectsScreen, { PostsListScreenProps, POSTS_CARD_COOKIE } from '../../src/screens/PostsScreen';
import cms from '../../src/services/cms';

type ProjectPageProps = {
  projects: PostsListScreenProps['posts'];
  postCardCookie: PostsListScreenProps['postCardCookie'];
};

export default function ProjectPage({ projects, postCardCookie }: ProjectPageProps) {
  const { t } = useTranslation({
    en: { header: 'Projects' },
    pt: { header: 'Projetos' },
  });

  const pageTitle = t('header');

  return (
    <>
      <SEO pageTitle={pageTitle} />
      <ProjectsScreen posts={projects} postCardCookie={postCardCookie} title={pageTitle} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const postCardCookie = parseCookies(ctx)[POSTS_CARD_COOKIE] || null;
  const projects = await cms.getPostsList('projects', ctx.locale as string);

  return {
    props: {
      postCardCookie,
      projects,
    },
  };
};
