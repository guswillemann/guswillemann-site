import NextLink from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  color: inherit;
  text-decoration: none;
`;

type LinkProps = {
  children: ReactNode;
  href: string;
}

export default function Link({ children, href }: LinkProps) {
  return(
    <NextLink href={href} passHref>
      <StyledLink>
        {children}
      </StyledLink>
    </NextLink>
  );
}
