import React from 'react';
import {
  chakra,
  VStack,
  HStack,
  Button,
  IconButton,
  useColorMode,
  Text,
  Box,
  Divider,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuCommand,
  MenuDivider,
  Icon,
  Avatar,
  useDisclosure,
  Modal,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  BookmarkIcon,
  BookOpenIcon,
  ChevronDownIcon,
  LightningBoltIcon,
  MenuIcon,
  DotsHorizontalIcon,
  DocumentReportIcon,
} from '@heroicons/react/solid';
import { ConnectWallet, useWallet } from '@web3-ui/core';

import Link from 'next/link';
import ThemeToggle from './theme-toggle';
import Container from './container';
import ButtonWithModal from './button-with-modal';
import AvatarNavigation from './avatar-navigation';
import UploadFileForm from './upload-file-form';
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
        // aria-current={isActive ? 'page' : undefined}
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

function ExternalLink(props) {
  const { href, name, ...rest } = props;
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <Button
        // aria-current={isActive ? 'page' : undefined}
        variant="ghost"
        size="md"
        color="red"
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
        <HStack>
          <Icon
            as={DocumentReportIcon}
            size={16}
            color={useColorModeValue('red.500', 'red.200')}
          />
          <Text color={useColorModeValue('red.500', 'red.200')}>{name}</Text>
        </HStack>
      </Button>
    </a>
  );
}

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connection } = useWallet();
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
            {/* <AvatarNavigation /> */}
            <HStack ml={-4} spacing={2}>
              <NavLink href="/" name="Commenda" />
              {/* <NavLink href="/blog" name="Blog" />
              <NavLink href="/newsletter" name="Newsletter" /> */}
              <WrappedConnectWalletButton borderColor="green.500" width="40px" />
              <ButtonWithModal ButtonText="Upload SAFE" ModalTitle="Upload SAFE Note" >
                  <RedirectToDocusign/>
              </ButtonWithModal>
              {/* <div>{connection.ens || connection.userAddress}</div> */}
              {/* <NavLink href="https://airtable.com/shrmNHnNEN7uQiSZF" name="Report Your Earnings" /> */}
              {/* <ExternalLink href="https://airtable.com/shrmNHnNEN7uQiSZF" name="Report Your Earnings" /> */}
              {/* <Menu isOpen={isOpen}>
                <MenuButton
                  bg={useColorModeValue('neutral.100', 'neutralD.300')}
                  _hover={{
                    bg: useColorModeValue('neutral.200', 'neutralD.400'),
                  }}
                  onMouseEnter={onOpen}
                  onMouseLeave={onClose}
                  rounded="full"
                >
                  <IconButton
                    aria-label="Addtional Menu"
                    variant="ghost"
                    icon={<Icon as={DotsHorizontalIcon} />}
                  />
                </MenuButton>
                <MenuList
                  bg={useColorModeValue('white', 'neutralD.100')}
                  borderColor={useColorModeValue('neutral.400', 'neutralD.400')}
                  onMouseEnter={onOpen}
                  onMouseLeave={onClose}
                >
                  <Link href="/books">
                    <MenuItem
                      _hover={{
                        bg: useColorModeValue('neutral.200', 'neutralD.200'),
                      }}
                    >
                      <HStack>
                        <Icon
                          as={BookOpenIcon}
                          size={18}
                          color={useColorModeValue('blue.500', 'blue.200')}
                        />
                        <Text>Books</Text>
                      </HStack>
                    </MenuItem>
                  </Link>
                  <Link href="/bookmarks">
                    <MenuItem
                      _hover={{
                        bg: useColorModeValue('neutral.200', 'neutralD.200'),
                      }}
                    >
                      <HStack>
                        <Icon
                          as={BookmarkIcon}
                          size={18}
                          color={useColorModeValue('blue.500', 'blue.200')}
                        />
                        <Text>Bookmarks</Text>
                      </HStack>
                    </MenuItem>
                  </Link>
                  <Link href="/tools">
                    <MenuItem
                      _hover={{
                        bg: useColorModeValue('neutral.200', 'neutralD.200'),
                      }}
                    >
                      <HStack>
                        <Icon
                          as={LightningBoltIcon}
                          size={18}
                          color={useColorModeValue('blue.500', 'blue.200')}
                        />
                        <Text>Tools</Text>
                      </HStack>
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu> */}
            </HStack>
            <HStack>
              <SignInSignOutButton/>
              <ThemeToggle />
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
export default Header;
