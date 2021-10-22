import PostCard from '../../components/PostCard';
import Switch from '../../components/Switch';
import useCardStyleControl from '../../hook/useCardStyleControl';
import AnimatedPostCard from '../../icons/AnimatedPostCard';
import StaticPostCard from '../../icons/StaticPostCard';
import HomeWrapper, { ScreenHeader, TechnologylLink } from './styles';
import technologies from './technologies';

export { POSTS_CARD_COOKIE } from '../../hook/useCardStyleControl';

type HomeScreenProps = {
  posts: any;
  postCardCookie: string;
};

export default function HomeScreen({ posts, postCardCookie }: HomeScreenProps) {
  const { currentStyle, toggleCardStyle, isDefaultStyle } = useCardStyleControl(postCardCookie);

  return (
    <HomeWrapper>
      <ScreenHeader>
        <h1>Home</h1>
        <div>
          <span>Estilo do card:</span>
          <Switch
            name="alternar estilo do card"
            stateOneIcon={<AnimatedPostCard />}
            stateTwoIcon={<StaticPostCard />}
            currentState={isDefaultStyle}
            onClick={toggleCardStyle}
          />
        </div>
      </ScreenHeader>
      <div className="screen-content">
        <div className="posts-container">
          <div>
            <h2>Último Artigo</h2>
            {posts.article && (<PostCard
              variant={currentStyle}
              postData={posts.article}
              pathName="artigos"
            />)}
          </div>
          <div>
            <h2>Último Projeto</h2>
            {posts.project && (<PostCard
              variant={currentStyle}
              postData={posts.project}
              pathName="projetos"
            />)}
          </div>
        </div>
        <div className="about-container">
          <h2>Sobre</h2>
          <img className="about-photo" src="/gustavo_willemann.jpg" alt="Foto de Gustavo Willemann" />
          <div className="about-tools">
            {technologies.map((tool) => (
              <TechnologylLink href={tool.link} key={`tool-${tool.name}`} target="_blank">
                <img src={`technologies/${tool.imgFile}`} alt="Logo da tenologia" />
                <span>{tool.name}</span>
              </TechnologylLink>
            ))}
          </div>
          <div className="about-description">
            <p>Graduado em Engenharia Ambiental Sanitária. Atualemnte estudando desenvolvimento web, em especifico a área de Front-End.</p>
            <p>Além do JavaScript, HTML e CSS, adicionei o React e NextJS, na minha lista de estudos</p>
            <p>TypeScript &#9825;</p>
          </div>
        </div>
      </div>
    </HomeWrapper>
  );
}
