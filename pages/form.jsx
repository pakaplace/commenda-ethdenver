import React from 'react';
import {
  Stack,
  Text,
  VStack,
  useColorModeValue,
  Center,
} from '@chakra-ui/react';
import PageTransition from '../components/page-transitions';
import GenerateSafeForm from '../components/generate-safe-form';

export default function Home() {
  // const router = useRouter();
  // useEffect(async () => {
  //   if (!router.isReady) return;
  //   // this should be a post
  //   const response = fetch(
  //     '/api/sendForm',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(objectWithData),
  //     },
  //   );
  //   console.log("sendForm response: " + response);
  //   if (response.ok) {
  //     router.push('/');
  //   }
  // }, [router.isReady]);
  return (
    <PageTransition>
      <Center justify="center">
        <Stack justify="center" direction={['column', 'row', 'row', 'row']} spacing={4} border="2px" borderColor={useColorModeValue('neutralD.200', 'white')} p={4} rounded="lg" minW="40%">
          <VStack align="center" justify="center" borderColor="red" spacing={4}>
            <Text as="h1" fontSize={['2xl', '3xl', '5xl']} fontWeight="semibold" color={useColorModeValue('neutralD.100', 'white')}>Commenda: Generate SAFE </Text>

            <VStack>
              <GenerateSafeForm />
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
