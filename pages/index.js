import React, { useEffect, useState } from 'react';
import {
  Stack,
  Button,
  Text,
  VStack,
  useColorModeValue,
  Tag,
  HStack,
  Center,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { ConnectWallet, useWallet } from '@web3-ui/core';
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
      <Center justify="center">
        <Stack justify="center" direction={['column', 'row', 'row', 'row']} spacing={4} border="2px" borderColor={useColorModeValue('neutralD.200', 'white')} p={4} rounded="lg" minW="40%">
          {/* <Hero title="Blog" /> */}
          {/* <NewsletterModal /> */}
          <VStack align="center" justify="center" borderColor="red" spacing={4}>
            <Text as="h1" fontSize={['2xl', '3xl', '5xl']} fontWeight="semibold" color={useColorModeValue('neutralD.100', 'white')}>Commenda</Text>
            <Text as="h2" fontSize={['md', 'md', 'xl']} fontWeight="bold" color={useColorModeValue('neutralD.100', 'white')}>
              Your wallets
            </Text>
            {addresses.length === 0 && <ConnectWallet />}
            {console.log('balances', balancesByAddress)}
            {Object.keys(balancesByAddress).map((address) => (
              <HStack>
                <Tag
                  size="lg"
                  variant="subtle"
                  colorScheme="green"
                  rounded="lg"
                >
                  {address}
                </Tag>
                <Text as="h2" fontSize={['md', 'md', 'lg']} color={useColorModeValue('neutralD.100', 'white')}>
                  $
                  {balancesByAddress[address].toFixed(0)}
                </Text>
              </HStack>
            ))}
            <Text textAlign="center" as="h2" fontSize={['md', 'md', 'lg']} color={useColorModeValue('neutralD.100', 'white')} w="100%">
              Total Balances:
              <b>{` $${balance.toFixed(2)}`}</b>
            </Text>
            <VStack>
              <Button isDisabled={balance < 1000000}>Mint Accredidation NFT</Button>
              {balance < 1000000 && <Text color="red.300" fontSize="xs">You don't meet the $1M requirement</Text>}
            </VStack>
            {/* <Text as="h2" fontSize={['xs', 'sm', 'sm']} color="grey">Games from the Binance Smart Chain (BSC), Ethereum Mainnet, Ronin, Wax, Polygon, Harmony, and Hive blockchains</Text> */}
          </VStack>
          {/* <DynamicChatbox /> */}
        </Stack>
      </Center>
    </PageTransition>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 10,
  };
}
