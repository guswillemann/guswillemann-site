import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AnchorHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import setThemeTransition from '../../theme/util/setThemeTransition';

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

const Link: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, href, ...props }) => {
  const { pathname } = useRouter();
  
  const isCurrentPage = (pathname) === href || (pathname + '/') === href;

  return(
    <NextLink href={href as string} passHref>
      <StyledLink {...props} isCurrentPage={isCurrentPage}>
        {children}
      </StyledLink>
    </NextLink>
  );
}

export default Link;
