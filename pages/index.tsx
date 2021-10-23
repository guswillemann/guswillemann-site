import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import HomeScreen, { POSTS_CARD_COOKIE } from '../src/screens/HomeScreen';
import cms from '../src/services/cms';

export default function Home({ posts, postCardCookie }: any) {
  return <HomeScreen posts={posts} postCardCookie={postCardCookie} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const postCardCookie = parseCookies(ctx)[POSTS_CARD_COOKIE] || null;
  const cmsResponse = await cms.getLastPosts(ctx.locale as string);

  return {
    props: {
      postCardCookie,
      posts: {...cmsResponse},
    },
  };
};
