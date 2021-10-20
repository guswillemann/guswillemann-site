import { animationLessStyle } from './animationLessStyle';
import { defaultStyle } from './defaultStyle';


export type PostCardVariants = 'default' | 'animationLess';

export const postCardStyleMap = {
  default: defaultStyle,
  animationLess: animationLessStyle,
};
