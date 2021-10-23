import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import useTranslation from '../../src/hook/useTranslation';
import ProjectsScreen, { PostsListScreenProps, POSTS_CARD_COOKIE } from '../../src/screens/PostsScreen';
import cms from '../../src/services/cms';

type ProjectPageProps = {
  articles: PostsListScreenProps['posts'];
  postCardCookie: PostsListScreenProps['postCardCookie'];
};

export default function ProjectPage({ articles, postCardCookie }: ProjectPageProps) {
  const { t } = useTranslation({
    en: { header: 'Projects' },
    pt: { header: 'Projetos' },
  });

  return <ProjectsScreen posts={articles} postCardCookie={postCardCookie} title={t('header')} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const postCardCookie = parseCookies(ctx)[POSTS_CARD_COOKIE] || null;
  const articles = await cms.getPostsList('articles', ctx.locale as string);

  return {
    props: {
      postCardCookie,
      articles,
    },
  };
};
