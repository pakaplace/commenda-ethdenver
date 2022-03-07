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
import PageTransition from '../components/page-transitions';
import { useRouter } from "next/router";
import GenerateSafeForm from "../components/generate-safe-form";

export default function Home() {
    const router = useRouter();
    useEffect(async () => {
      if(!router.isReady) return;
      const response = fetch(`/api/sendForm`);
      if (response.ok) {
          window.location.href = '/';
      }
    }, [router.isReady]);
    
    // this should be a post

    return (
      <PageTransition>
        <Center justify="center">
          <Stack justify="center" direction={['column', 'row', 'row', 'row']} spacing={4} border="2px" borderColor={useColorModeValue('neutralD.200', 'white')} p={4} rounded="lg" minW="40%">
            <VStack align="center" justify="center" borderColor="red" spacing={4}>
              <Text as="h1" fontSize={['2xl', '3xl', '5xl']} fontWeight="semibold" color={useColorModeValue('neutralD.100', 'white')}>Commenda: Generate SAFE </Text>

              <VStack>
                  <GenerateSafeForm></GenerateSafeForm>
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
  