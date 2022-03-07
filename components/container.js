import React from 'react';
import { Box } from '@chakra-ui/react';

export function Container(props) {
  return <Box w="full" mx="auto" maxW="7xl" px={{ base: '6', md: '8' }} {...props} />;
}

export default Container;
