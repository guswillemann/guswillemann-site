import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledLink = styled.a<{ isCurrentPage: boolean }>`
  color: ${({ theme, isCurrentPage }) => isCurrentPage
    ? theme.colors.primaryMain
    : theme.colors.text
  };

  text-decoration: none;

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
