import React from 'react';
import {
  chakra,
  VStack,
  HStack,
  Button,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ConnectWallet } from '@web3-ui/core';

import ThemeToggle from './theme-toggle';
import Container from './container';
import ButtonWithModal from './button-with-modal';
import RedirectToDocusign from './request-docusign-auth.js';
import SignInSignOutButton from './sign-in-sign-out-button';

function NavLink(props) {
  const {
    href, name, active, ...rest
  } = props;
  let isActive = false;
  const { pathname } = useRouter();

  if (href !== '/') {
    const [, group] = href.split('/');
    isActive = pathname.includes(group);
  } else if (href === pathname) {
    isActive = true;
  }

  return (
    <NextLink href={href} passHref>
      <Button
        aria-current={isActive ? 'page' : undefined}
        variant="ghost"
        size="md"
        {...rest}
        _activeLink={{
          color: useColorModeValue('neutral.1100', 'neutralD.1100'),
          bg: useColorModeValue('neutral.100', 'neutralD.300'),
        }}
        _hover={{
          bg: useColorModeValue('neutral.200', 'neutralD.200'),
        }}
        px={4}
      >
        {name}
      </Button>
    </NextLink>
  );
}

function Header() {
  const WrappedConnectWalletButton = chakra(ConnectWallet);

  return (
    <Box
      bg={useColorModeValue('white', 'neutralD.100')}
      display={{ base: 'none', md: 'block' }}
      position="fixed"
      w="100%"
      zIndex={99}
      borderBottomWidth="2px"
      borderBottomColor={useColorModeValue('neutral.400', 'neutralD.400')}
      shadow="0 0 10px 0 rgba(0,0,0, 0.035);"
    >
      <Container>
        <VStack align="start" spacing={0}>
          <HStack justify="space-between" w="100%" h={16}>
            <HStack ml={-4} spacing={2}>
              <NavLink href="/" name="Commenda" />
              <WrappedConnectWalletButton borderColor="green.500" width="40px" />
              <ButtonWithModal ButtonText="Generate SAFE" ModalTitle="Generate SAFE Note">
                <RedirectToDocusign />
              </ButtonWithModal>
            </HStack>
            <HStack>
              <SignInSignOutButton />
              <ThemeToggle />
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
export default Header;
