import { GetServerSideProps } from 'next';
import ProjectsScreen, { ProjectsListScreenProps } from '../../src/screens/projetos';
import cms from '../../src/services/cms';

type ProjectPageProps = {
  projects: ProjectsListScreenProps['projects'];
}

export default function ProjectPage({ projects }: ProjectPageProps) {
  return <ProjectsScreen projects={projects} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const cmsResponse = await cms.gql.query(`{
    allProjects (orderBy: _firstPublishedAt_DESC) {
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
      projects: cmsResponse.data.allProjects,
    },
  };
};
