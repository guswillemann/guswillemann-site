import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import cms from '../../src/services/cms';

const ProjectsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const paddingWidth = 4;

const ProjectCard = styled.div`
  position: relative;
  padding: ${paddingWidth}px;

  border-radius: ${({ theme }) => theme.borderRadius};

  .project-thumbnail {
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius};
  }
  
  .project-info {
    transition: 300ms ease-in-out;

    position: absolute;
    
    top: 10%;
    left: 0;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    min-width: 0;
    min-height: 0;

    padding: ${paddingWidth}px;
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 4px solid ${({ theme }) => theme.colors.primaryMain};
    background-color: ${({ theme }) => theme.colors.background};
    
    overflow: hidden;

    h2 {
      margin-bottom: 0;
      transition-delay: 150ms;
      transition-property: margin-bottom;
    }
 
    a {
      transition: 300ms ease-in-out;

      position: absolute;
      top: ${paddingWidth}px;
      right: ${paddingWidth}px;
  
      visibility: hidden;
      opacity: 0;
  
      padding: 0.5rem;
      background-color: ${({ theme }) => theme.colors.primaryDetails};
      border-radius: calc(${({ theme }) => theme.borderRadius} / 2);
      
      color: inherit;
      text-decoration: none;
      font-weight: 700;
  
      &:hover {
        filter: brightness(75%);
      }
    }
  }
  
  .project-description-container {
    position: relative;
    flex: 1;
    width: 0;
    opacity: 0;
    transition-delay: 0ms;
    transition-property: opacity;
    overflow: hidden;
  }

  .project-description {
    position: absolute;
    inset: 0;

    display: flex;
    flex-direction: column;
    gap: 1rem;
   
    padding: ${paddingWidth}px;
  }
  
  &:hover, &:focus-within {
    border-color: ${({ theme }) => theme.colors.primaryMain};

    .project-info {
      top: 0;
      min-width: 100%;
      min-height: 100%;
      
      h2 {
        margin-bottom: 1rem;
      }

      a {
        transition-property: opacity;
        transition-delay: 100ms;
        
        visibility: initial;
        opacity: 1;
      }
    }

    .project-description-container {
      transition: 150ms ease-out;

      width: 100%;
      opacity: 1;
      transition-delay: 300ms;
      transition-property: opacity;
      overflow-y: auto;
    }
  }
`;

export default function Projects({ projects }: any) {
  return (
    <>
      <h1 style={{ marginBottom: '2rem' }}>Projetos</h1>
      <ProjectsList>
        {projects.map((project: any) => (
          <ProjectCard key={project.id}>
            <img className="project-thumbnail" src={project.thumbnail.url} />
            <div className="project-info">
              <h2 className="project-title">{project.title}</h2>
              <a href={`/projetos/${project.slug}`}>mais detalhes</a>
              <div className="project-description-container">
                <div className="project-description" dangerouslySetInnerHTML={{ __html: project.description }} />
              </div>
            </div>
          </ProjectCard>
        ))}
      </ProjectsList>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const cmsResponse = await cms.gql.query(`{
    allProjects (orderBy: _firstPublishedAt_DESC) {
      id
      title
      thumbnail {
        url
      }
      description
      slug
    }
  }`);

  return {
    props: {
      projects: cmsResponse.data.allProjects,
    },
  };
};
