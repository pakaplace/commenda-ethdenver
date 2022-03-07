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
import { ConnectWallet, useWallet } from '@web3-ui/core';
import PageTransition from '../components/page-transitions';
import { getTokenBalances } from '../lib/zapper.ts';

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
      <Center justify="center">
        <Stack justify="center" direction={['column', 'row', 'row', 'row']} spacing={4} border="2px" borderColor={useColorModeValue('neutralD.200', 'white')} p={4} rounded="lg" minW="40%">
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
          </VStack>
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
