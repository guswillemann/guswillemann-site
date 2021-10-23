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
  const project = await cms.getPostPage('project', query.slug as string);

  if (!project) return { notFound: true };

  return {
    props: {
      project,
    },
  };
};
