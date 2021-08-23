import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import ProjectsScreen, { ProjectsListScreenProps, PROJECT_CARD_COOKIE } from '../../src/screens/projetos';
import cms from '../../src/services/cms';

type ProjectPageProps = ProjectsListScreenProps;

export default function ProjectPage({ projects, projectCardCookie }: ProjectPageProps) {
  return <ProjectsScreen projects={projects} projectCardCookie={projectCardCookie} />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const projectCardCookie = parseCookies(ctx)[PROJECT_CARD_COOKIE];
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
      projectCardCookie,
      projects: cmsResponse.data.allProjects,
    },
  };
};
