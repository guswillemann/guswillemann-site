import LogoBox from './LogoBox';
import NavBox from './NavBox';
import SocialBox from './SocialBox';
import { HeaderWrapper } from './styles';
import ThemeBox from './ThemeBox';

export default function Header() {
  return (
    <HeaderWrapper>
      <LogoBox />
      <SocialBox />
      <ThemeBox />
      <NavBox />
    </HeaderWrapper>
  );
}
