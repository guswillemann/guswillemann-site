import Logo from '../../Logo';
import { LogoBoxWrapper } from './styles';

export default function LogoBox() {
  return (
    <LogoBoxWrapper>
      <Logo />
      <p>Gustavo Willemann</p>
    </LogoBoxWrapper>
  );
}