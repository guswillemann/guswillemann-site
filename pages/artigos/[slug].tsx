import { GetServerSideProps } from 'next';
import PostScreen, { PostScreenProps } from '../../src/screens/PostScreen';
import cms from '../../src/services/cms';

type ProjectPageProps = {
  article: PostScreenProps['post'];
};

export default function ProjectPage({ article }: ProjectPageProps) {
  return <PostScreen post={article} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query.slug);

  const cmsResponse = await cms.gql.query(`{
    article (filter: {
      slug: {
        eq: "${query.slug}"
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

  const article = cmsResponse.data?.article;

  if (!article) return { notFound: true };

  return {
    props: {
      article,
    },
  };
};
