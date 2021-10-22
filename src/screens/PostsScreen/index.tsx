import { useRouter } from 'next/router';
import PostCard, { PostCardData } from '../../components/PostCard';
import Switch from '../../components/Switch';
import useCardStyleControl from '../../hook/useCardStyleControl';
import AnimatedPostCard from '../../icons/AnimatedPostCard';
import StaticPostCard from '../../icons/StaticPostCard';
import { PostsList, ScreenHeader } from './styles';

export { POSTS_CARD_COOKIE } from '../../hook/useCardStyleControl';

export type PostsListScreenProps = {
  posts: PostCardData[];
  postCardCookie: string;
  title: string;
}

export default function PostsScreen({ posts, postCardCookie, title }: PostsListScreenProps) {
  const router = useRouter();
  const { currentStyle, toggleCardStyle, isDefaultStyle } = useCardStyleControl(postCardCookie);

  return (
    <>
      <ScreenHeader>
        <h1>{title}</h1>
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
      <PostsList>
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            variant={currentStyle}
            postData={post}
            pathName={router.pathname}
          />
        ))}
      </PostsList>
    </>
  );
}
