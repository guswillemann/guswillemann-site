import { setCookie } from 'nookies';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import AnimatedProjectCard from '../../icons/AnimatedProjectCard';
import StaticProjectCard from '../../icons/StaticProjectCard';
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
    };
  }>;
  projectCardCookie: string;
}

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: center;

    & > span {
      margin-right: 1rem;
    }
  }
`;

export const PROJECT_CARD_COOKIE = 'PROJECT_CARD_COOKIE'

export default function ProjectsScreen({ projects, projectCardCookie }: ProjectsListScreenProps) {
  const [currentVariant, setCurrentVariant] =
    useState(projectCardCookie as ProjectCardVariants || 'default');

  const animationIsActive = currentVariant !== 'animationLess';

  function selectCardVariant(variant: ProjectCardVariants) {
    setCookie(null, PROJECT_CARD_COOKIE, variant, {
      path: '/projetos',
    });
    setCurrentVariant(variant)
  }

  return (
    <>
      <PageHeader>
        <h1 style={{ marginBottom: '2rem' }}>Projetos</h1>
        <div>
          <span>Estilo do card:</span>
          <Button
            variant="iconButton"
            onClick={() => selectCardVariant('default')}
            toggleable={{ isActive: animationIsActive, oneWay: true }}
            title="Ativar animações"
          >
            <AnimatedProjectCard />
          </Button>
          <Button
            variant="iconButton"
            onClick={() => selectCardVariant('animationLess')}
            toggleable={{ isActive: !animationIsActive, oneWay: true }}
            title="Desativar animações"
          >
            <StaticProjectCard />
          </Button>
        </div>
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
