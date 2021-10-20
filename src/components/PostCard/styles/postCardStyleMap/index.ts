import { animationLessStyle } from './animationLessStyle';
import { defaultStyle } from './defaultStyle';

export const postCardStyleMap = {
  default: defaultStyle,
  animationLess: animationLessStyle,
};

export type PostCardVariants = keyof typeof postCardStyleMap;
