import React, { useEffect, useState } from 'react';
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
import { useWallet } from '@web3-ui/core';
import ScrollableTable from '@/components/new/table-expandable';
import PageTransition from '../components/page-transitions';
import Section from '@/components/section';
// import { getAllPosts } from '../lib/airtable';
import { getGames } from '../lib/dappradar';
import { SubmitNotification } from '@/components/new/alert';
import InterestTag from '@/components/interest-tag';
import { getTokenBalances } from '../lib/zapper.ts';

// import BlogCard from '@/components/blog-card';
// import NewsletterDrawer from '@/components/newsletter-modal';
// import generateRssIcon from '@/lib/rss';
// import Hero from '@/components/hero';
// import NewsletterModal from '@/components/newsletter-modal';
// import Chatbox from '@/components/chatbox';
// import Table from '@/components/new/table';

const DynamicChatbox = dynamic(() => import('@/components/chatbox'));

const chains = ['Binance Smart Chain', 'Ethereum Mainnet', 'Ronin', 'Wax', 'Polygon', 'Harmony', 'Hive'];
export default function Home() {
  const { connection } = useWallet();
  const [addresses, setAddresses] = useState([]);
  const [balance, setBalance] = useState(0);
  const [balancesByAddress, setBalancesByAddress] = useState(0);

  useEffect(() => {
    if (!addresses.includes(connection.userAddress) && connection.userAddress?.length) {
      setAddresses((prev) => prev.concat(connection.userAddress));
    }
  }, [connection]);

  useEffect(() => {
    if (addresses.length) {
      getTokenBalances(addresses).then(({
        balances,
        totalBalanceUSD,
      }) => {
        setBalance(totalBalanceUSD);
        setBalancesByAddress(balances);
      });
    }
  }, [addresses]);

  return (
    <PageTransition>
      {/* <SubmitNotification /> */}
      <Section>
        <Stack direction={['column', 'row', 'row', 'row']} spacing={4}>
          {/* <Hero title="Blog" /> */}
          {/* <NewsletterModal /> */}
          <VStack>
            <Flex justify="start" w="100%" direction="column" spacing={4} mb={[4, 8]}>
              <Text as="h1" fontSize={['2xl', '3xl', '5xl']} fontWeight="semibold" color={useColorModeValue('neutralD.100', 'white')}>Commenda</Text>
              <Text as="h2" fontSize={['md', 'md', 'lg']} color={useColorModeValue('neutralD.100', 'white')}>
                Your wallets -
                <b>{` ${Object.keys(balancesByAddress).join(', ')}`}</b>
              </Text>
              <Text as="h2" fontSize={['md', 'md', 'lg']} color={useColorModeValue('neutralD.100', 'white')}>
                Your balances -
                <b>{` $${balance.toFixed(2)}`}</b>
              </Text>
              <Text as="h2" fontSize={['md', 'md', 'lg']} color={useColorModeValue('neutralD.100', 'white')}>
                {balance < 1000000 ? 'Not accredited 🙅 You have less than a million dollars. Stop being poor.' : 'Accredited :)'}
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
