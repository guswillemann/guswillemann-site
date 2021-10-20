import { GetServerSideProps } from 'next';
import PostScreen, { PostScreenProps } from '../../src/screens/PostScreen';
import cms from '../../src/services/cms';

type ProjectPageProps = {
  project: PostScreenProps['post'];
};

export default function ProjectPage({ project }: ProjectPageProps) {
  return <PostScreen post={project} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const cmsResponse = await cms.gql.query(`{
    project (filter: {
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

  return {
    props: {
      project: cmsResponse.data.project,
    },
  };
};
