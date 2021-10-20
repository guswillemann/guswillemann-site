import Image from 'next/image';
import { setCookie } from 'nookies';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import Switch from '../../components/Switch';
import AnimatedProjectCard from '../../icons/AnimatedProjectCard';
import StaticProjectCard from '../../icons/StaticProjectCard';
import atMediaBreakpoints from '../../theme/util/atMediaBreakpoints';
import { projectCardStyleMap, ProjectCardVariants } from './projectCardStyleMap';

const ProjectsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  ${atMediaBreakpoints({
    lg: css`
      grid-template-columns: 1fr 1fr;
    `,
  })}
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

  function handleCardStyleChange() {
    !animationIsActive
      ? selectCardVariant('default')
      : selectCardVariant('animationLess');
  }

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
          <Switch
            name="alternar estilo do card"
            stateOneIcon={<AnimatedProjectCard />}
            stateTwoIcon={<StaticProjectCard />}
            currentState={animationIsActive}
            onClick={handleCardStyleChange}
          />
        </div>
      </PageHeader>
      <ProjectsList>
        {projects.map((project) => (
          <ProjectCard variant={currentVariant} key={project.id}>
            <Image
              className="project-thumbnail"
              src={project.thumbnail.url}
              alt="Imagem do projeto"
              width={1280}
              height={720}
              placeholder="blur"
              blurDataURL="/logo.svg"
            />
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
