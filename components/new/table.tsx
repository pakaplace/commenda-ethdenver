import React from 'react';
import numeral from 'numeral';
import {
  Flex,
  useColorModeValue,
  ButtonGroup,
  IconButton,
  Image,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';

export default function GamesTable({ dapps, category = 'games' }) {
  const header = ['name', 'users', 'total volume', 'Daily Income', 'activity', 'chains'];

  const data = dapps
    ?.filter((dapp) => dapp.category === category)
    .sort((x, y) => x.userActivity > y.userActivity)
    .map((dapp) => ({
      logo: <Flex alignItems="center">
        <Image borderRadius={4} mr={2} src={dapp.logo} alt={dapp.name} />
        {' '}
        {dapp.name}
            </Flex>,
      userActivity: numeral(dapp.statistic.userActivity).format('0.00a'),
      totalVolumeInFiat: `$${numeral(dapp.statistic.totalVolumeInFiat).format('0.00a')}`,
      dailyIncome: `$${Math.floor(Math.random() * (100) + 20)}`,
      graph: <Image src={dapp.statistic.graph} alt="activity" />,
      chains: dapp.activeProtocols.join(', '),
    }));
  console.log('sortedGamesByUserActivity', data);
  return (
    <Table
      w="full"
      bg={useColorModeValue('white', 'gray.800')}
      display={{
        base: 'block',
        md: 'table',
      }}
      sx={{
        '@media print': {
          display: 'table',
        },
      }}
    >
      <Thead
        display={{
          base: 'none',
          md: 'table-header-group',
        }}
        sx={{
          '@media print': {
            display: 'table-header-group',
          },
        }}
      >
        <Tr>
          {header.map((x) => (
            <Th key={x}>{x}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody
        display={{
          base: 'block',
          lg: 'table-row-group',
        }}
        sx={{
          '@media print': {
            display: 'table-row-group',
          },
        }}
      >
        {data.map((token, tid) => (
          <Tr
            key={tid}
            display={{
              base: 'grid',
              md: 'table-row',
            }}
            sx={{
              '@media print': {
                display: 'table-row',
              },
              gridTemplateColumns: 'minmax(0px, 35%) minmax(0px, 65%)',
              gridGap: '10px',
            }}
          >
            {Object.keys(token).map((x) => (
              <React.Fragment key={`${tid}${x}`}>
                <Td
                  display={{
                    base: 'table-cell',
                    md: 'none',
                  }}
                  sx={{
                    '@media print': {
                      display: 'none',
                    },
                    textTransform: 'uppercase',
                    color: useColorModeValue('gray.400', 'gray.400'),
                    fontSize: 'xs',
                    fontWeight: 'bold',
                    letterSpacing: 'wider',
                    fontFamily: 'heading',
                  }}
                >
                  {x}
                </Td>
                <Td
                  color={useColorModeValue('gray.500', 'gray.500')}
                  fontSize="md"
                  fontWeight="hairline"
                >
                  {token[x]}
                </Td>
              </React.Fragment>
            ))}
            {/* <Td
                  display={{
                    base: "table-cell",
                    md: "none",
                  }}
                  sx={{
                    "@media print": {
                      display: "none",
                    },
                    textTransform: "uppercase",
                    color: useColorModeValue("gray.400", "gray.400"),
                    fontSize: "xs",
                    fontWeight: "bold",
                    letterSpacing: "wider",
                    fontFamily: "heading",
                  }}
                >
                  Actions
                </Td>
                <Td>
                  <ButtonGroup variant="solid" size="sm" spacing={3}>
                    <IconButton
                      colorScheme="blue"
                      icon={<BsBoxArrowUpRight />}
                    />
                    <IconButton colorScheme="green" icon={<AiFillEdit />} />
                    <IconButton
                      colorScheme="red"
                      variant="outline"
                      icon={<BsFillTrashFill />}
                    />
                  </ButtonGroup>
                </Td> */}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
