import { Link as ChackraLink } from '@chakra-ui/react';
import NextLink from 'next/link';

const Link = ({ href, children }) => (
  <NextLink href={href} passHref>
    <ChackraLink>{children}</ChackraLink>
  </NextLink>
);

export default Link;
