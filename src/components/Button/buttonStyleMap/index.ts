import { defaultButtonStyle } from './defaultButtonStyle';
import { iconButtonStyle } from './iconButtonStyle';

export type ButtonVariants = 'iconButton' | 'default';

export const buttonStyleMap = {
  default: defaultButtonStyle,
  iconButton: iconButtonStyle,
};
