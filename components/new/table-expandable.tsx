import { useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import numeral from 'numeral';
import {
  Flex,
  chakra,
  Stack,
  useColorModeValue,
  ButtonGroup,
  Button,
  useBreakpointValue,
  Image,
  VStack,
} from '@chakra-ui/react';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import {
  DocumentReportIcon,
} from '@heroicons/react/solid';
import NextLink from 'next/link';

const columns : TableColumnsType = [
  {
    title: 'Name',
    width: 70,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Users',
    width: 40,
    dataIndex: 'users',
    key: 'users',
    align: 'right',
    defaultSortOrder: 'descend',
    sorter: (x: any, y: any) => x.users - y.users,
    render: (x) => numeral(x).format('0.00a'),
  },
  // {
  //   title: 'Market Cap',
  //   width: 30,
  //   dataIndex: 'marketCap',
  //   key: 'marketCap',
  //   align: 'right',
  //   sorter: (x: any, y: any) => x.users - y.users,
  //   render: (x) => `$${numeral(x).format('0.00a')}`,
  // },
  {
    title: 'Earnings per day',
    width: 40,
    dataIndex: 'income',
    key: 'income',
    align: 'right',
    sorter: (x: any, y: any) => x.income - y.income,
    render: (x) => `$${x}`,
  },
  {
    title: 'Initial Cost',
    key: 'cost',
    dataIndex: 'cost',
    width: 40,
    align: 'right',
    sorter: (x: any, y: any) => x.cost - y.cost,
    render: (x) => `$${x}`,
  },
  {
    title: 'Time per day',
    key: 'time',
    dataIndex: 'time',
    width: 40,
    align: 'right',
    render: (x) => `${x} m`,
  },
  {
    title: 'Chains',
    key: 'chains',
    dataIndex: 'chains',
    width: 40,
    align: 'right',
    // render: (x) => x,
  },
];

export default function ScrollableTable({ dapps, posts, category = 'games' }) {
  const responsiveWidth = useBreakpointValue({ base: 500, md: 800, lg: 1000 });
  const filteredDapps = [];
  const [key, setKey] = useState('');
  const data = dapps
    ?.filter((dapp) => dapp.category === category)
    // .sort((x, y) => x.userActivity > y.userActivity)
    .forEach((dapp, i) => {
      if (dapp?.statistic.userActivity <= 0) return;
      const time = Math.floor(Math.random() * (60));
      const income = Math.floor(Math.random() * (40) + 5);
      const cost = Math.floor(Math.random() * (120) + 10);
      filteredDapps.push({
        key: i,
        name: (
          <Flex alignItems="center">
            <Image width="20px" borderRadius={4} mr={2} src={dapp.logo} alt={dapp.name} />
            {dapp.name}
          </Flex>),
        users: dapp.statistic.userActivity,
        marketCap: dapp.statistic.totalVolumeInFiat,
        income,
        time,
        cost,
        //   graph: <Image src={dapp.statistic.graph} alt="activity" />,
        chains: dapp.activeProtocols.join(', '),
        description: posts[dapp.name]?.Description,
        appUrl: posts[dapp.name]?.AppUrl,
      });
    });
  const Wrapped = chakra(Table, {
    baseStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  const expandedRowRender = (record, index, indent, expanded) => (
    <Stack direction="row" alignItems="center" justify="space-between">
      <p style={{ margin: 0 }}>{record.description}</p>
      <VStack align="center">
        {!!record.appUrl && (

        <NextLink href={record.appUrl} passHref>
          <a target="_blank">
            <Button
              aria-label="Visit App"
              colorScheme="blue"
              rightIcon={<BsBoxArrowUpRight />}
            >
              Visit App
            </Button>
          </a>
        </NextLink>
        )}
        <NextLink href="https://airtable.com/shrmNHnNEN7uQiSZF" passHref>
          <a target="_blank">
            <Button
              aria-label="Report Earnings"
              variant="ghost"
              size="sm"
              colorScheme="red"
              rightIcon={<DocumentReportIcon />}
            >
              Report Your Earnings
            </Button>
          </a>
        </NextLink>
      </VStack>

    </Stack>

  );
  return (
    <Wrapped
      tableLayout="fixed"
      columns={columns}
      dataSource={filteredDapps}
      scroll={{ x: responsiveWidth || 800 }}
      pagination={false}
      expandable={{
        expandRowByClick: true,
        onExpand: (_, { key }: any) => setKey(key),
        expandIcon: () => null,
        defaultExpandAllRows: false,
        expandedRowRender,
        expandedRowKeys: [key],
        expandIconColumnIndex: -1,
      }}
    //   expandedRowRender={(record) => <p style={{ margin: 0 }}>{record.description}</p>}
    />
  );
}
