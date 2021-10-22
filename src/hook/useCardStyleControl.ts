import { setCookie } from 'nookies';
import { useState } from 'react';
import { PostCardVariants } from '../components/PostCard';

export const POSTS_CARD_COOKIE = 'post-card-style';

export default function useCardStyleControl(postCardCookie: string) {
  const [currentStyle, setCurrentStyle] = useState(postCardCookie as PostCardVariants || 'default');

  const isDefaultStyle = currentStyle === 'default';

  const toggleCardStyle = () => {
    const newStyle = isDefaultStyle ? 'animationLess' : 'default';
    setCurrentStyle(newStyle);
    setCookie(null, POSTS_CARD_COOKIE, newStyle, {
      path: '/',
      maxAge: 60*60*24*7,
    });
  };

  return {
    currentStyle,
    toggleCardStyle,
    isDefaultStyle,
  };
}