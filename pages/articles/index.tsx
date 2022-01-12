import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import SEO from '../../src/components/Meta/SEO';
import useTranslation from '../../src/hook/useTranslation';
import PostsScreen, { PostsListScreenProps, POSTS_CARD_COOKIE } from '../../src/screens/PostsScreen';
import cms from '../../src/services/cms';

type ProjectPageProps = {
  articles: PostsListScreenProps['posts'];
  postCardCookie: PostsListScreenProps['postCardCookie'];
};

export default function ProjectPage({ articles, postCardCookie }: ProjectPageProps) {
  const { t } = useTranslation({
    en: { header: 'Articles' },
    pt: { header: 'Artigos' },
  });

  const pageTitle = t('header');

  return (
    <>
      <SEO pageTitle={pageTitle} />
      <PostsScreen posts={articles} postCardCookie={postCardCookie} title={pageTitle} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const postCardCookie = parseCookies(ctx)[POSTS_CARD_COOKIE] || null;
  const articles = await cms.getPostsList('article', ctx.locale as string);

  return {
    props: {
      postCardCookie,
      articles,
    },
  };
};
