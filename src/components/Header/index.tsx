import Box from '../Box';
import ThemePicker from '../ThemePicker';
import LogoBox from './LogoBox';
import NavBox from './NavBox';
import SocialBox from './SocialBox';
import { HeaderWrapper } from './styles';

export default function Header() {
  return (
    <HeaderWrapper>
      <LogoBox />
      <SocialBox />
      <Box className="theme-box">
        <ThemePicker />
      </Box>
      <NavBox />
    </HeaderWrapper>
  );
}
