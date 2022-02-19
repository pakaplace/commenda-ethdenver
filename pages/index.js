import React from 'react';
import {
  Stack,
  Flex,
  Text,
  VStack,
  Wrap,
  Heading,
  useColorModeValue,
  SimpleGrid,
  StackDivider,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,

} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import ScrollableTable from '@/components/new/table-expandable';
import PageTransition from '../components/page-transitions';
import Section from '@/components/section';
// import { getAllPosts } from '../lib/airtable';
import { getGames } from '../lib/dappradar';
import { SubmitNotification } from '@/components/new/alert';
import InterestTag from '@/components/interest-tag';

// import BlogCard from '@/components/blog-card';
// import NewsletterDrawer from '@/components/newsletter-modal';
// import generateRssIcon from '@/lib/rss';
// import Hero from '@/components/hero';
// import NewsletterModal from '@/components/newsletter-modal';
// import Chatbox from '@/components/chatbox';
// import Table from '@/components/new/table';

const DynamicChatbox = dynamic(() => import('@/components/chatbox'));

const chains = ['Binance Smart Chain', 'Ethereum Mainnet', 'Ronin', 'Wax', 'Polygon', 'Harmony', 'Hive'];
export default function Blog({ dapps }) {
  return (
    <PageTransition>
      {/* <SubmitNotification /> */}
      <Section>
        <Stack direction={['column', 'row', 'row', 'row']} spacing={4}>
          {/* <Hero title="Blog" /> */}
          {/* <NewsletterModal /> */}
          <VStack>
            <Flex justify="start" w="100%" direction="column" spacing={4} mb={[4, 8]}>
              <Text as="h1" fontSize={['2xl', '3xl', '5xl']} fontWeight="semibold" color={useColorModeValue('neutralD.100', 'white')}>Up Only Games</Text>
              <Text as="h2" fontSize={['md', 'md', 'lg']} color={useColorModeValue('neutralD.100', 'white')}>
                Compare
                {' '}
                <b> daily earnings </b>
                {' '}
                from top crypto games, reported by
                <b> real users.</b>
                {' '}
                Start building passive income by playing games.
              </Text>
              {/* <Text as="h2" fontSize={['xs', 'sm', 'sm']} color="grey">Games from the Binance Smart Chain (BSC), Ethereum Mainnet, Ronin, Wax, Polygon, Harmony, and Hive blockchains</Text> */}
            </Flex>
          </VStack>
          {/* <DynamicChatbox /> */}
        </Stack>
      </Section>
    </PageTransition>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 10,
  };
}
