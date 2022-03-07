import React from 'react';
import { SlideFade } from '@chakra-ui/react';

function PageTransition({ children }) {
  return <SlideFade in>{children}</SlideFade>;
}

export default PageTransition;
