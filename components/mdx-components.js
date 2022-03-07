import react, { useState } from 'react';
import NextImage from 'next/image';
import Tweet from 'react-tweet-embed';
import ReactPlayer from 'react-player/youtube';
import {
  Alert,
  Box,
  chakra,
  Code,
  Kbd,
  useColorModeValue,
  Link as ChakraLink,
  AspectRatio,
} from '@chakra-ui/react';
import Codeblock from './codeblock/codeblock';
import Link from './link';

function Table(props) {
  return (
    <chakra.div overflowX="auto">
      <chakra.table textAlign="left" mt="32px" width="full" {...props} />
    </chakra.div>
  );
}

function THead(props) {
  return (
    <chakra.th
      bg={useColorModeValue('neutral.50', 'whiteAlpha.100')}
      fontWeight="semibold"
      p={2}
      fontSize="sm"
      {...props}
    />
  );
}

function VideoPlayer(props) {
  return (
    <AspectRatio overflow="hidden" rounded="md" my={6} ratio={16 / 9}>
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        {...props}
      />
    </AspectRatio>
  );
}

function TData(props) {
  return (
    <chakra.td
      p={2}
      borderTopWidth="1px"
      borderColor="inherit"
      fontSize="sm"
      whiteSpace="normal"
      {...props}
    />
  );
}

function Image(props) {
  return (
    <Box
      mt={4}
      rounded="lg"
      borderWidth="1px"
      borderColor={useColorModeValue('neutral.500', 'neutralD.500')}
      overflow="hidden"
      lineHeight={0}
    >
      <NextImage {...props} />
    </Box>
  );
}

function InlineCode(props) {
  return (
    <Code
      apply="mdx.code"
      bg={useColorModeValue('blue.50', 'blue.900')}
      color={useColorModeValue('blue.600', 'blue.200')}
      rounded="lg"
      {...props}
    />
  );
}

function Pre(props) {
  return <chakra.div my="2em" borderRadius="sm" {...props} />;
}

function Embed(props) {
  return (
    <Box my={4} rounded="lg" shadow="sm" overflow="hidden">
      <iframe {...props} />
    </Box>
  );
}

// const Pre = (props) => <chakra.div my="2em" borderRadius="sm" {...props} />;

const MDXComponents = {
  h1: (props) => <chakra.h1 apply="mdx.h1" {...props} />,
  h2: (props) => <chakra.h2 apply="mdx.h2" mt={8} {...props} />,
  h3: (props) => <chakra.h3 apply="mdx.h3" {...props} />,
  h4: (props) => <chakra.h4 apply="mdx.h4" {...props} />,
  hr: (props) => <chakra.hr apply="mdx.hr" {...props} />,
  strong: (props) => <Box as="strong" fontWeight="semibold" {...props} />,
  inlineCode: InlineCode,
  code: Codeblock,
  pre: Pre,
  kbd: Kbd,
  blockquote: (props) => (
    <Alert
      mt="4"
      role="none"
      status="info"
      variant="left-accent"
      as="blockquote"
      rounded="4px"
      my="1.5rem"
      bg={useColorModeValue('blue.50', '#1A273B')}
      {...props}
    />
  ),
  table: Table,
  th: THead,
  td: TData,
  br: (props) => <Box height="24px" {...props} />,
  p: (props) => <chakra.p apply="mdx.p" {...props} />,
  ul: (props) => <chakra.ul apply="mdx.ul" {...props} />,
  ol: (props) => <chakra.ol apply="mdx.ul" {...props} />,
  li: (props) => <chakra.li pb="4px" {...props} />,
  Image,
  // a: (props) => <Link apply="mdx.a" {...props} />,
  a: Link,
  Tweet,
  Embed,
  VideoPlayer,
};

export default MDXComponents;
