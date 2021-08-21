import { animationLessStyle } from './animationLessStyle';
import { defaultStyle } from './defaultStyle';


export type ProjectCardVariants = 'default' | 'animationLess';

export const projectCardStyleMap = {
  default: defaultStyle,
  animationLess: animationLessStyle,
};
