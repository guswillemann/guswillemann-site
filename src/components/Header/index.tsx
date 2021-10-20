import clsx from 'clsx';
import { useState } from 'react';
import Box from '../Box';
import BurgerButton from '../BurgerButton';
import LogoBox from './LogoBox';
import NavBox from './NavBox';
import SocialBox from './SocialBox';
import { BurgerMenuWrapper, HeaderWrapper } from './styles';
import ThemeBox from './ThemeBox';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  function handleToggleMenu() {
    setIsMenuOpen((old) => !old)
  }

  return (
    <HeaderWrapper>
      <LogoBox />
      <Box className="burger-btn-box">
        <BurgerButton isOpen={isMenuOpen} onClick={handleToggleMenu} />
      </Box>
      <BurgerMenuWrapper className={clsx({ open: isMenuOpen })}>
        <SocialBox />
        <ThemeBox />
      </BurgerMenuWrapper>
      <NavBox />
    </HeaderWrapper>
  );
}
