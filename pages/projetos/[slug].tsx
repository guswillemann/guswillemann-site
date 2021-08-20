import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import cms from '../../src/services/cms';

const ProjectScreenWrapper = styled.div`
  h1 {
    margin-bottom: 2rem;
  }

  h2 {
    margin-bottom: 1.5rem;
    margin-left: 3rem;
  }

  p {
    margin-bottom: 1rem;
  }

  img {
    width: 90%;
    margin: 2rem auto;
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  iframe {
    display: block;
    margin: 2rem auto;
    border-radius: ${({ theme }) => theme.borderRadius};

  }

  a {
    color: ${({ theme }) => theme.colors.primaryDetails};
    text-decoration: none;
    cursor: pointer;

    &:hover {
      filter: brightness(0.75);
    }
  }
`;

type ProjectScreenProps = {
  project: {
    title: string;
    summary: string;
    description: string;
    thumbnail: {
      url: string;
    }
  }
}

export default function ProjectScreen({ project }: ProjectScreenProps) {
  return (
    <ProjectScreenWrapper>
      <h1>{project.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: project.summary }} />
      <img src={project.thumbnail.url} alt="Imagem do projeto" />
      <div dangerouslySetInnerHTML={{ __html: project.description }} />
    </ProjectScreenWrapper>
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
      summary
    }
  }`);

  return {
    props: {
      project: cmsResponse.data.project,
    },
  };
};
