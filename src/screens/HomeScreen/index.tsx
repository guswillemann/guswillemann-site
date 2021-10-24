import Image from 'next/image';
import PostCard from '../../components/PostCard';
import Switch from '../../components/Switch';
import useCardStyleControl from '../../hook/useCardStyleControl';
import useTranslation from '../../hook/useTranslation';
import AnimatedPostCard from '../../icons/AnimatedPostCard';
import StaticPostCard from '../../icons/StaticPostCard';
import * as en from './i18n/en.json';
import * as pt from './i18n/pt.json';
import HomeWrapper, { ScreenHeader, TechnologylLink } from './styles';
import technologies from './technologies';


export { POSTS_CARD_COOKIE } from '../../hook/useCardStyleControl';

type HomeScreenProps = {
  posts: any;
  postCardCookie: string;
};

export default function HomeScreen({ posts, postCardCookie }: HomeScreenProps) {
  const { currentStyle, toggleCardStyle, isDefaultStyle } = useCardStyleControl(postCardCookie);
  const { t } = useTranslation({ en, pt });

  return (
    <HomeWrapper>
      <ScreenHeader>
        <h1>{t('header')}</h1>
        <div>
          <span>{t('cardStyle')}:</span>
          <Switch
            name="cardStyleToggle"
            aria-label={t('cardStyleSwitch')}
            stateOneIcon={<AnimatedPostCard />}
            stateTwoIcon={<StaticPostCard />}
            currentState={isDefaultStyle}
            onClick={toggleCardStyle}
          />
        </div>
      </ScreenHeader>
      <div className="screen-content">
        <section className="about-container">
          <h2>{t('aboutHeader')}</h2>
          <div className="about-photo">
            <Image
              width={640}
              height={640}
              src="/gustavo_willemann.jpg"
              alt={t('aboutImgAlt')}
            />
          </div>
          <div className="about-techs">
            {technologies.map((tech) => (
              <TechnologylLink href={tech.link} key={`tech-${tech.name}`} rel="noreferrer" target="_blank">
                <Image
                  width={100}
                  height={100}
                  src={`/technologies/${tech.imgFile}`}
                  alt={t('techImgAlt')}
                />
                <span>{tech.name}</span>
              </TechnologylLink>
            ))}
          </div>
          <div className="about-description">
            <p>{t('aboutDescription.p1')}</p>
            <p>{t('aboutDescription.p2')}</p>
            <p>TypeScript &#9825;</p>
          </div>
        </section>
        <section className="posts-container">
          <div>
            <h2>{t('articleHeader')}</h2>
            {posts.article && (<PostCard
              variant={currentStyle}
              postData={posts.article}
              pathName="articles"
            />)}
          </div>
          <div>
            <h2>{t('projectHeader')}</h2>
            {posts.project && (<PostCard
              variant={currentStyle}
              postData={posts.project}
              pathName="projects"
            />)}
          </div>
        </section>
      </div>
    </HomeWrapper>
  );
}
