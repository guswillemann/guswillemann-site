import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useState } from 'react';
import PostCard, { PostCardData, PostCardVariants } from '../../components/PostCard';
import Switch from '../../components/Switch';
import AnimatedPostCard from '../../icons/AnimatedPostCard';
import StaticPostCard from '../../icons/StaticPostCard';
import { PostsList, ScreenHeader } from './styles';

export type PostsListScreenProps = {
  posts: PostCardData[];
  postCardCookie: string;
  title: string;
}

export const POSTS_CARD_COOKIE = 'POSTS_CARD_COOKIE'

export default function PostsScreen({ posts, postCardCookie, title }: PostsListScreenProps) {
  const router = useRouter();

  const [currentVariant, setCurrentVariant] = useState(postCardCookie as PostCardVariants || 'default');

  const animationIsActive = currentVariant !== 'animationLess';

  function handleCardStyleChange() {
    if (animationIsActive) selectCardVariant('animationLess');
    else selectCardVariant('default');
  }

  function selectCardVariant(variant: PostCardVariants) {
    setCookie(null, POSTS_CARD_COOKIE, variant, {
      path: `${router.pathname}`,
    });
    setCurrentVariant(variant)
  }

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
            currentState={animationIsActive}
            onClick={handleCardStyleChange}
          />
        </div>
      </ScreenHeader>
      <PostsList>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            variant={currentVariant}
            postData={post}
            pathName={router.pathname}
          />
        ))}
      </PostsList>
    </>
  );
}
