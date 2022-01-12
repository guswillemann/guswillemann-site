import { GetServerSideProps } from 'next';
import SEO from '../../src/components/Meta/SEO';
import PostScreen, { PostScreenProps } from '../../src/screens/PostScreen';
import cms from '../../src/services/cms';

type ProjectPageProps = {
  article: PostScreenProps['post'];
};

export default function ProjectPage({ article }: ProjectPageProps) {
  return (
    <>
      <SEO pageTitle={article.title} />
      <PostScreen post={article} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const article = await cms.getArticlePage(query.slug as string, locale as string);

  if (!article) return { notFound: true };

  return {
    props: {
      article,
    },
  };
};
