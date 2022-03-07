import React from 'react';
import {
  HStack,
  Button,
  useColorMode,
  Text,
  useColorModeValue,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { PencilAltIcon, MailIcon } from '@heroicons/react/outline';
import {
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  YoutubeLogo,
} from 'phosphor-react';
import Container from './container';
import Link from './link';

function Footer() {
  const date = new Date().getFullYear();

  function FooterLink(props) {
    const { href, name, ...rest } = props;

    return (
      <NextLink href={href} passHref>
        <Button
          variant="unstyled"
          {...rest}
          color={useColorModeValue('neutral.800', 'neutralD.800')}
          _hover={{ color: useColorModeValue('neutral.1000', 'neutralD.1000') }}
        >
          {name}
        </Button>
      </NextLink>
    );
  }

  return (
    <Container>
      <HStack
        justify="space-between"
        w="100%"
        display={{ base: 'none', md: 'flex' }}
        my={8}
      >
        <FooterLink href="mailto:yaacov@commenda.io" name="Contact Us" />
        <HStack spacing={4}>
          <Link href="https://twitter.com/" isexternal="true" unstyled="true">
            <IconButton
              size="sm"
              icon={<Icon as={TwitterLogo} weight="fill" />}
              color={useColorModeValue('neutral.800', 'neutralD.1000')}
            />
          </Link>
          <Link
            href="https://www.youtube.com"
            unstyled="true"
            isexternal="true"
          >
            <IconButton
              size="sm"
              icon={<YoutubeLogo weight="fill" />}
              color={useColorModeValue('neutral.800', 'neutralD.1000')}
            />
          </Link>
        </HStack>
        {/* <FooterLink href="/privacy" name="Privacy" /> */}
      </HStack>
    </Container>
  );
}
export default Footer;
