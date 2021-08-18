import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import cms from '../../src/services/cms';

const ProjectPageWrapper = styled.div`
  h1 {
    margin-bottom: 2rem;
  }

  img {
    border: 4px solid ${({ theme }) => theme.colors.primaryMain};
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  .project-description {
    margin-top: 2rem;

    p:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
`;

export default function ProjectPage({ project }: any) {
  return (
    <ProjectPageWrapper>
      <h1>{project.title}</h1>
      <a href="/projetos">ASDASD</a>
      <img src={project.thumbnail.url} alt="Imagem do projeto" />
      <div className="project-description" dangerouslySetInnerHTML={{ __html: project.description }} />
    </ProjectPageWrapper>
  );
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
    }
  }`);

  return {
    props: {
      project: cmsResponse.data.project,
    },
  };
};
