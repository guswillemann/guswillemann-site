import { useRouter } from 'next/router';
import PostCard, { PostCardData } from '../../components/PostCard';
import Switch from '../../components/Switch';
import useCardStyleControl from '../../hook/useCardStyleControl';
import useTranslation from '../../hook/useTranslation';
import AnimatedPostCard from '../../icons/AnimatedPostCard';
import StaticPostCard from '../../icons/StaticPostCard';
import * as en from './i18n/en.json';
import * as pt from './i18n/pt.json';
import { PostsList, ScreenHeader } from './styles';

export { POSTS_CARD_COOKIE } from '../../hook/useCardStyleControl';

export type PostsListScreenProps = {
  posts: PostCardData[];
  postCardCookie: string;
  title: string;
  postType?: 'article' | 'project';
}

export default function PostsScreen({ posts, postCardCookie, title, postType }: PostsListScreenProps) {
  const router = useRouter();
  const { currentStyle, toggleCardStyle, isDefaultStyle } = useCardStyleControl(postCardCookie);
  const { t } = useTranslation({ en, pt });

  return (
    <>
      <ScreenHeader>
        <h1>{title}</h1>
        <div>
          <span>{t('cardStyle')}</span>
          <Switch
            name="cardStyleSwitch"
            aria-label={t('cardStyleSwitch')}
            stateOneIcon={<AnimatedPostCard />}
            stateTwoIcon={<StaticPostCard />}
            currentState={isDefaultStyle}
            onClick={toggleCardStyle}
          />
        </div>
      </ScreenHeader>
      <PostsList>
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            variant={currentStyle}
            postData={post}
            pathName={router.pathname}
            type={postType}
          />
        ))}
      </PostsList>
    </>
  );
}
