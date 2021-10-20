import Image from 'next/image';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import Switch from '../../components/Switch';
import AnimatedPostCard from '../../icons/AnimatedPostCard';
import StaticPostCard from '../../icons/StaticPostCard';
import atMediaBreakpoints from '../../theme/util/atMediaBreakpoints';
import { postCardStyleMap, PostCardVariants } from './postCardStyleMap';

const PostsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  ${atMediaBreakpoints({
    lg: css`
      grid-template-columns: 1fr 1fr;
    `,
  })}
`;

const PostCard = styled.div<{ variant: PostCardVariants }>`
  ${({ variant }) => postCardStyleMap[variant]};
`;

export type PostsListScreenProps = {
  posts: Array<{
    id: string;
    title: string;
    slug: string;
    summary: string;
    thumbnail: {
      url: string;
    };
  }>;
  postCardCookie: string;
  title: string;
}

const ScreenHeader = styled.div`
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
        <h1 style={{ marginBottom: '2rem' }}>{title}</h1>
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
          <PostCard variant={currentVariant} key={post.id}>
            <Image
              className="post-thumbnail"
              src={post.thumbnail.url}
              alt="Imagem do projeto"
              width={1280}
              height={720}
              placeholder="blur"
              blurDataURL="/logo.svg"
            />
            <div className="post-info">
              <h2 className="post-title">{post.title}</h2>
              <div className="post-summary-container">
                <div className="post-summary" dangerouslySetInnerHTML={{ __html: post.summary }} />
              </div>
              <a href={`${router.pathname}/${post.slug}`}>mais detalhes</a>
            </div>
          </PostCard>
        ))}
      </PostsList>
    </>
  );
}
