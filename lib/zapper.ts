export const getTokenBalances = async (addresses: [String]) => {
  let addressQueryParams: String = '';
  addresses.forEach((address) => {
    addressQueryParams += `addresses[]=${address}&`;
  });
  const url = `https://api.zapper.fi/v1/protocols/tokens/balances?${addressQueryParams}api_key=96e0cc51-a62e-42ca-acee-910ea7d2a241`;
  console.log('QUERY URL ', url);
  // API KEY is public, not sensitive
  const res = await fetch(url, { method: 'GET' });
  const resJson = await res.json();
  const balances = {};
  let totalBalanceUSD = 0;
  for (const key in resJson) {
    if (resJson[key].meta) {
      balances[key] = resJson[key].meta[0].value;
      totalBalanceUSD += resJson[key].meta[0].value;
    }
  }
  return {
    balances,
    totalBalanceUSD,
  };
};
