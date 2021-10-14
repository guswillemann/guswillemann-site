import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import setThemeTransition from '../../util/setThemeTransition';

const StyledLink = styled.a<{ isCurrentPage: boolean }>`
  ${({ theme, isCurrentPage }) => isCurrentPage
    ? css`
      color: ${theme.colors.primary.color};
      font-weight: 700;
    `
    : css `
      color: ${theme.colors.box.contrast};
    `
  };

  text-decoration: none;

  ${setThemeTransition(['color'])}

  &:hover {
    filter: brightness(0.75);
  }
`;

type LinkProps = {
  children: ReactNode;
  href: string;
}

export default function Link({ children, href }: LinkProps) {
  const { pathname } = useRouter();
  
  const isCurrentPage = (pathname) === href || (pathname + '/') === href;

  return(
    <NextLink href={href} passHref>
      <StyledLink isCurrentPage={isCurrentPage}>
        {children}
      </StyledLink>
    </NextLink>
  );
}
