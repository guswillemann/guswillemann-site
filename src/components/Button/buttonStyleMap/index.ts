import { defaultButtonStyle } from './defaultButtonStyle';
import { submitButtonStyle } from './submitButtonStyle';
import { iconButtonStyle } from './iconButtonStyle';
import { textOnlyButtonStyle } from './textOnlyButtonStyle';


export const buttonStyleMap = {
  default: defaultButtonStyle,
  submit: submitButtonStyle,
  iconButton: iconButtonStyle,
  textOnly: textOnlyButtonStyle,
};

export type ButtonVariants = keyof typeof buttonStyleMap;