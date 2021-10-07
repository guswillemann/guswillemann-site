import { defaultButtonStyle } from './defaultButtonStyle';
import { submitButtonStyle } from './submitButtonStyle';
import { iconButtonStyle } from './iconButtonStyle';

export type ButtonVariants = 'iconButton' | 'default' | 'submit';

export const buttonStyleMap = {
  default: defaultButtonStyle,
  submit: submitButtonStyle,
  iconButton: iconButtonStyle,
};
