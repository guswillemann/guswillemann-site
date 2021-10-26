import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import useTranslation from '../../hook/useTranslation';
import Link from '../Link';

const LogoWrapper = styled.svg`
  path {
    transition: fill 300ms ease-in-out;
  }
`;

export default function Logo() {
  const { primary, secondary } = useContext(ThemeContext).colors;
  const { t } = useTranslation({
    en: {
      label: 'Logo with the letter W - Home link',
    },
    pt: {
      label: 'Logo com a letra W - Link para Home',
    },
  });

  return (
    <Link href="/" aria-label={t('label')}>
      <LogoWrapper width="200" height="153" viewBox="0 0 200 153" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.2167 1.332L55.7311 113.875L89.8466 0.826634L110.108 0.688831L63.0415 151.819L48.9621 151.911L0 1.46981L20.2167 1.332Z" fill={primary.color} />
        <path d="M110.108 0.643173L145.623 113.784L179.738 0.137803L200 0L152.933 151.957L138.854 152.049L89.8916 0.826817L110.108 0.643173Z" fill={secondary.color} />
      </LogoWrapper>
    </Link>
  );
}
