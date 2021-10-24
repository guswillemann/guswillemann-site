import clsx from 'clsx';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AnchorHTMLAttributes } from 'react';
import styled from 'styled-components';
import setThemeTransition from '../../theme/util/setThemeTransition';

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.box.contrast};

  text-decoration: none;

  ${setThemeTransition(['color'])}

  &:hover {
    filter: brightness(0.75);
  }
`;

const Link: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, href, className, ...props }) => {
  const { pathname } = useRouter();
  
  const isCurrentPage = (pathname) === href || (pathname + '/') === href;

  return(
    <NextLink href={href as string} passHref>
      <StyledLink
        className={clsx([
          className,
          isCurrentPage && 'current-page',
        ])}
        {...props}
      >
        {children}
      </StyledLink>
    </NextLink>
  );
}

export default Link;
