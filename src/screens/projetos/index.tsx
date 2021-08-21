import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import MovingCard from '../../icons/MovingCard';
import { projectCardStyleMap, ProjectCardVariants } from './projectCardStyleMap';

const ProjectsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const ProjectCard = styled.div<{ variant: ProjectCardVariants }>`
  ${({ variant }) => projectCardStyleMap[variant]};
`;

export type ProjectsListScreenProps = {
  projects: Array<{
    id: string;
    title: string;
    slug: string;
    summary: string;
    thumbnail: {
      url: string;
    }
  }>
}

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function ProjectsScreen({ projects }: ProjectsListScreenProps) {
  const [currentVariant, setCurrentVariant] = useState<ProjectCardVariants>('default');
  const animationIsActive = currentVariant !== 'animationLess';

  function toggleAnimation() {
    setCurrentVariant(old => old === 'default' ? 'animationLess' : 'default');
  }

  return (
    <>
      <PageHeader>
        <h1 style={{ marginBottom: '2rem' }}>Projetos</h1>
        <Button
          variant="iconButton"
          onClick={toggleAnimation}
          toggleable={{ isActive: animationIsActive }}
          title={animationIsActive ? 'Desativar animações' : 'Ativar animações'}
        >
          <MovingCard />
        </Button>
      </PageHeader>
      <ProjectsList>
        {projects.map((project) => (
          <ProjectCard variant={currentVariant} key={project.id}>
            <img className="project-thumbnail" src={project.thumbnail.url} />
            <div className="project-info">
              <h2 className="project-title">{project.title}</h2>
              <div className="project-summary-container">
                <div className="project-summary" dangerouslySetInnerHTML={{ __html: project.summary }} />
              </div>
              <a href={`/projetos/${project.slug}`}>mais detalhes</a>
            </div>
          </ProjectCard>
        ))}
      </ProjectsList>
    </>
  );
}
