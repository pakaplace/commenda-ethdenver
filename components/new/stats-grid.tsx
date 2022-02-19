import { ReactNode } from 'react';
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  useColorModeValue
} from '@chakra-ui/react';

export default function StatsGrid() {
  return (
    <Box  position={'relative'}>
      <Container maxW={'7xl'} zIndex={10} position={'relative'}>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <Stack
            flex={1}
            justify={{ lg: 'center' }}
            py={{ base: 4, md: 20}}>
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily={'heading'}
                fontWeight={700}
                textTransform={'uppercase'}
                mb={3}
                fontSize={'xl'}
                color={'gray.500'}>
                Pricing
              </Text>
              <Heading
                mb={5}
                fontSize={{ base: '3xl', md: '5xl' }}>
                Win-Win Pricing
              </Heading>
              <Text fontSize={'xl'} color={useColorModeValue("neutral.1000", "neutralD.1000")}>
                The more you earn, the more we earn. We take a 5% commission for managing your nodes. Revenue-share incentivizes us to maximize your rewards.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
              {stats.map((stat) => (
                <Box key={stat.title}>
                  <Text
                    fontFamily={'heading'}
                    fontSize={'3xl'}
                    mb={3}>
                    {stat.title}
                  </Text>
                  <Text fontSize={'xl'} color={useColorModeValue("neutral.1000", "neutralD.1000")}>
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

const StatsText = ({ children }: { children: ReactNode }) => (
  <Text as={'span'} fontWeight={700}>
    {children}
  </Text>
);

const stats = [
  {
    title: '5%',
    content: (
      <>
        <StatsText>Rewards Commission</StatsText> plus a $10 per day fee per node to cover hardware upkeep
      </>
    ),
  },
  {
    title: '100+',
    content: (
      <>
        <StatsText>Nodes</StatsText> managed, generating enough rewards for multiple nodes every day
      </>
    ),
  },
  {
    title: '30%',
    content: (
      <>
        <StatsText>Our Rewards Advantage</StatsText> over the network average
      </>
    ),
  },

];